<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\System;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $adminSystem = System::where('code', 'ADMIN')->first();
        $crmSystem = System::where('code', 'CRM')->first();

        $modules = [
            // Administration System Modules
            [
                'system_id' => $adminSystem->id,
                'name' => 'User Management',
                'code' => 'USER_MGMT',
                'icon' => 'users',
            ],
            [
                'system_id' => $adminSystem->id,
                'name' => 'System Settings',
                'code' => 'SYS_SETTINGS',
                'icon' => 'settings',
            ],
            [
                'system_id' => $adminSystem->id,
                'name' => 'Reports',
                'code' => 'REPORTS',
                'icon' => 'chart-bar',
            ],
            // CRM System Modules
            [
                'system_id' => $crmSystem->id,
                'name' => 'Customer Database',
                'code' => 'CUSTOMER_DB',
                'icon' => 'database',
            ],
            [
                'system_id' => $crmSystem->id,
                'name' => 'Sales Pipeline',
                'code' => 'SALES_PIPELINE',
                'icon' => 'trending-up',
            ],
            [
                'system_id' => $crmSystem->id,
                'name' => 'Marketing Campaigns',
                'code' => 'MARKETING',
                'icon' => 'megaphone',
            ],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}