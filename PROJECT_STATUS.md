# TriadeFlow Dashboard — Project Status & Roadmap

**Data**: 2026-08-01  
**Status Geral**: 🚀 Phase 2 Completa | Phase 3 Iniciando  
**Progresso**: 40% (2 de 5 fases)

---

## 📊 Executive Summary

Estamos criando um **template replicável de dashboard** para marketing analytics que qualquer pessoa da TriadeFlow consegue clonar e instanciar para novos clientes em 30-60 minutos. O projeto segue o padrão do **Salus** (dashboard existente) mas com arquitetura profissional escalável.

**Modelo de Negócio**: Cada cliente = seu próprio Supabase + seu próprio Cloudflare deploy + subdomínio próprio.

---

## ✅ O QUE JÁ FIZEMOS

### Phase 1: Monorepo Structure ✅ COMPLETE
**Data**: 2026-08-01 | **Commit**: df34042

#### Packages Criados (5):
- ✅ `@triadeflow/db` — Drizzle ORM schema + migrations
  - Schema: `raw`, `config`, `audit`
  - Tabelas: GHL contacts/opportunities, Meta Ads campaigns/insights, user roles, branding
  
- ✅ `@triadeflow/metrics-catalog` — YAML catalog + loader
  - JSON Schema para validação
  - Loader que filtra por módulos ativos
  - Tipos TypeScript
  
- ✅ `@triadeflow/modules-registry` — Central registry
  - 2 módulos iniciais: **GHL** (CRM) + **Meta Ads**
  - ModuleDefinition interface
  
- ✅ `@triadeflow/theme` — Design tokens
  - Tokens: cores, tipografia, spacing, shadow
  - `generateCSSVariables()` para CSS customizado
  
- ✅ `@triadeflow/config` — Utilitários compartilhados

#### Apps Criados (2):
- ✅ `apps/web` — Next.js 14 frontend (landing page)
- ✅ `apps/workers` — Cloudflare Workers scaffolding

#### Documentação:
- ✅ README.md (completo)
- ✅ docs/CLAUDE.md (guia para agentes IA)
- ✅ .gitignore, tsconfig.base.json, turbo.json, pnpm-workspace.yaml

**Arquivos**: 41 | **Linhas**: 1.866 | **Commits**: 1

---

### Phase 2: Dashboard UI ✅ COMPLETE
**Data**: 2026-08-01 | **Commit**: 79226de | **PR**: #1 → merged

#### 8 Dashboard Sections Implementadas:

| Seção | Status | Componentes | Mock Data | Detalhes |
|-------|--------|------------|-----------|----------|
| **Painel** | ✅ | 4 KPIs + 4 gráficos | ✅ | Overview geral, leads/conversão, fonte tráfego, funil |
| **Tráfego** | ✅ | Métricas + tabela | ✅ | Meta Ads performance, impressões/cliques/CTR, 4 campanhas |
| **Criativos** | ✅ | Tabela + gráfico | ✅ | Performance por tipo (VIDEO/IMAGE/CAROUSEL), 5 criativos |
| **Funil** | ✅ | Visualização + charts | ✅ | Topo/Meio/Fundo interativo, taxa conversão, insights |
| **Conjuntos** | ✅ | Tabela + stats | ✅ | 4 audience sets, reach/frequency, tamanho público |
| **Métricas** | ✅ | Catálogo + painel | ✅ | 6 métricas (3 primárias, 3 secundárias), custom builder |
| **Resultado/ROI** | ✅ | Análise + gráficos | ✅ | Receita/investimento, ROI 285%, profitabilidade |
| **Auditoria** | ✅ | 3 tabs | ✅ | Sync logs (4 exemplos), freshness (3 status), schema drift |
| **Settings** | ✅ | Forms | ✅ | Branding, user management, integrations |

#### Componentes Reutilizáveis:
- ✅ `MetricCard` — KPI cards com trends
- ✅ `ChartCard` — Line/Bar/Pie charts (Recharts)
- ✅ `FilterBar` — Date range, status, funnel filters
- ✅ `Layout` — Sidebar navigation + content area

#### Styling & UX:
- ✅ Tailwind CSS (responsive)
- ✅ Mobile/tablet/desktop design
- ✅ Color scheme: Indigo/Cyan/Pink
- ✅ Dark mode tokens preparados (não ativado)

**Arquivos**: 14 | **Linhas**: 2.101 | **PR**: #1 (merged)

---

### Phase 1 + 2 Summary
- ✅ **Total Commits**: 2
- ✅ **Total Arquivos**: 55
- ✅ **Total Linhas**: 3.967
- ✅ **Branches**: main (up-to-date), feature/dashboard-phase2 (merged)
- ✅ **TypeScript Strict**: ✅ Ativado
- ✅ **Documentação**: ✅ README + CLAUDE.md

---

## ⏳ O QUE FALTA CRIAR

### Phase 3: Backend & Ingestion (Workers) — PRIORITY 1
**Estimativa**: 1-2 semanas | **Commits**: 8-12

#### 3.1 — Cloudflare Workers Setup
- [ ] `apps/workers/wrangler.toml` (configuração)
- [ ] `apps/workers/src/lib/hyperdrive.ts` — Postgres connection pooling
- [ ] `apps/workers/src/lib/retry.ts` — Exponential backoff logic
- [ ] `apps/workers/src/lib/raw-writer.ts` — Drizzle client para raw tables

#### 3.2 — GHL (GoHighLevel) Module
- [ ] `apps/workers/src/modules/ghl/producer.ts`
  - Enfileira jobs por account/location
  - Usa cron trigger config
- [ ] `apps/workers/src/modules/ghl/consumer.ts`
  - Chama GHL API (contacts, opportunities)
  - Insere em `raw.ghl_contacts`, `raw.ghl_opportunities`
  - Escreve logs em `audit.sync_run_log`
- [ ] `apps/workers/src/modules/ghl/types.ts` — Types para GHL API

#### 3.3 — Meta Ads Module
- [ ] `apps/workers/src/modules/meta-ads/producer.ts`
  - Enfileira jobs por account/campaign
- [ ] `apps/workers/src/modules/meta-ads/consumer.ts`
  - Chama Meta Ads API (ad_insights, campaigns, creatives)
  - Insere em `raw.meta_ads_*` tables
- [ ] `apps/workers/src/modules/meta-ads/types.ts`

#### 3.4 — Queue & Routing
- [ ] `apps/workers/src/scheduler/cron-trigger.ts` — Triggers por módulo
- [ ] `apps/workers/src/queue-consumer/router.ts` — Dispatch por módulo
- [ ] Cloudflare Queue bindings (wrangler.toml)

#### 3.5 — Tests & CI
- [ ] Tests locais com mock API responses
- [ ] `.github/workflows/workers-ci.yml` — Build/lint dos workers

**Deliverables**:
- Workers prontos para fazer sync de GHL + Meta Ads
- Retry logic com backoff automático
- Logging em `audit.sync_run_log`
- Pronto para produção (sem hardcodes)

---

### Phase 4: Transformation Layer (dbt) — PRIORITY 2
**Estimativa**: 2-3 semanas | **Commits**: 15-20

#### 4.1 — dbt Project Setup
- [ ] `transform/dbt_project.yml`
- [ ] `transform/profiles/profiles.yml.template` — Por cliente
- [ ] `transform/profiles/schema.yml` — Documentação
- [ ] `.env` template para dbt connection

#### 4.2 — Staging Models (stg)
- [ ] `transform/models/stg/ghl/stg_ghl__contacts.sql`
  - Clean/type cast de `raw.ghl_contacts`
- [ ] `transform/models/stg/ghl/stg_ghl__opportunities.sql`
- [ ] `transform/models/stg/meta_ads/stg_meta_ads__ad_insights.sql`
- [ ] `transform/models/stg/meta_ads/stg_meta_ads__campaigns.sql`
- [ ] `transform/models/stg/meta_ads/stg_meta_ads__creatives.sql`

#### 4.3 — Mart Models
- [ ] `transform/models/mart/mart_leads.sql`
  - Grain: lead_id + date
  - Colunas: funnel_stage, value, status, source, created_date
- [ ] `transform/models/mart/mart_spend.sql`
  - Grain: campaign_id + date
  - Colunas: spend, impressions, clicks, leads
- [ ] `transform/models/mart/mart_funnel_events.sql`
  - Grain: event_id + date
  - Colunas: funnel_stage, event_type, count
- [ ] `transform/models/mart/mart_contacts.sql`
  - Grain: contact_id
  - Colunas: email, status, created_date, value

#### 4.4 — Metric Models (Geradas)
- [ ] `transform/models/metric/generated/metric__cac.sql` (CAC — cost per lead)
- [ ] `transform/models/metric/generated/metric__conversion_rate.sql`
- [ ] `transform/models/metric/generated/metric__ctr.sql`
- [ ] `transform/models/metric/generated/metric__roi.sql`
- [ ] `transform/models/metric/generated/metric__roas.sql`
- [ ] `transform/models/metric/generated/metric__cpc.sql`
- [ ] Codegen que emite essas views a partir do catálogo YAML

#### 4.5 — Tests & Quality
- [ ] `transform/tests/` — Testes singulares (reconciliações, lógica de negócio)
- [ ] `transform/macros/filter_safe.sql` — Evita divide-by-zero em agregações
- [ ] `transform/macros/schema_drift_check.sql` — Detecta mudanças no upstream
- [ ] Freshness checks para todas as raw sources
- [ ] dbt `schema.yml` com testes genéricos (not_null, unique, accepted_range)

**Deliverables**:
- 4 stg models + 4 mart models
- 6 metric views (geradas a partir do YAML)
- Testes dbt (singular + generic)
- Pronto para rodar via GitHub Actions em schedule

---

### Phase 5: Onboarding & Automation — PRIORITY 3
**Estimativa**: 1-2 semanas | **Commits**: 10-15

#### 5.1 — Onboarding CLI
- [ ] `scripts/onboarding/cli.ts` — Interactive `pnpm onboard new-client`
- [ ] Step 1: Collect client info (slug, name, subdomain, niche, email)
- [ ] Step 2: Provision Supabase project via Management API
- [ ] Step 3: Run Drizzle migrations
- [ ] Step 4: Configure enabled modules (GHL? Meta Ads?)
- [ ] Step 5: Extract branding from client website
- [ ] Step 6: Generate dbt profiles
- [ ] Step 7: Deploy to Cloudflare (Pages + Workers)
- [ ] Step 8: Wire up GitHub Actions dbt schedule
- [ ] Step 9: Print checklist manual final

**Tempo esperado**: 30-60 minutos por cliente

#### 5.2 — GitHub Actions Workflows
- [ ] `.github/workflows/dbt-run-[client].yml` — Gerado per cliente
  - Cron schedule de `client_config.dbt_schedule`
  - Instala dbt-core
  - Roda codegen do catálogo de métricas
  - `dbt run` + `dbt test`
  - Escreve em `audit.dbt_run_log`
- [ ] `.github/workflows/deploy-pages.yml` — Deploy do Next.js
- [ ] `.github/workflows/ci-template.yml` — Lint/type-check/build do template

#### 5.3 — Documentação Completa
- [ ] `docs/ARCHITECTURE.md` (140+ linhas)
  - Decisões arquiteturais
  - Por que dbt em GitHub Actions, não Workers
  - Por que Cloudflare Queues, não BullMQ+Redis
  - Por que YAML catalog, não hardcoded
- [ ] `docs/ONBOARDING_RUNBOOK.md` (50+ linhas)
  - Passo a passo visual
  - Screenshots/expected outputs
  - Troubleshooting
  - Checklist final
- [ ] `docs/MODULE_AUTHORING_GUIDE.md` (50+ linhas)
  - Como adicionar novo módulo (ex: Google Ads)
  - 4 artifacts que o módulo deve ter
- [ ] `docs/METRICS_CATALOG_GUIDE.md` (40+ linhas)
  - Schema YAML completo
  - Exemplos de filter_safe
  - Como criar métrica customizada

**Deliverables**:
- CLI que provisiona cliente novo completo
- GitHub Actions workflows para dbt + frontend
- Documentação executiva + troubleshooting
- Qualquer dev consegue replicar um novo cliente

---

### Phase 6: Testing & Production Ready — PRIORITY 4
**Estimativa**: 1 semana | **Commits**: 5-8

#### 6.1 — Integration Tests
- [ ] Test end-to-end: GHL API → raw → stg → mart → metric
- [ ] Test end-to-end: Meta Ads API → raw → stg → mart → metric
- [ ] Test com dados reais de exemplo (sandbox credentials)
- [ ] Test de failover (o que acontece se uma API falha?)

#### 6.2 — Performance
- [ ] Query performance checks (mart/metric views)
- [ ] Worker cold-start latency
- [ ] Dbt run time monitoring (target: < 10 min)

#### 6.3 — Security
- [ ] Secret management audit (Cloudflare + GitHub)
- [ ] RLS policies testing
- [ ] Credential rotation process

#### 6.4 — Monitoring
- [ ] `audit.sync_run_log` dashboard (já existe, só precisa UI)
- [ ] `audit.freshness_check_log` alerting
- [ ] `audit._schema_drift_log` alerting

**Deliverables**:
- Production-ready sistema
- Monitoring + alerting configurado
- Processo de troubleshooting documentado

---

## 📋 Task Breakdown by Phase

### Phase 3: Workers (Próxima)
```
├── Setup Cloudflare (wrangler.toml, Hyperdrive binding)
├── Retry logic + error handling
├── GHL Module
│   ├── Producer (enfileira)
│   └── Consumer (chama API, escreve raw)
├── Meta Ads Module
│   ├── Producer
│   └── Consumer
├── Queue routing
└── CI/tests
```

**Estimado**: 30-40 files | 2500-3000 linhas | 8-12 commits

### Phase 4: dbt (Depois de Phase 3)
```
├── dbt Setup
├── Staging models (5)
├── Mart models (4)
├── Metric models (6 geradas)
├── Tests (singular + generic)
├── Freshness checks
└── Schema drift detection
```

**Estimado**: 20-30 files | 2000-2500 linhas | 15-20 commits

### Phase 5: Onboarding (Depois de Phase 4)
```
├── CLI (pnpm onboard new-client)
├── Supabase provisioning
├── GitHub Actions workflows
└── Documentação completa
```

**Estimado**: 15-20 files | 1500-2000 linhas | 10-15 commits

### Phase 6: Testing & Monitoring (Final)
```
├── Integration tests
├── Performance tests
├── Security audit
└── Monitoring setup
```

**Estimado**: 10-15 files | 1000-1500 linhas | 5-8 commits

---

## 📊 Project Statistics

### Current State
| Métrica | Valor |
|---------|-------|
| **Packages** | 5 |
| **Apps** | 2 |
| **Dashboard Sections** | 9 |
| **Componentes Reutilizáveis** | 3 |
| **Arquivos Totais** | 55 |
| **Linhas de Código** | ~3,967 |
| **Commits** | 2 |
| **Branches** | 2 (main, feature/dashboard-phase2) |
| **PRs Mergados** | 1 (#1) |

### Estimated Remaining
| Fase | Files | Lines | Commits | Weeks |
|------|-------|-------|---------|-------|
| Phase 3 (Workers) | 30-40 | 2500-3K | 8-12 | 1-2 |
| Phase 4 (dbt) | 20-30 | 2K-2.5K | 15-20 | 2-3 |
| Phase 5 (Onboarding) | 15-20 | 1.5K-2K | 10-15 | 1-2 |
| Phase 6 (Testing) | 10-15 | 1K-1.5K | 5-8 | 1 |
| **TOTAL FINAL** | **130-155** | **9K-11K** | **40-55** | **5-8** |

---

## 🎯 Próximos Passos Imediatos

### Semana 1 (Agora)
- [ ] Start Phase 3: Cloudflare Workers setup
- [ ] Implementar GHL producer/consumer
- [ ] Implementar Meta Ads producer/consumer
- [ ] PR para Phase 3

### Semana 2-3
- [ ] Start Phase 4: dbt project
- [ ] Implementar stg models
- [ ] Implementar mart models
- [ ] Codegen do catálogo de métricas
- [ ] PR para Phase 4

### Semana 4-5
- [ ] Start Phase 5: Onboarding CLI
- [ ] GitHub Actions workflows
- [ ] Documentação ARCHITECTURE.md
- [ ] PR para Phase 5

### Semana 6
- [ ] Phase 6: Testing & monitoring
- [ ] Production readiness checklist
- [ ] Release v1.0

---

## 🔑 Key Decisions (Locked)

| Decisão | Escolha | Racional |
|---------|---------|----------|
| **Deployment** | Template clone | Cada cliente = próprio Supabase + Cloudflare |
| **Database** | Supabase | Postgres managed, RLS nativo |
| **Frontend** | Next.js 14 | App Router, SSR, Drizzle integration |
| **Ingestion** | Cloudflare Workers + Queues | Serverless, sem 24/7 server |
| **Transformation** | dbt in GitHub Actions | Python precisa de processo, não funciona em Workers |
| **Metrics** | YAML Catalog | Declarative, versionável, não hardcoded |
| **Modules** | Pluggable registry | Escalável a N módulos sem mudança de código |

---

## 📞 Contact & Team

**Email**: team@triadeflow.com.br  
**Project Lead**: John Jairo  
**Repository**: https://github.com/johnjairoga/triadeflow  
**Main Branch**: main (in sync with GitHub)

---

## 📝 Reference Materials

- **Approved Plan**: `.claude/plans/synthetic-gliding-widget.md`
- **Architecture Decisions**: `docs/CLAUDE.md`
- **Salus Reference**: https://salus.triadeflow.com.br
- **Repository Structure**: `README.md`

---

**Last Updated**: 2026-08-01 | **Status**: Phase 2 ✅ + Phase 3 🚀
