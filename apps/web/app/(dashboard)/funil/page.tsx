'use client';

import React from 'react';
import { ChartCard, FilterBar, MetricCard } from '@/components';

const funnelStages = [
  {
    name: 'Topo (Awareness)',
    key: 'topo',
    value: 55000,
    percentage: 100,
    description: 'Pessoas que viram seu anúncio',
  },
  {
    name: 'Meio (Consideration)',
    key: 'meio',
    value: 1245,
    percentage: 2.3,
    description: 'Pessoas que visitaram seu site/clicaram',
  },
  {
    name: 'Fundo (Conversion)',
    key: 'fundo',
    value: 180,
    percentage: 0.33,
    description: 'Pessoas que se converteram em clientes',
  },
];

const mockFunnelData = funnelStages.map((stage) => ({
  name: stage.name,
  value: stage.value,
  percentage: stage.percentage,
}));

const mockStageMetrics = {
  topo: {
    leads: 55000,
    avgEngagement: '3.0%',
    cost: 'R$ 0.09',
  },
  meio: {
    leads: 1245,
    avgEngagement: '12.5%',
    cost: 'R$ 0.45',
  },
  fundo: {
    leads: 180,
    avgEngagement: '45.0%',
    cost: 'R$ 2.65',
  },
};

const conversionRates = [
  { stage: 'Topo → Meio', rate: '2.3%', people: 1245 },
  { stage: 'Meio → Fundo', rate: '14.5%', people: 180 },
  { stage: 'Topo → Fundo (Geral)', rate: '0.33%', people: 180 },
];

export default function FunnelPage() {
  const [selectedStage, setSelectedStage] = React.useState<string | null>(null);

  const selectedStageData = selectedStage
    ? mockStageMetrics[selectedStage as keyof typeof mockStageMetrics]
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Funil de Vendas</h1>
        <p className="text-gray-600 mt-2">
          Análise das etapas de conversão: Topo, Meio e Fundo
        </p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange showFunnelStage />

      {/* Funnel Visualization */}
      <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-8">
          Visualização do Funil
        </h3>
        <div className="space-y-6">
          {funnelStages.map((stage, idx) => (
            <div key={stage.key}>
              <button
                onClick={() =>
                  setSelectedStage(
                    selectedStage === stage.key ? null : stage.key
                  )
                }
                className="w-full text-left focus:outline-none"
              >
                <div
                  className={`flex items-center px-6 py-4 rounded-lg transition-all cursor-pointer ${
                    selectedStage === stage.key
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(10, stage.percentage * 20))}%`,
                  }}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{stage.name}</p>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {stage.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{stage.percentage}%</p>
                  </div>
                </div>
              </button>

              {idx < funnelStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <span className="text-2xl text-gray-400">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics for Selected Stage */}
      {selectedStageData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total de Pessoas"
            value={selectedStageData.leads.toLocaleString()}
            unit={selectedStage === 'topo' ? 'visitantes' : 'leads'}
          />
          <MetricCard
            title="Engajamento Médio"
            value={selectedStageData.avgEngagement}
          />
          <MetricCard title="Custo Médio" value={selectedStageData.cost} />
        </div>
      )}

      {/* Conversion Rates Chart */}
      <ChartCard
        title="Taxa de Conversão entre Etapas"
        type="bar"
        data={conversionRates}
        dataKey="rate"
        xAxisKey="stage"
        height={300}
      />

      {/* Conversion Rates Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Taxa de Conversão Detalhada
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Taxa de Conversão
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {conversionRates.map((row) => (
                <tr key={row.stage} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.stage}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="text-lg font-bold text-primary-600">
                      {row.rate}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.people.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Normal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 Insights</h3>
        <ul className="space-y-2 text-blue-800">
          <li>
            • A taxa de conversão do Topo para Meio está em 2.3%, abaixo da
            média do mercado (3-5%)
          </li>
          <li>
            • O Meio para Fundo tem uma taxa saudável de 14.5%, indicando boa
            qualificação
          </li>
          <li>
            • Foco: melhorar o primeiro passo (Topo → Meio) para aumentar
            volume geral
          </li>
        </ul>
      </div>
    </div>
  );
}
