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

        // Track assigned permissions to prevent duplicates
        $assignedPermissions = [];

        // Helper function to assign permissions without duplicates
        $assignPermission = function ($user, $submodule) use (&$assignedPermissions) {
            $key = $user->id . '_' . $submodule->id;
            if (!isset($assignedPermissions[$key])) {
                $user->submodules()->attach($submodule->id, [
                    'granted_at' => now(),
                    'created_by' => 1,
                ]);
                $assignedPermissions[$key] = true;
            }
        };

        // Super Admins - Full access across all systems
        $superAdmins = $users->whereIn('username', ['neural_admin', 'quantum_ceo', 'genesis_cto']);
        foreach ($superAdmins as $admin) {
            foreach ($submodules as $submodule) {
                $assignPermission($admin, $submodule);
            }
        }

        // AI/ML Specialists - Neural & Analytics access
        $aiSpecialists = $users->whereIn('username', ['ai_researcher', 'ml_engineer', 'data_scientist']);
        foreach ($aiSpecialists as $specialist) {
            $aiSubmodules = $submodules->whereIn('code', [
                'MODEL_REGISTRY', 'DEPLOY_MODELS', 'MODEL_PERF', 'AB_TESTING',
                'TRAINING_PIPES', 'GPU_CLUSTERS', 'HYPERPARAM',
                'DATA_STREAMS', 'STREAM_PROC', 'DATA_CATALOG', 'DATA_LINEAGE',
                'FORECASTING', 'ANOMALY_DETECT', 'TIME_SERIES'
            ]);
            
            foreach ($aiSubmodules as $submodule) {
                $assignPermission($specialist, $submodule);
            }
        }

        // Ethics & Compliance Lead
        $ethicsLead = $users->where('username', 'ethics_lead')->first();
        if ($ethicsLead) {
            $ethicsSubmodules = $submodules->whereIn('code', [
                'BIAS_DETECT', 'FAIRNESS', 'COMPLIANCE', 'MODEL_PERF'
            ]);
            
            foreach ($ethicsSubmodules as $submodule) {
                $assignPermission($ethicsLead, $submodule);
            }
        }

        // Quantum Computing Team
        $quantumTeam = $users->whereIn('username', ['quantum_physicist', 'algorithm_dev']);
        foreach ($quantumTeam as $member) {
            $quantumSubmodules = $submodules->whereIn('code', [
                'QUANTUM_GATES', 'CIRCUIT_DESIGN', 'QUANTUM_OPT',
                'MOLECULAR_SIM', 'QUANTUM_CHEM'
            ]);
            
            foreach ($quantumSubmodules as $submodule) {
                $assignPermission($member, $submodule);
            }
        }

        // Cloud Infrastructure Team
        $cloudTeam = $users->whereIn('username', ['cloud_architect', 'devops_ninja', 'sre_lead', 'serverless_dev']);
        foreach ($cloudTeam as $member) {
            $cloudSubmodules = $submodules->whereIn('code', [
                'K8S_DASH', 'POD_MGMT', 'SERVICE_MESH',
                'FUNC_DEPLOY', 'COLD_START', 'AUTO_SCALE',
                'RT_METRICS', 'ALERTS', 'CAPACITY'
            ]);
            
            foreach ($cloudSubmodules as $submodule) {
                $assignPermission($member, $submodule);
            }
        }

        // Research Team - Advanced analytics access
        $researchTeam = $users->whereIn('username', ['research_lead']);
        foreach ($researchTeam as $researcher) {
            $researchSubmodules = $submodules->whereIn('code', [
                'DATA_CATALOG', 'DATA_LINEAGE', 'SCHEMA_REG',
                'FORECASTING', 'ANOMALY_DETECT', 'TIME_SERIES',
                'MODEL_REGISTRY', 'MODEL_PERF'
            ]);
            
            foreach ($researchSubmodules as $submodule) {
                $assignPermission($researcher, $submodule);
            }
        }

        // Cybersecurity Team
        $securityTeam = $users->whereIn('username', ['cyber_guardian', 'threat_hunter', 'forensic_expert']);
        foreach ($securityTeam as $member) {
            $securitySubmodules = $submodules->whereIn('code', [
                'THREAT_FEEDS', 'IOC_ANALYSIS', 'DARK_WEB',
                'SEC_OPS', 'FORENSICS', 'PLAYBOOKS',
                'IDENTITY_VERIFY', 'DEVICE_TRUST', 'MICRO_SEG'
            ]);
            
            foreach ($securitySubmodules as $submodule) {
                $assignPermission($member, $submodule);
            }
        }

        // Commerce Team
        $commerceTeam = $users->whereIn('username', ['commerce_mgr', 'crypto_specialist']);
        foreach ($commerceTeam as $member) {
            $commerceSubmodules = $submodules->whereIn('code', [
                'VENDOR_MGMT', 'PRODUCT_CAT', 'ORDER_FULFILL', 'REVIEWS',
                'PAY_GATEWAY', 'FRAUD_DETECT', 'CRYPTO_PAY',
                'WAREHOUSE', 'DELIVERY_TRACK', 'INVENTORY_OPT'
            ]);
            
            foreach ($commerceSubmodules as $submodule) {
                $assignPermission($member, $submodule);
            }
        }

        // Cross-functional access for senior roles (only for non-super-admins)
        $seniorRoles = $users->whereIn('username', ['cloud_architect', 'cyber_guardian'])
                           ->whereNotIn('username', ['neural_admin', 'quantum_ceo', 'genesis_cto']);
        
        foreach ($seniorRoles as $senior) {
            $crossFunctionalSubmodules = $submodules->whereIn('code', [
                'RT_METRICS', 'ALERTS', 'DATA_STREAMS', 'ANOMALY_DETECT'
            ]);
            
            foreach ($crossFunctionalSubmodules as $submodule) {
                $assignPermission($senior, $submodule);
            }
        }
    }
}