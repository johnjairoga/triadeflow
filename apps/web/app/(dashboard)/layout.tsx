import Link from 'next/link';
import React from 'react';

const navigationItems = [
  { label: 'Painel', href: '/dashboard/painel', icon: '📊' },
  { label: 'Tráfego', href: '/dashboard/trafego', icon: '📈' },
  { label: 'Criativos', href: '/dashboard/criativos', icon: '🎨' },
  { label: 'Funil', href: '/dashboard/funil', icon: '🔄' },
  { label: 'Conjuntos', href: '/dashboard/conjuntos', icon: '👥' },
  { label: 'Métricas', href: '/dashboard/metricas', icon: '📋' },
  { label: 'Resultado/ROI', href: '/dashboard/resultado-roi', icon: '💰' },
  { label: 'Auditoria', href: '/dashboard/auditoria', icon: '🔍' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard/painel">
            <h1 className="text-2xl font-bold text-primary-600 cursor-pointer">
              TriadeFlow
            </h1>
          </Link>
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm overflow-y-auto">
          <div className="space-y-1 p-4">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-700 hover:text-gray-900">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Settings Section */}
          <div className="border-t mt-4 pt-4 p-4">
            <Link href="/dashboard/settings">
              <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-700">
                <span className="text-lg">⚙️</span>
                <span className="font-medium text-sm">Configurações</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
