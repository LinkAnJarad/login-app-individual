<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        $users = [
            // NeuraLink Technologies - AI & Neural Network Company
            [
                'username' => 'neural_admin',
                'email' => 'admin@neuralink.tech',
                'password' => Hash::make('quantum2024!'),
                'full_name' => 'Dr. Elena Vasquez',
                'company_id' => $companies->where('code', 'NEURA')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'ai_researcher',
                'email' => 'marcus.chen@neuralink.tech',
                'password' => Hash::make('neural_net_2024'),
                'full_name' => 'Dr. Marcus Chen',
                'company_id' => $companies->where('code', 'NEURA')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'ml_engineer',
                'email' => 'sarah.oconnor@neuralink.tech',
                'password' => Hash::make('deep_learning'),
                'full_name' => 'Sarah O\'Connor',
                'company_id' => $companies->where('code', 'NEURA')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'ethics_lead',
                'email' => 'david.kumar@neuralink.tech',
                'password' => Hash::make('ai_ethics_2024'),
                'full_name' => 'Dr. David Kumar',
                'company_id' => $companies->where('code', 'NEURA')->first()->id,
                'is_active' => true,
            ],

            // Quantum Dynamics Corp - Quantum Computing
            [
                'username' => 'quantum_ceo',
                'email' => 'ceo@quantumdynamics.com',
                'password' => Hash::make('quantum_supremacy'),
                'full_name' => 'Dr. Amelia Rodriguez',
                'company_id' => $companies->where('code', 'QUANTUM')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'quantum_physicist',
                'email' => 'james.hawking@quantumdynamics.com',
                'password' => Hash::make('entanglement_2024'),
                'full_name' => 'Dr. James Hawking',
                'company_id' => $companies->where('code', 'QUANTUM')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'algorithm_dev',
                'email' => 'lisa.zhang@quantumdynamics.com',
                'password' => Hash::make('superposition'),
                'full_name' => 'Dr. Lisa Zhang',
                'company_id' => $companies->where('code', 'QUANTUM')->first()->id,
                'is_active' => true,
            ],

            // Infinity Cloud Systems - Cloud Infrastructure
            [
                'username' => 'cloud_architect',
                'email' => 'architect@infinitycloud.io',
                'password' => Hash::make('kubernetes_master'),
                'full_name' => 'Alexander Petrov',
                'company_id' => $companies->where('code', 'INFINITY')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'devops_ninja',
                'email' => 'ninja@infinitycloud.io',
                'password' => Hash::make('terraform_deploy'),
                'full_name' => 'Maya Patel',
                'company_id' => $companies->where('code', 'INFINITY')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'sre_lead',
                'email' => 'sre@infinitycloud.io',
                'password' => Hash::make('observability_2024'),
                'full_name' => 'Robert Kim',
                'company_id' => $companies->where('code', 'INFINITY')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'serverless_dev',
                'email' => 'serverless@infinitycloud.io',
                'password' => Hash::make('lambda_functions'),
                'full_name' => 'Emily Watson',
                'company_id' => $companies->where('code', 'INFINITY')->first()->id,
                'is_active' => true,
            ],

            // Neural Genesis Labs - Research & Development
            [
                'username' => 'genesis_cto',
                'email' => 'cto@neuralgenesis.lab',
                'password' => Hash::make('innovation_2024'),
                'full_name' => 'Dr. Yuki Tanaka',
                'company_id' => $companies->where('code', 'GENESIS')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'data_scientist',
                'email' => 'sophia.martinez@neuralgenesis.lab',
                'password' => Hash::make('big_data_insights'),
                'full_name' => 'Dr. Sophia Martinez',
                'company_id' => $companies->where('code', 'GENESIS')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'research_lead',
                'email' => 'thomas.anderson@neuralgenesis.lab',
                'password' => Hash::make('matrix_research'),
                'full_name' => 'Dr. Thomas Anderson',
                'company_id' => $companies->where('code', 'GENESIS')->first()->id,
                'is_active' => true,
            ],

            // Cyber Nexus International - Cybersecurity & Commerce
            [
                'username' => 'cyber_guardian',
                'email' => 'guardian@cybernexus.global',
                'password' => Hash::make('zero_trust_2024'),
                'full_name' => 'Captain Rachel Stone',
                'company_id' => $companies->where('code', 'NEXUS')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'threat_hunter',
                'email' => 'hunter@cybernexus.global',
                'password' => Hash::make('hunt_threats'),
                'full_name' => 'Alex Morgan',
                'company_id' => $companies->where('code', 'NEXUS')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'commerce_mgr',
                'email' => 'commerce@cybernexus.global',
                'password' => Hash::make('global_trade_2024'),
                'full_name' => 'Isabella Chen',
                'company_id' => $companies->where('code', 'NEXUS')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'forensic_expert',
                'email' => 'forensics@cybernexus.global',
                'password' => Hash::make('digital_evidence'),
                'full_name' => 'Dr. Michael Cross',
                'company_id' => $companies->where('code', 'NEXUS')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'crypto_specialist',
                'email' => 'crypto@cybernexus.global',
                'password' => Hash::make('blockchain_secure'),
                'full_name' => 'Zara Al-Rashid',
                'company_id' => $companies->where('code', 'NEXUS')->first()->id,
                'is_active' => true,
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}