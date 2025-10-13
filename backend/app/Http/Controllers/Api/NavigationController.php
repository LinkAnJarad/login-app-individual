<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\System;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NavigationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Get user's submodule IDs
        $userSubmoduleIds = $user->submodules()->pluck('submodules.id')->toArray();
        
        if (empty($userSubmoduleIds)) {
            return response()->json([]);
        }

        // Build navigation structure
        $systems = System::with([
            'modules' => function ($query) use ($userSubmoduleIds) {
                $query->whereHas('submodules', function ($subQuery) use ($userSubmoduleIds) {
                    $subQuery->whereIn('id', $userSubmoduleIds);
                });
            },
            'modules.submodules' => function ($query) use ($userSubmoduleIds) {
                $query->whereIn('id', $userSubmoduleIds);
            }
        ])->get();

        // Filter out systems with no modules
        $systems = $systems->filter(function ($system) {
            return $system->modules->isNotEmpty();
        });

        return response()->json($systems->values());
    }

    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'query' => 'required|string|min:1',
        ]);

        $user = $request->user();
        $searchQuery = $request->input('query');
        
        // Get user's submodule IDs
        $userSubmoduleIds = $user->submodules()->pluck('submodules.id')->toArray();
        
        if (empty($userSubmoduleIds)) {
            return response()->json([]);
        }

        $systems = System::with([
            'modules' => function ($query) use ($userSubmoduleIds, $searchQuery) {
                $query->where(function ($q) use ($searchQuery) {
                    $q->where('name', 'ILIKE', "%{$searchQuery}%")
                      ->orWhere('code', 'ILIKE', "%{$searchQuery}%");
                })->whereHas('submodules', function ($subQuery) use ($userSubmoduleIds) {
                    $subQuery->whereIn('id', $userSubmoduleIds);
                });
            },
            'modules.submodules' => function ($query) use ($userSubmoduleIds, $searchQuery) {
                $query->whereIn('id', $userSubmoduleIds)
                      ->where(function ($q) use ($searchQuery) {
                          $q->where('name', 'ILIKE', "%{$searchQuery}%")
                            ->orWhere('code', 'ILIKE', "%{$searchQuery}%");
                      });
            }
        ])->where(function ($query) use ($searchQuery) {
            $query->where('name', 'ILIKE', "%{$searchQuery}%")
                  ->orWhere('code', 'ILIKE', "%{$searchQuery}%");
        })->get();

        // Also search for systems that contain matching modules/submodules
        $systemsWithMatchingModules = System::with([
            'modules' => function ($query) use ($userSubmoduleIds, $searchQuery) {
                $query->whereHas('submodules', function ($subQuery) use ($userSubmoduleIds, $searchQuery) {
                    $subQuery->whereIn('id', $userSubmoduleIds)
                             ->where(function ($q) use ($searchQuery) {
                                 $q->where('name', 'ILIKE', "%{$searchQuery}%")
                                   ->orWhere('code', 'ILIKE', "%{$searchQuery}%");
                             });
                });
            },
            'modules.submodules' => function ($query) use ($userSubmoduleIds, $searchQuery) {
                $query->whereIn('id', $userSubmoduleIds)
                      ->where(function ($q) use ($searchQuery) {
                          $q->where('name', 'ILIKE', "%{$searchQuery}%")
                            ->orWhere('code', 'ILIKE', "%{$searchQuery}%");
                      });
            }
        ])->whereHas('modules.submodules', function ($query) use ($userSubmoduleIds, $searchQuery) {
            $query->whereIn('id', $userSubmoduleIds)
                  ->where(function ($q) use ($searchQuery) {
                      $q->where('name', 'ILIKE', "%{$searchQuery}%")
                        ->orWhere('code', 'ILIKE', "%{$searchQuery}%");
                  });
        })->get();

        // Merge and deduplicate results
        $allSystems = $systems->merge($systemsWithMatchingModules)->unique('id');

        // Filter out systems with no modules
        $allSystems = $allSystems->filter(function ($system) {
            return $system->modules->isNotEmpty();
        });

        return response()->json($allSystems->values());
    }
}