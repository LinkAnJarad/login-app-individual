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
                'name' => 'Neural Intelligence Platform',
                'code' => 'NEURAL_AI',
            ],
            [
                'name' => 'Cloud Infrastructure Management',
                'code' => 'CLOUD_INFRA',
            ],
            [
                'name' => 'Data Analytics Engine',
                'code' => 'DATA_ANALYTICS',
            ],
            [
                'name' => 'Global Commerce Platform',
                'code' => 'COMMERCE',
            ],
            [
                'name' => 'Quantum Computing Lab',
                'code' => 'QUANTUM_LAB',
            ],
            [
                'name' => 'Cybersecurity Command Center',
                'code' => 'CYBER_SEC',
            ],
        ];

        foreach ($systems as $system) {
            System::create($system);
        }
    }
}