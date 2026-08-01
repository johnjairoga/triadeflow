import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { parse } from 'yaml';
import Ajv from 'ajv';
import { MetricDefinition, MetricsCatalog } from './types';

const metricSchema = JSON.parse(
  readFileSync(join(import.meta.url.replace('file://', ''), '../../schema/metric.schema.json'), 'utf-8')
);

const ajv = new Ajv();
const validateMetric = ajv.compile(metricSchema);

/**
 * Load all metrics from the catalog directory.
 * Structure:
 * - catalog/primary/*.yml
 * - catalog/secondary/*.yml
 * - catalog/modules/{ghl,meta-ads,etc}/*.yml
 * - catalog/custom/<client-slug>/*.yml (UI-generated, optional)
 */
export function loadCatalog(catalogDir: string, clientSlug?: string): MetricsCatalog {
  const catalog: MetricsCatalog = {
    primary: [],
    secondary: [],
    custom: [],
    byModule: {},
  };

  // Load primary metrics
  const primaryDir = join(catalogDir, 'primary');
  try {
    const primaryFiles = readdirSync(primaryDir).filter((f) => extname(f) === '.yml' || extname(f) === '.yaml');
    for (const file of primaryFiles) {
      const metric = loadMetricFile(join(primaryDir, file));
      validateMetricOrThrow(metric, file);
      catalog.primary.push(metric);
    }
  } catch {
    // primary dir might not exist yet
  }

  // Load secondary metrics
  const secondaryDir = join(catalogDir, 'secondary');
  try {
    const secondaryFiles = readdirSync(secondaryDir).filter((f) => extname(f) === '.yml' || extname(f) === '.yaml');
    for (const file of secondaryFiles) {
      const metric = loadMetricFile(join(secondaryDir, file));
      validateMetricOrThrow(metric, file);
      catalog.secondary.push(metric);
    }
  } catch {
    // secondary dir might not exist yet
  }

  // Load module-specific metrics
  const modulesDir = join(catalogDir, 'modules');
  try {
    const moduleIds = readdirSync(modulesDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const moduleId of moduleIds) {
      const moduleMetricsDir = join(modulesDir, moduleId);
      const moduleMetrics: MetricDefinition[] = [];

      const moduleFiles = readdirSync(moduleMetricsDir).filter((f) => extname(f) === '.yml' || extname(f) === '.yaml');
      for (const file of moduleFiles) {
        const metric = loadMetricFile(join(moduleMetricsDir, file));
        validateMetricOrThrow(metric, file);
        moduleMetrics.push(metric);
      }

      catalog.byModule[moduleId] = moduleMetrics;
    }
  } catch {
    // modules dir might not exist yet
  }

  // Load client custom metrics (if clientSlug is provided)
  if (clientSlug) {
    const customDir = join(catalogDir, 'custom', clientSlug);
    try {
      const customFiles = readdirSync(customDir).filter((f) => extname(f) === '.yml' || extname(f) === '.yaml');
      for (const file of customFiles) {
        const metric = loadMetricFile(join(customDir, file));
        validateMetricOrThrow(metric, file);
        catalog.custom.push(metric);
      }
    } catch {
      // custom dir might not exist (no custom metrics yet)
    }
  }

  return catalog;
}

function loadMetricFile(filePath: string): MetricDefinition {
  const content = readFileSync(filePath, 'utf-8');
  return parse(content) as MetricDefinition;
}

function validateMetricOrThrow(metric: MetricDefinition, fileName: string): void {
  const valid = validateMetric(metric);
  if (!valid) {
    throw new Error(`Metric validation failed for ${fileName}:\n${JSON.stringify(validateMetric.errors, null, 2)}`);
  }
}

/**
 * Filter metrics by enabled modules for a specific client.
 */
export function filterMetricsByModules(catalog: MetricsCatalog, enabledModules: string[]): MetricDefinition[] {
  const filtered: MetricDefinition[] = [];

  // Always include primary metrics (no module dependency)
  filtered.push(...catalog.primary);

  // Include secondary metrics whose module_dependency is satisfied
  for (const metric of catalog.secondary) {
    const satisfied = metric.moduleDependency.length === 0 || metric.moduleDependency.every((m) => enabledModules.includes(m));
    if (satisfied) {
      filtered.push(metric);
    }
  }

  // Include all custom metrics
  filtered.push(...catalog.custom);

  // Include module-specific metrics
  for (const moduleId of enabledModules) {
    if (catalog.byModule[moduleId]) {
      filtered.push(...catalog.byModule[moduleId]);
    }
  }

  return filtered;
}
