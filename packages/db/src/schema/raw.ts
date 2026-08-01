import { pgSchema, pgTable, text, timestamp, jsonb, bigint, varchar, numeric, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const rawSchema = pgSchema('raw');

/**
 * Raw data from GHL (GoHighLevel) — contacts
 */
export const ghlContacts = rawSchema.table('ghl_contacts', {
  id: varchar('id', { length: 256 }).primaryKey(),
  contactId: varchar('contact_id', { length: 256 }).notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email'),
  phone: text('phone'),
  status: text('status'),
  source: text('source'),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  _ingestedAt: timestamp('_ingested_at').default(sql`now()`).notNull(),
  _sourceBatchId: varchar('_source_batch_id', { length: 256 }),
  _rawPayload: jsonb('_raw_payload').notNull(),
});

/**
 * Raw data from GHL — opportunities (deals/leads in sales pipeline)
 */
export const ghlOpportunities = rawSchema.table('ghl_opportunities', {
  id: varchar('id', { length: 256 }).primaryKey(),
  opportunityId: varchar('opportunity_id', { length: 256 }).notNull(),
  contactId: varchar('contact_id', { length: 256 }).notNull(),
  pipelineId: varchar('pipeline_id', { length: 256 }).notNull(),
  pipelineStageId: varchar('pipeline_stage_id', { length: 256 }).notNull(),
  stageName: text('stage_name'),
  value: numeric('value'),
  currency: varchar('currency', { length: 3 }),
  status: text('status'), // open, won, lost, abandoned
  closedDate: timestamp('closed_date'),
  createdDate: timestamp('created_date'),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  _ingestedAt: timestamp('_ingested_at').default(sql`now()`).notNull(),
  _sourceBatchId: varchar('_source_batch_id', { length: 256 }),
  _rawPayload: jsonb('_raw_payload').notNull(),
});

/**
 * Raw data from Meta Ads — ad account insights (daily/aggregated)
 */
export const metaAdsAdInsights = rawSchema.table('meta_ads_ad_insights', {
  id: varchar('id', { length: 256 }).primaryKey(),
  adId: varchar('ad_id', { length: 256 }).notNull(),
  campaignId: varchar('campaign_id', { length: 256 }).notNull(),
  adsetId: varchar('adset_id', { length: 256 }).notNull(),
  accountId: varchar('account_id', { length: 256 }).notNull(),
  dateStart: varchar('date_start', { length: 10 }).notNull(), // YYYY-MM-DD
  dateEnd: varchar('date_end', { length: 10 }).notNull(),
  impressions: bigint('impressions'),
  clicks: bigint('clicks'),
  spend: numeric('spend'),
  currency: varchar('currency', { length: 3 }),
  thruPlays: bigint('thru_plays'),
  videoAveragePlay: numeric('video_average_play'),
  leads: bigint('leads'),
  value: numeric('value'),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  _ingestedAt: timestamp('_ingested_at').default(sql`now()`).notNull(),
  _sourceBatchId: varchar('_source_batch_id', { length: 256 }),
  _rawPayload: jsonb('_raw_payload').notNull(),
});

/**
 * Raw data from Meta Ads — campaign metadata
 */
export const metaAdsCampaigns = rawSchema.table('meta_ads_campaigns', {
  id: varchar('id', { length: 256 }).primaryKey(),
  campaignId: varchar('campaign_id', { length: 256 }).notNull(),
  accountId: varchar('account_id', { length: 256 }).notNull(),
  campaignName: text('campaign_name').notNull(),
  status: text('status'), // ACTIVE, PAUSED, DELETED
  objective: text('objective'), // LINK_CLICKS, LEAD_GENERATION, CONVERSIONS, etc.
  createdTime: timestamp('created_time'),
  updatedTime: timestamp('updated_time'),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  _ingestedAt: timestamp('_ingested_at').default(sql`now()`).notNull(),
  _sourceBatchId: varchar('_source_batch_id', { length: 256 }),
  _rawPayload: jsonb('_raw_payload').notNull(),
});

/**
 * Raw data from Meta Ads — ad creatives
 */
export const metaAdsCreatives = rawSchema.table('meta_ads_creatives', {
  id: varchar('id', { length: 256 }).primaryKey(),
  adId: varchar('ad_id', { length: 256 }).notNull(),
  campaignId: varchar('campaign_id', { length: 256 }).notNull(),
  accountId: varchar('account_id', { length: 256 }).notNull(),
  creativeId: varchar('creative_id', { length: 256 }).notNull(),
  name: text('name'),
  description: text('description'),
  type: text('type'), // IMAGE, VIDEO, CAROUSEL, etc.
  mediaUrl: text('media_url'),
  headline: text('headline'),
  bodyText: text('body_text'),
  createdTime: timestamp('created_time'),
  clientSlug: varchar('client_slug', { length: 128 }).notNull(),
  _ingestedAt: timestamp('_ingested_at').default(sql`now()`).notNull(),
  _sourceBatchId: varchar('_source_batch_id', { length: 256 }),
  _rawPayload: jsonb('_raw_payload').notNull(),
});
