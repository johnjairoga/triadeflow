# TriadeFlow Dashboard — Template Replicável Multi-Cliente

**Status**: 🚀 Em desenvolvimento inicial

Um template modular, replicável, e padronizado para criar dashboards de análise de marketing para clientes TriadeFlow. Cada cliente obtém sua própria instância (Supabase, Cloudflare, subdomínio), mas todo o código-fonte compartilhado segue os mesmos padrões, garantindo consistência e facilidade de manutenção.

## 🎯 Objetivo

Criar um **sistema reproduzível** que qualquer pessoa da TriadeFlow (estagiário, pleno, sênior) possa usar para:
1. Provisionar um novo cliente em ~30-60 minutos
2. Clonar e instanciar o template
3. Carregar dados de GHL e Meta Ads
4. Visualizar funil (topo/meio/fundo) e métricas customizadas
5. Acompanhar qualidade de dados via auditoria

## 📚 Stack Principal

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Drizzle ORM
- **Banco**: Supabase (Postgres)
- **Deploy**: Cloudflare Pages + Workers + Queues
- **Transformação**: dbt-core (via GitHub Actions)
- **CI/CD**: GitHub Actions

## 📁 Estrutura do Projeto

```
triadeflow-dashboard/
├── apps/
│   ├── web/                 # Next.js 14 frontend
│   └── workers/             # Cloudflare Workers (ingestion)
├── packages/
│   ├── db/                  # Drizzle schema + migrations
│   ├── metrics-catalog/     # YAML catalog + loader
│   ├── modules-registry/    # Central module registry
│   ├── theme/               # Design tokens
│   └── config/              # Shared config
├── transform/               # dbt-core (stg/mart/metric layers)
├── scripts/onboarding/      # Replication CLI
└── docs/                    # Documentation
```

## 🚀 Getting Started (Template Dev)

### Prerequisites
- Node.js 20+
- pnpm 9.0+
- Docker (for local Postgres testing)
- dbt-core (for transformation work)

### Setup

```bash
# Install dependencies
pnpm install

# Set up local environment
cp .env.example .env.local

# Run frontend dev server
pnpm dev

# Type check all packages
pnpm type-check

# Lint code
pnpm lint
```

## 📖 Documentation

- **[CLAUDE.md](./docs/CLAUDE.md)** — Agent-facing repo map and conventions
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — Design decisions and rationale
- **[ONBOARDING_RUNBOOK.md](./docs/ONBOARDING_RUNBOOK.md)** — Step-by-step client setup
- **[MODULE_AUTHORING_GUIDE.md](./docs/MODULE_AUTHORING_GUIDE.md)** — How to add a new module
- **[METRICS_CATALOG_GUIDE.md](./docs/METRICS_CATALOG_GUIDE.md)** — Metrics YAML schema

## 🔄 Current Modules

- **GHL (GoHighLevel)** — CRM, contacts, opportunities, pipeline
- **Meta Ads** — Campaigns, ad sets, creatives, insights, audience performance

## 📊 Dashboard Sections (Like Salus)

- **Painel** — Overview of all metrics
- **Tráfego** — Meta Ads campaign performance
- **Criativos** — Ad creative performance
- **Funil** — Funnel stages (topo/meio/fundo)
- **Métricas** — Metrics catalog + custom metric builder
- **Auditoria** — Data freshness, sync logs, schema drift

## 🎨 Design

Branding tokens extracted from each client's website at onboarding and applied as CSS variables. No per-client component rewrites needed.

## 🔐 Security & RLS

- Row-level security (RLS) policies per role: `agency_admin`, `client_admin`, `client_viewer`
- Raw/staging data never exposed via PostgREST — only app_reader role accesses mart/metric views
- Secrets stored in Cloudflare/GitHub (never in config files)

## 🎯 Onboarding a New Client

```bash
pnpm onboard new-client
```

This interactive CLI will:
1. Provision a Supabase project
2. Run migrations
3. Configure enabled modules (GHL? Meta Ads?)
4. Extract branding
5. Deploy to Cloudflare
6. Wire up GitHub Actions dbt schedule

See [ONBOARDING_RUNBOOK.md](./docs/ONBOARDING_RUNBOOK.md) for details.

## 🧪 Testing

```bash
# Run tests
pnpm test

# Validate metrics catalog YAML
pnpm -F @triadeflow/metrics-catalog validate

# Type check
pnpm type-check

# CI checks
pnpm lint && pnpm build
```

## 📝 Key Design Decisions

1. **Template, not multi-tenant** — Each client is a clone (own Supabase, own Cloudflare deploy)
2. **Config over code** — Modules, metrics, branding all declarative (YAML/JSON), not hardcoded
3. **dbt in GitHub Actions** — Transformation happens on a schedule, not in Workers (Python constraint)
4. **Cloudflare Queues** — Instead of BullMQ+Redis (simpler infra, one less service to manage)
5. **Metrics YAML catalog** — Single source of truth, generated into dbt models and frontend

## 🛠️ Contributing

1. Read [CLAUDE.md](./docs/CLAUDE.md) for repo conventions
2. For new modules, follow [MODULE_AUTHORING_GUIDE.md](./docs/MODULE_AUTHORING_GUIDE.md)
3. Metrics changes → update YAML catalog in `packages/metrics-catalog/`
4. All PRs must pass `pnpm lint`, `pnpm type-check`, `pnpm build`, and template CI checks

## 📞 Support

For questions or issues:
- Check [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for design rationale
- See [ONBOARDING_RUNBOOK.md](./docs/ONBOARDING_RUNBOOK.md) for client setup help
- Refer to [MODULE_AUTHORING_GUIDE.md](./docs/MODULE_AUTHORING_GUIDE.md) for module development

---

**Built by TriadeFlow** | Model Reference: [Salus Dashboard](https://salus.triadeflow.com.br)
