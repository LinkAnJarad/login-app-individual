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
            // Tech Innovations Inc. users
            [
                'username' => 'admin',
                'email' => 'admin@techinnovations.com',
                'password' => Hash::make('password'),
                'full_name' => 'System Administrator',
                'company_id' => $companies->where('code', 'TECH')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'jdoe',
                'email' => 'john.doe@techinnovations.com',
                'password' => Hash::make('password'),
                'full_name' => 'John Doe',
                'company_id' => $companies->where('code', 'TECH')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'msmith',
                'email' => 'mary.smith@techinnovations.com',
                'password' => Hash::make('password'),
                'full_name' => 'Mary Smith',
                'company_id' => $companies->where('code', 'TECH')->first()->id,
                'is_active' => true,
            ],

            // Green Solutions Ltd. users
            [
                'username' => 'greenadmin',
                'email' => 'admin@greensolutions.com',
                'password' => Hash::make('password'),
                'full_name' => 'Green Administrator',
                'company_id' => $companies->where('code', 'GREEN')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'bjohnson',
                'email' => 'bob.johnson@greensolutions.com',
                'password' => Hash::make('password'),
                'full_name' => 'Bob Johnson',
                'company_id' => $companies->where('code', 'GREEN')->first()->id,
                'is_active' => true,
            ],

            // Creative Designs Co. users
            [
                'username' => 'designer',
                'email' => 'designer@creativedesigns.com',
                'password' => Hash::make('password'),
                'full_name' => 'Creative Designer',
                'company_id' => $companies->where('code', 'CREATIVE')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'awilson',
                'email' => 'alice.wilson@creativedesigns.com',
                'password' => Hash::make('password'),
                'full_name' => 'Alice Wilson',
                'company_id' => $companies->where('code', 'CREATIVE')->first()->id,
                'is_active' => true,
            ],
            [
                'username' => 'cmanager',
                'email' => 'manager@creativedesigns.com',
                'password' => Hash::make('password'),
                'full_name' => 'Creative Manager',
                'company_id' => $companies->where('code', 'CREATIVE')->first()->id,
                'is_active' => true,
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}