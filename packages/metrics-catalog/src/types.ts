/**
 * Type definitions for the metrics catalog system.
 */

export type MetricTier = 'primary' | 'secondary' | 'custom';
export type FunnelStage = 'topo' | 'meio' | 'fundo' | 'na';
export type MetricUnit = 'currency' | 'percent' | 'count' | 'ratio' | 'duration';
export type MetricOwner = 'agency' | 'client';
export type MetricStatus = 'draft' | 'published';

export interface FilterSafety {
  requiresNonzero?: string[];
  safeDefault?: null | number | string;
}

export interface MetricDefinition {
  id: string;
  name: string;
  tier: MetricTier;
  funnelStage: FunnelStage;
  unit: MetricUnit;
  moduleDependency: string[];
  sourceModels: string[];
  sql: string;
  filterSafety?: FilterSafety;
  tests?: string[];
  owner: MetricOwner;
  description?: string;
  generatedFrom?: 'config.custom_metrics';
  generatedAt?: string;
}

export interface MetricsCatalog {
  primary: MetricDefinition[];
  secondary: MetricDefinition[];
  custom: MetricDefinition[];
  byModule: Record<string, MetricDefinition[]>;
}
