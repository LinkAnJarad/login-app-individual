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
                'name' => 'Tech Innovations Inc.',
                'code' => 'TECH',
                'primary_color' => '#3B82F6',
                'accent_color' => '#1E40AF',
                'logo_url' => null,
            ],
            [
                'name' => 'Green Solutions Ltd.',
                'code' => 'GREEN',
                'primary_color' => '#10B981',
                'accent_color' => '#047857',
                'logo_url' => null,
            ],
            [
                'name' => 'Creative Designs Co.',
                'code' => 'CREATIVE',
                'primary_color' => '#8B5CF6',
                'accent_color' => '#6D28D9',
                'logo_url' => null,
            ],
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}