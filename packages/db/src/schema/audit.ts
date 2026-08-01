import { pgSchema, pgTable, text, timestamp, jsonb, varchar, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const auditSchema = pgSchema('audit');

/**
 * Log of every sync run (Worker ingestion attempt).
 * Used to detect stale data, failures, and for dbt freshness checks.
 */
export const syncRunLog = auditSchema.table('sync_run_log', {
  id: varchar('id', { length: 256 }).primaryKey(),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  module: varchar('module', { length: 64 }).notNull(), // e.g., 'meta-ads', 'ghl'
  entity: varchar('entity', { length: 256 }).notNull(), // e.g., 'ad_insights', 'contacts'
  status: varchar('status', { length: 64 }).notNull(), // success | failed | partial
  attempt: integer('attempt').default(1).notNull(),
  errorMessage: text('error_message'),
  rowsProcessed: integer('rows_processed'),
  startedAt: timestamp('started_at').default(sql`now()`).notNull(),
  finishedAt: timestamp('finished_at'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

/**
 * Log of dbt run outcomes.
 * Records which models ran, how many tests passed/failed, duration, etc.
 */
export const dbtRunLog = auditSchema.table('dbt_run_log', {
  id: varchar('id', { length: 256 }).primaryKey(),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  status: varchar('status', { length: 64 }).notNull(), // success | failed
  modelsRun: integer('models_run'),
  testsPassed: integer('tests_passed'),
  testsFailed: integer('tests_failed'),
  errors: jsonb('errors'), // array of error messages
  startedAt: timestamp('started_at').notNull(),
  finishedAt: timestamp('finished_at').notNull(),
  durationSeconds: integer('duration_seconds'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

/**
 * Schema drift detection log.
 * Records when upstream APIs change their field structure unexpectedly.
 * This is the dbt macro output from `audit._schema_drift_check`.
 */
export const schemaDriftLog = auditSchema.table('_schema_drift_log', {
  id: varchar('id', { length: 256 }).primaryKey(),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  module: varchar('module', { length: 64 }).notNull(),
  entity: varchar('entity', { length: 256 }).notNull(), // e.g., 'raw.meta_ads_ad_insights'
  changeType: varchar('change_type', { length: 64 }).notNull(), // added_column | removed_column | type_changed | etc
  columnName: varchar('column_name', { length: 256 }),
  expectedType: varchar('expected_type', { length: 256 }),
  actualType: varchar('actual_type', { length: 256 }),
  severity: varchar('severity', { length: 64 }).default('warning').notNull(), // warning | error
  detectedAt: timestamp('detected_at').default(sql`now()`).notNull(),
  acknowledged: boolean('acknowledged').default(false),
  acknowledgedBy: varchar('acknowledged_by', { length: 256 }),
  acknowledgedAt: timestamp('acknowledged_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

/**
 * Freshness check results from dbt source freshness.
 * Used by the "Auditoria" page to show which data sources are up-to-date.
 */
export const freshnessCheckLog = auditSchema.table('freshness_check_log', {
  id: varchar('id', { length: 256 }).primaryKey(),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  module: varchar('module', { length: 64 }).notNull(),
  entity: varchar('entity', { length: 256 }).notNull(),
  status: varchar('status', { length: 64 }).notNull(), // fresh | warn | error
  loadedAt: timestamp('loaded_at'),
  warnThreshold: varchar('warn_threshold', { length: 128 }), // e.g., '30m'
  errorThreshold: varchar('error_threshold', { length: 128 }), // e.g., '90m'
  checkedAt: timestamp('checked_at').default(sql`now()`).notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});
