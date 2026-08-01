import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">TriadeFlow Dashboard</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Marketing Analytics Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Track your funnel, measure performance, and optimize campaigns.
          </p>
        </div>

        {/* Navigation Sections - Based on Salus reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NavCard
            title="Painel"
            description="Overview geral de métricas e performance"
            href="/dashboard/painel"
            icon="📊"
          />
          <NavCard
            title="Tráfego"
            description="Performance de campanhas Meta Ads"
            href="/dashboard/trafego"
            icon="📈"
          />
          <NavCard
            title="Criativos"
            description="Desempenho por criativo de anúncio"
            href="/dashboard/criativos"
            icon="🎨"
          />
          <NavCard
            title="Funil"
            description="Análise por etapa: topo, meio, fundo"
            href="/dashboard/funil"
            icon="🔄"
          />
          <NavCard
            title="Métricas"
            description="Catálogo de métricas e customização"
            href="/dashboard/metricas"
            icon="📋"
          />
          <NavCard
            title="Auditoria"
            description="Log de sincronização e qualidade de dados"
            href="/dashboard/auditoria"
            icon="🔍"
          />
        </div>
      </div>
    </main>
  );
}

interface NavCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

function NavCard({ title, description, href, icon }: NavCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
