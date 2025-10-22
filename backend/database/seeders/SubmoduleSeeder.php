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
            // Machine Learning Models
            ['module' => 'ML_MODELS', 'name' => 'Model Registry', 'code' => 'MODEL_REGISTRY', 'route' => '/ai/models'],
            ['module' => 'ML_MODELS', 'name' => 'Deploy Models', 'code' => 'DEPLOY_MODELS', 'route' => '/ai/models/deploy'],
            ['module' => 'ML_MODELS', 'name' => 'Model Performance', 'code' => 'MODEL_PERF', 'route' => '/ai/models/performance'],
            ['module' => 'ML_MODELS', 'name' => 'A/B Testing', 'code' => 'AB_TESTING', 'route' => '/ai/models/testing'],

            // Neural Network Training
            ['module' => 'NN_TRAINING', 'name' => 'Training Pipelines', 'code' => 'TRAINING_PIPES', 'route' => '/ai/training'],
            ['module' => 'NN_TRAINING', 'name' => 'GPU Clusters', 'code' => 'GPU_CLUSTERS', 'route' => '/ai/training/gpu'],
            ['module' => 'NN_TRAINING', 'name' => 'Hyperparameter Tuning', 'code' => 'HYPERPARAM', 'route' => '/ai/training/tuning'],

            // AI Ethics & Governance
            ['module' => 'AI_ETHICS', 'name' => 'Bias Detection', 'code' => 'BIAS_DETECT', 'route' => '/ai/ethics/bias'],
            ['module' => 'AI_ETHICS', 'name' => 'Fairness Metrics', 'code' => 'FAIRNESS', 'route' => '/ai/ethics/fairness'],
            ['module' => 'AI_ETHICS', 'name' => 'Compliance Audit', 'code' => 'COMPLIANCE', 'route' => '/ai/ethics/compliance'],

            // Container Orchestration
            ['module' => 'CONTAINERS', 'name' => 'Kubernetes Dashboard', 'code' => 'K8S_DASH', 'route' => '/cloud/k8s'],
            ['module' => 'CONTAINERS', 'name' => 'Pod Management', 'code' => 'POD_MGMT', 'route' => '/cloud/pods'],
            ['module' => 'CONTAINERS', 'name' => 'Service Mesh', 'code' => 'SERVICE_MESH', 'route' => '/cloud/mesh'],

            // Serverless Functions
            ['module' => 'SERVERLESS', 'name' => 'Function Deploy', 'code' => 'FUNC_DEPLOY', 'route' => '/cloud/functions'],
            ['module' => 'SERVERLESS', 'name' => 'Cold Start Analytics', 'code' => 'COLD_START', 'route' => '/cloud/functions/analytics'],
            ['module' => 'SERVERLESS', 'name' => 'Auto Scaling', 'code' => 'AUTO_SCALE', 'route' => '/cloud/functions/scaling'],

            // Infrastructure Monitoring
            ['module' => 'INFRA_MONITOR', 'name' => 'Real-time Metrics', 'code' => 'RT_METRICS', 'route' => '/cloud/metrics'],
            ['module' => 'INFRA_MONITOR', 'name' => 'Alerting System', 'code' => 'ALERTS', 'route' => '/cloud/alerts'],
            ['module' => 'INFRA_MONITOR', 'name' => 'Capacity Planning', 'code' => 'CAPACITY', 'route' => '/cloud/capacity'],

            // Real-time Streaming
            ['module' => 'STREAMING', 'name' => 'Data Streams', 'code' => 'DATA_STREAMS', 'route' => '/analytics/streams'],
            ['module' => 'STREAMING', 'name' => 'Stream Processing', 'code' => 'STREAM_PROC', 'route' => '/analytics/processing'],
            ['module' => 'STREAMING', 'name' => 'Event Sourcing', 'code' => 'EVENT_SOURCE', 'route' => '/analytics/events'],

            // Data Lake Management
            ['module' => 'DATA_LAKE', 'name' => 'Data Catalog', 'code' => 'DATA_CATALOG', 'route' => '/analytics/catalog'],
            ['module' => 'DATA_LAKE', 'name' => 'Data Lineage', 'code' => 'DATA_LINEAGE', 'route' => '/analytics/lineage'],
            ['module' => 'DATA_LAKE', 'name' => 'Schema Registry', 'code' => 'SCHEMA_REG', 'route' => '/analytics/schema'],

            // Predictive Analytics
            ['module' => 'PREDICTIVE', 'name' => 'Forecasting Models', 'code' => 'FORECASTING', 'route' => '/analytics/forecast'],
            ['module' => 'PREDICTIVE', 'name' => 'Anomaly Detection', 'code' => 'ANOMALY_DETECT', 'route' => '/analytics/anomaly'],
            ['module' => 'PREDICTIVE', 'name' => 'Time Series Analysis', 'code' => 'TIME_SERIES', 'route' => '/analytics/timeseries'],

            // Marketplace Operations
            ['module' => 'MARKETPLACE', 'name' => 'Vendor Management', 'code' => 'VENDOR_MGMT', 'route' => '/commerce/vendors'],
            ['module' => 'MARKETPLACE', 'name' => 'Product Catalog', 'code' => 'PRODUCT_CAT', 'route' => '/commerce/catalog'],
            ['module' => 'MARKETPLACE', 'name' => 'Order Fulfillment', 'code' => 'ORDER_FULFILL', 'route' => '/commerce/orders'],
            ['module' => 'MARKETPLACE', 'name' => 'Review System', 'code' => 'REVIEWS', 'route' => '/commerce/reviews'],

            // Payment Processing
            ['module' => 'PAYMENTS', 'name' => 'Payment Gateway', 'code' => 'PAY_GATEWAY', 'route' => '/commerce/payments'],
            ['module' => 'PAYMENTS', 'name' => 'Fraud Detection', 'code' => 'FRAUD_DETECT', 'route' => '/commerce/fraud'],
            ['module' => 'PAYMENTS', 'name' => 'Cryptocurrency', 'code' => 'CRYPTO_PAY', 'route' => '/commerce/crypto'],

            // Supply Chain Logistics
            ['module' => 'LOGISTICS', 'name' => 'Warehouse Management', 'code' => 'WAREHOUSE', 'route' => '/commerce/warehouse'],
            ['module' => 'LOGISTICS', 'name' => 'Delivery Tracking', 'code' => 'DELIVERY_TRACK', 'route' => '/commerce/delivery'],
            ['module' => 'LOGISTICS', 'name' => 'Inventory Optimization', 'code' => 'INVENTORY_OPT', 'route' => '/commerce/inventory'],

            // Quantum Algorithms
            ['module' => 'QUANTUM_ALGO', 'name' => 'Quantum Gates', 'code' => 'QUANTUM_GATES', 'route' => '/quantum/gates'],
            ['module' => 'QUANTUM_ALGO', 'name' => 'Circuit Designer', 'code' => 'CIRCUIT_DESIGN', 'route' => '/quantum/circuits'],
            ['module' => 'QUANTUM_ALGO', 'name' => 'Quantum Optimization', 'code' => 'QUANTUM_OPT', 'route' => '/quantum/optimization'],

            // Quantum Simulation
            ['module' => 'QUANTUM_SIM', 'name' => 'Molecular Simulation', 'code' => 'MOLECULAR_SIM', 'route' => '/quantum/molecular'],
            ['module' => 'QUANTUM_SIM', 'name' => 'Quantum Chemistry', 'code' => 'QUANTUM_CHEM', 'route' => '/quantum/chemistry'],

            // Threat Intelligence
            ['module' => 'THREAT_INTEL', 'name' => 'Threat Feeds', 'code' => 'THREAT_FEEDS', 'route' => '/security/threats'],
            ['module' => 'THREAT_INTEL', 'name' => 'IOC Analysis', 'code' => 'IOC_ANALYSIS', 'route' => '/security/ioc'],
            ['module' => 'THREAT_INTEL', 'name' => 'Dark Web Monitoring', 'code' => 'DARK_WEB', 'route' => '/security/darkweb'],

            // Incident Response
            ['module' => 'INCIDENT_RESP', 'name' => 'Security Operations', 'code' => 'SEC_OPS', 'route' => '/security/operations'],
            ['module' => 'INCIDENT_RESP', 'name' => 'Forensic Analysis', 'code' => 'FORENSICS', 'route' => '/security/forensics'],
            ['module' => 'INCIDENT_RESP', 'name' => 'Playbook Automation', 'code' => 'PLAYBOOKS', 'route' => '/security/playbooks'],

            // Zero Trust Security
            ['module' => 'ZERO_TRUST', 'name' => 'Identity Verification', 'code' => 'IDENTITY_VERIFY', 'route' => '/security/identity'],
            ['module' => 'ZERO_TRUST', 'name' => 'Device Trust', 'code' => 'DEVICE_TRUST', 'route' => '/security/devices'],
            ['module' => 'ZERO_TRUST', 'name' => 'Micro-segmentation', 'code' => 'MICRO_SEG', 'route' => '/security/segmentation'],
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