<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NavigationController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/companies', [AuthController::class, 'companies']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/navigation', [NavigationController::class, 'index']);
    Route::get('/navigation/search', [NavigationController::class, 'search']);
});