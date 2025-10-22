<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\System;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $neuralSystem = System::where('code', 'NEURAL_AI')->first();
        $cloudSystem = System::where('code', 'CLOUD_INFRA')->first();
        $analyticsSystem = System::where('code', 'DATA_ANALYTICS')->first();
        $commerceSystem = System::where('code', 'COMMERCE')->first();
        $quantumSystem = System::where('code', 'QUANTUM_LAB')->first();
        $cyberSystem = System::where('code', 'CYBER_SEC')->first();

        $modules = [
            // Neural Intelligence Platform
            [
                'system_id' => $neuralSystem->id,
                'name' => 'Machine Learning Models',
                'code' => 'ML_MODELS',
                'icon' => 'brain',
            ],
            [
                'system_id' => $neuralSystem->id,
                'name' => 'Neural Network Training',
                'code' => 'NN_TRAINING',
                'icon' => 'network-wired',
            ],
            [
                'system_id' => $neuralSystem->id,
                'name' => 'AI Ethics & Governance',
                'code' => 'AI_ETHICS',
                'icon' => 'balance-scale',
            ],

            // Cloud Infrastructure Management
            [
                'system_id' => $cloudSystem->id,
                'name' => 'Container Orchestration',
                'code' => 'CONTAINERS',
                'icon' => 'cubes',
            ],
            [
                'system_id' => $cloudSystem->id,
                'name' => 'Serverless Functions',
                'code' => 'SERVERLESS',
                'icon' => 'bolt',
            ],
            [
                'system_id' => $cloudSystem->id,
                'name' => 'Infrastructure Monitoring',
                'code' => 'INFRA_MONITOR',
                'icon' => 'chart-line',
            ],

            // Data Analytics Engine
            [
                'system_id' => $analyticsSystem->id,
                'name' => 'Real-time Streaming',
                'code' => 'STREAMING',
                'icon' => 'stream',
            ],
            [
                'system_id' => $analyticsSystem->id,
                'name' => 'Data Lake Management',
                'code' => 'DATA_LAKE',
                'icon' => 'database',
            ],
            [
                'system_id' => $analyticsSystem->id,
                'name' => 'Predictive Analytics',
                'code' => 'PREDICTIVE',
                'icon' => 'crystal-ball',
            ],

            // Global Commerce Platform
            [
                'system_id' => $commerceSystem->id,
                'name' => 'Marketplace Operations',
                'code' => 'MARKETPLACE',
                'icon' => 'store',
            ],
            [
                'system_id' => $commerceSystem->id,
                'name' => 'Payment Processing',
                'code' => 'PAYMENTS',
                'icon' => 'credit-card',
            ],
            [
                'system_id' => $commerceSystem->id,
                'name' => 'Supply Chain Logistics',
                'code' => 'LOGISTICS',
                'icon' => 'truck',
            ],

            // Quantum Computing Lab
            [
                'system_id' => $quantumSystem->id,
                'name' => 'Quantum Algorithms',
                'code' => 'QUANTUM_ALGO',
                'icon' => 'atom',
            ],
            [
                'system_id' => $quantumSystem->id,
                'name' => 'Quantum Simulation',
                'code' => 'QUANTUM_SIM',
                'icon' => 'flask',
            ],

            // Cybersecurity Command Center
            [
                'system_id' => $cyberSystem->id,
                'name' => 'Threat Intelligence',
                'code' => 'THREAT_INTEL',
                'icon' => 'shield-alt',
            ],
            [
                'system_id' => $cyberSystem->id,
                'name' => 'Incident Response',
                'code' => 'INCIDENT_RESP',
                'icon' => 'exclamation-triangle',
            ],
            [
                'system_id' => $cyberSystem->id,
                'name' => 'Zero Trust Security',
                'code' => 'ZERO_TRUST',
                'icon' => 'lock',
            ],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}