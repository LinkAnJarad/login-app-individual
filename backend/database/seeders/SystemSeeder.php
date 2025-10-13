<?php

namespace Database\Seeders;

use App\Models\System;
use Illuminate\Database\Seeder;

class SystemSeeder extends Seeder
{
    public function run(): void
    {
        $systems = [
            [
                'name' => 'Administration',
                'code' => 'ADMIN',
            ],
            [
                'name' => 'Customer Management',
                'code' => 'CRM',
            ],
        ];

        foreach ($systems as $system) {
            System::create($system);
        }
    }
}