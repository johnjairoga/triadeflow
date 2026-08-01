/**
 * Interface definition for a module in the TriadeFlow Dashboard system.
 * A module is a self-contained package handling a specific data source (e.g., Meta Ads, GHL).
 */

export interface ModuleDefinition {
  /**
   * Unique identifier for this module (slug format).
   * E.g., 'meta-ads', 'ghl', 'google-ads'
   */
  id: string;

  /**
   * Display name for UI labels
   */
  displayName: string;

  /**
   * Description of what this module does
   */
  description?: string;

  /**
   * Relative path to raw table definitions (Drizzle schema)
   * E.g., 'packages/db/src/schema/raw'
   */
  rawTableSchemaPath: string;

  /**
   * Relative path to dbt staging models
   * E.g., 'transform/models/stg/meta_ads'
   */
  dbtModelsPath: string;

  /**
   * Relative path to metrics catalog entries for this module
   * E.g., 'packages/metrics-catalog/catalog/modules/meta-ads'
   */
  metricsCatalogPath: string;

  /**
   * Cloudflare Worker producer/consumer references.
   * Sync job implementation for pulling data from external APIs.
   */
  syncWorker: {
    producerPath: string; // e.g., 'apps/workers/src/modules/meta-ads/producer.ts'
    consumerPath: string; // e.g., 'apps/workers/src/modules/meta-ads/consumer.ts'
  };

  /**
   * Named secrets required by this module (values come from Cloudflare/GitHub Secrets)
   * E.g., ['META_ADS_ACCESS_TOKEN', 'META_ADS_ACCOUNT_ID']
   */
  requiredSecrets: string[];

  /**
   * Frontend sections/components this module enables
   * E.g., ['trafego', 'criativos', 'conjuntos'] for meta-ads module
   */
  dashboardSections: string[];

  /**
   * True if this module is included in the template by default
   */
  enabledByDefault?: boolean;
}

/**
 * Runtime configuration for an active module on a specific client.
 */
export interface ModuleConfig {
  moduleId: string;
  enabled: boolean;
  syncSchedule?: string; // e.g., '*/15 * * * *'
  secretsRef?: string; // reference to Cloudflare secret binding
  metadata?: Record<string, unknown>; // module-specific config
}
