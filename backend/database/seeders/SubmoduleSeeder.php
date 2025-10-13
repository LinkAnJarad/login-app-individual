<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Submodule;
use Illuminate\Database\Seeder;

class SubmoduleSeeder extends Seeder
{
    public function run(): void
    {
        $modules = Module::all();

        $submodules = [
            // User Management submodules
            ['module' => 'USER_MGMT', 'name' => 'View Users', 'code' => 'VIEW_USERS', 'route' => '/admin/users'],
            ['module' => 'USER_MGMT', 'name' => 'Create User', 'code' => 'CREATE_USER', 'route' => '/admin/users/create'],
            ['module' => 'USER_MGMT', 'name' => 'Edit Users', 'code' => 'EDIT_USERS', 'route' => '/admin/users/edit'],

            // System Settings submodules
            ['module' => 'SYS_SETTINGS', 'name' => 'General Settings', 'code' => 'GENERAL_SETTINGS', 'route' => '/admin/settings/general'],
            ['module' => 'SYS_SETTINGS', 'name' => 'Security Settings', 'code' => 'SECURITY_SETTINGS', 'route' => '/admin/settings/security'],

            // Reports submodules
            ['module' => 'REPORTS', 'name' => 'User Reports', 'code' => 'USER_REPORTS', 'route' => '/admin/reports/users'],
            ['module' => 'REPORTS', 'name' => 'System Reports', 'code' => 'SYSTEM_REPORTS', 'route' => '/admin/reports/system'],
            ['module' => 'REPORTS', 'name' => 'Custom Reports', 'code' => 'CUSTOM_REPORTS', 'route' => '/admin/reports/custom'],

            // Customer Database submodules
            ['module' => 'CUSTOMER_DB', 'name' => 'View Customers', 'code' => 'VIEW_CUSTOMERS', 'route' => '/crm/customers'],
            ['module' => 'CUSTOMER_DB', 'name' => 'Add Customer', 'code' => 'ADD_CUSTOMER', 'route' => '/crm/customers/add'],

            // Sales Pipeline submodules
            ['module' => 'SALES_PIPELINE', 'name' => 'View Pipeline', 'code' => 'VIEW_PIPELINE', 'route' => '/crm/pipeline'],
            ['module' => 'SALES_PIPELINE', 'name' => 'Manage Deals', 'code' => 'MANAGE_DEALS', 'route' => '/crm/deals'],
            ['module' => 'SALES_PIPELINE', 'name' => 'Sales Analytics', 'code' => 'SALES_ANALYTICS', 'route' => '/crm/analytics'],

            // Marketing Campaigns submodules
            ['module' => 'MARKETING', 'name' => 'View Campaigns', 'code' => 'VIEW_CAMPAIGNS', 'route' => '/crm/campaigns'],
            ['module' => 'MARKETING', 'name' => 'Create Campaign', 'code' => 'CREATE_CAMPAIGN', 'route' => '/crm/campaigns/create'],
        ];

        foreach ($submodules as $submoduleData) {
            $module = $modules->where('code', $submoduleData['module'])->first();
            if ($module) {
                Submodule::create([
                    'module_id' => $module->id,
                    'name' => $submoduleData['name'],
                    'code' => $submoduleData['code'],
                    'route' => $submoduleData['route'],
                ]);
            }
        }
    }
}