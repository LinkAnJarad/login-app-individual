<?php

namespace Database\Seeders;

use App\Models\Submodule;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSubmoduleSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $submodules = Submodule::all();

        // Admin users get all permissions
        $adminUsers = $users->whereIn('username', ['admin', 'greenadmin']);
        foreach ($adminUsers as $admin) {
            foreach ($submodules as $submodule) {
                $admin->submodules()->attach($submodule->id, [
                    'granted_at' => now(),
                    'created_by' => 1,
                ]);
            }
        }

        // Regular users get limited permissions
        $regularUsers = $users->whereNotIn('username', ['admin', 'greenadmin']);
        
        // Give different permissions to different users
        foreach ($regularUsers as $user) {
            // Give basic customer and sales permissions to CRM users
            $crmSubmodules = $submodules->whereIn('code', [
                'VIEW_CUSTOMERS', 'ADD_CUSTOMER', 'VIEW_PIPELINE', 'VIEW_CAMPAIGNS'
            ]);
            
            foreach ($crmSubmodules as $submodule) {
                $user->submodules()->attach($submodule->id, [
                    'granted_at' => now(),
                    'created_by' => 1,
                ]);
            }

            // Give some users additional permissions
            if (in_array($user->username, ['jdoe', 'designer'])) {
                $additionalSubmodules = $submodules->whereIn('code', [
                    'VIEW_USERS', 'USER_REPORTS', 'MANAGE_DEALS'
                ]);
                
                foreach ($additionalSubmodules as $submodule) {
                    $user->submodules()->attach($submodule->id, [
                        'granted_at' => now(),
                        'created_by' => 1,
                    ]);
                }
            }
        }
    }
}