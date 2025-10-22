<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            [
                'name' => 'NeuraLink Technologies',
                'code' => 'NEURA',
                'primary_color' => '#FF6B35',
                'accent_color' => '#D63916',
                'logo_url' => null,
            ],
            [
                'name' => 'Quantum Dynamics Corp',
                'code' => 'QUANTUM',
                'primary_color' => '#6C5CE7',
                'accent_color' => '#5742D0',
                'logo_url' => null,
            ],
            [
                'name' => 'Infinity Cloud Systems',
                'code' => 'INFINITY',
                'primary_color' => '#00CEC9',
                'accent_color' => '#00B5AD',
                'logo_url' => null,
            ],
            [
                'name' => 'Neural Genesis Labs',
                'code' => 'GENESIS',
                'primary_color' => '#FD79A8',
                'accent_color' => '#E84393',
                'logo_url' => null,
            ],
            [
                'name' => 'Cyber Nexus International',
                'code' => 'NEXUS',
                'primary_color' => '#74B9FF',
                'accent_color' => '#0984E3',
                'logo_url' => null,
            ],
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}