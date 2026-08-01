import { pgSchema, pgTable, text, boolean, timestamp, jsonb, integer, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const configSchema = pgSchema('config');

/**
 * Central registry of modules known to the template.
 * Used by Workers, dbt, and frontend to understand which modules are available.
 */
export const moduleRegistry = configSchema.table('module_registry', {
  id: varchar('id', { length: 64 }).primaryKey(), // e.g., 'meta-ads', 'ghl'
  displayName: text('display_name').notNull(),
  description: text('description'),
  enabled: boolean('enabled').default(true).notNull(),
  dbtModelsPath: text('dbt_models_path').notNull(), // e.g., 'transform/models/stg/meta_ads'
  metricsCatalogPath: text('metrics_catalog_path').notNull(), // e.g., 'packages/metrics-catalog/catalog/modules/meta-ads'
  requiredSecrets: text('required_secrets').array(), // JSON array of secret names
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

/**
 * Per-client configuration: which modules are active, sync schedules, branding, etc.
 * This is the single source of truth for "what does this client's deployment look like?"
 */
export const clientConfig = configSchema.table('client_config', {
  id: varchar('id', { length: 128 }).primaryKey(), // composite key: client_slug + module_id
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  moduleId: varchar('module_id', { length: 64 }).notNull(),
  enabled: boolean('enabled').default(false).notNull(),
  syncSchedule: varchar('sync_schedule', { length: 128 }), // e.g., '*/15 * * * *'
  secretsRef: varchar('secrets_ref', { length: 256 }), // reference to Cloudflare secret binding
  metadata: jsonb('metadata'), // module-specific config
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

/**
 * Global dbt schedule for this client
 */
export const clientDbtSchedule = configSchema.table('client_dbt_schedule', {
  clientSlug: varchar('client_slug', { length: 128 }).primaryKey(),
  schedule: varchar('schedule', { length: 128 }).notNull(), // e.g., '*/20 * * * *'
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

/**
 * Custom metrics defined by the client/agency via the UI.
 * These get materialized into YAML + dbt models before each dbt run.
 */
export const customMetrics = configSchema.table('custom_metrics', {
  id: varchar('id', { length: 256 }).primaryKey(), // e.g., client_slug:avg_ticket_vip
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  metricId: varchar('metric_id', { length: 256 }).notNull(), // slug, e.g., 'avg_ticket_vip'
  displayName: text('display_name').notNull(),
  funnelStage: varchar('funnel_stage', { length: 64 }).default('na').notNull(), // topo | meio | fundo | na
  unit: varchar('unit', { length: 64 }).notNull(), // currency, percent, count, ratio, duration
  moduleDependency: text('module_dependency').array(), // e.g., ['crm', 'meta-ads']
  sourceModels: text('source_models').array().notNull(), // e.g., ['mart_leads', 'mart_spend']
  sql: text('sql').notNull(), // aggregation expression
  filterSafety: jsonb('filter_safety'), // { requires_nonzero: [], safe_default: null }
  tests: text('tests').array(), // dbt tests: ['not_null', ...]
  owner: varchar('owner', { length: 64 }).default('client').notNull(), // agency | client
  status: varchar('status', { length: 64 }).default('draft').notNull(), // draft | published
  createdBy: varchar('created_by', { length: 256 }).notNull(), // user_id
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

/**
 * Branding theme configuration per client.
 * Pulled from client's website at kickoff; applied as design tokens in the app.
 */
export const brandingTheme = configSchema.table('branding_theme', {
  clientSlug: varchar('client_slug', { length: 128 }).primaryKey(),
  primaryColor: varchar('primary_color', { length: 7 }), // hex, e.g., '#4F46E5'
  secondaryColor: varchar('secondary_color', { length: 7 }),
  accentColor: varchar('accent_color', { length: 7 }),
  backgroundColor: varchar('background_color', { length: 7 }),
  textColor: varchar('text_color', { length: 7 }),
  logoUrl: text('logo_url'),
  faviconUrl: text('favicon_url'),
  fontFamily: varchar('font_family', { length: 256 }), // e.g., 'Inter, sans-serif'
  metadata: jsonb('metadata'), // arbitrary theme config
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

/**
 * User roles for RLS: which user can do what.
 */
export const userRoles = configSchema.table('user_roles', {
  id: varchar('id', { length: 256 }).primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  role: varchar('role', { length: 64 }).notNull(), // agency_admin | client_admin | client_viewer
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});
