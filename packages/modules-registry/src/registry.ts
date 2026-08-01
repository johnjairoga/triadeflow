import { ModuleDefinition } from './types';

/**
 * Central registry of all modules the template knows about.
 * Adding a new module: add an entry here, then create the four artifacts it references.
 * See docs/MODULE_AUTHORING_GUIDE.md for the full checklist.
 */
export const MODULE_REGISTRY: ModuleDefinition[] = [
  {
    id: 'ghl',
    displayName: 'GoHighLevel (GHL)',
    description: 'CRM and lead management via GoHighLevel',
    rawTableSchemaPath: 'packages/db/src/schema/raw',
    dbtModelsPath: 'transform/models/stg/ghl',
    metricsCatalogPath: 'packages/metrics-catalog/catalog/modules/ghl',
    syncWorker: {
      producerPath: 'apps/workers/src/modules/ghl/producer.ts',
      consumerPath: 'apps/workers/src/modules/ghl/consumer.ts',
    },
    requiredSecrets: ['GHL_API_KEY', 'GHL_LOCATION_ID'],
    dashboardSections: ['painel', 'funil', 'resultado-roi'],
    enabledByDefault: true,
  },

  {
    id: 'meta-ads',
    displayName: 'Meta Ads',
    description: 'Facebook / Instagram advertising data via Meta Marketing API',
    rawTableSchemaPath: 'packages/db/src/schema/raw',
    dbtModelsPath: 'transform/models/stg/meta_ads',
    metricsCatalogPath: 'packages/metrics-catalog/catalog/modules/meta-ads',
    syncWorker: {
      producerPath: 'apps/workers/src/modules/meta-ads/producer.ts',
      consumerPath: 'apps/workers/src/modules/meta-ads/consumer.ts',
    },
    requiredSecrets: ['META_ADS_ACCESS_TOKEN', 'META_ADS_ACCOUNT_ID'],
    dashboardSections: ['painel', 'trafego', 'criativos', 'conjuntos', 'resultado-roi'],
    enabledByDefault: false,
  },
];

/**
 * Look up a module by ID
 */
export function getModule(moduleId: string): ModuleDefinition | undefined {
  return MODULE_REGISTRY.find((m) => m.id === moduleId);
}

/**
 * Get all enabled modules
 */
export function getEnabledModules(): ModuleDefinition[] {
  return MODULE_REGISTRY.filter((m) => m.enabledByDefault !== false);
}

/**
 * Validate that all module dependencies are available
 */
export function validateModuleDependencies(moduleIds: string[]): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const id of moduleIds) {
    if (!getModule(id)) {
      missing.push(id);
    }
  }
  return {
    valid: missing.length === 0,
    missing,
  };
}
