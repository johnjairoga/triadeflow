'use client';

import React from 'react';
import { MetricCard, ChartCard, FilterBar } from '@/components';

// Mock data — será substituído por dados reais do API
const mockMetrics = [
  {
    title: 'Leads Gerados',
    value: '1.245',
    unit: 'leads',
    change: 12,
    changeLabel: 'vs. mês passado',
    icon: '👥',
    trend: 'up' as const,
  },
  {
    title: 'Custo por Lead (CAC)',
    value: 'R$ 45,50',
    unit: '',
    change: -8,
    changeLabel: 'vs. mês passado',
    icon: '💰',
    trend: 'up' as const,
  },
  {
    title: 'Taxa de Conversão',
    value: '3.2%',
    unit: '',
    change: 0.5,
    changeLabel: 'vs. mês passado',
    icon: '📈',
    trend: 'up' as const,
  },
  {
    title: 'ROI',
    value: '285%',
    unit: '',
    change: 15,
    changeLabel: 'vs. mês passado',
    icon: '💎',
    trend: 'up' as const,
  },
];

const mockLeadsChartData = [
  { date: 'Jan 1', leads: 45, conversions: 4 },
  { date: 'Jan 5', leads: 52, conversions: 5 },
  { date: 'Jan 10', leads: 48, conversions: 4 },
  { date: 'Jan 15', leads: 61, conversions: 6 },
  { date: 'Jan 20', leads: 55, conversions: 5 },
  { date: 'Jan 25', leads: 67, conversions: 7 },
  { date: 'Jan 30', leads: 72, conversions: 8 },
];

const mockSourceData = [
  { name: 'Meta Ads', value: 450, percentage: 45 },
  { name: 'Google Ads', value: 280, percentage: 28 },
  { name: 'Organic', value: 200, percentage: 20 },
  { name: 'Direct', value: 70, percentage: 7 },
];

const mockSpendData = [
  { date: 'Dia 1', spent: 1200 },
  { date: 'Dia 5', spent: 1350 },
  { date: 'Dia 10', spent: 1100 },
  { date: 'Dia 15', spent: 1450 },
  { date: 'Dia 20', spent: 1300 },
  { date: 'Dia 25', spent: 1600 },
  { date: 'Dia 30', spent: 1550 },
];

const mockFunnelData = [
  { stage: 'Topo\n(Awareness)', value: 5000, percentage: 100 },
  { stage: 'Meio\n(Consideration)', value: 1245, percentage: 25 },
  { stage: 'Fundo\n(Conversion)', value: 180, percentage: 3.6 },
];

export default function PainelPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel Geral</h1>
        <p className="text-gray-600 mt-2">
          Visão geral do desempenho e métricas principais
        </p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Leads e Conversões (Últimos 30 dias)"
          type="line"
          data={mockLeadsChartData}
          dataKeys={['leads', 'conversions']}
          xAxisKey="date"
          height={300}
        />

        <ChartCard
          title="Fonte de Tráfego"
          type="pie"
          data={mockSourceData}
          xAxisKey="name"
          dataKey="value"
          height={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Investimento Diário (Últimos 30 dias)"
          type="bar"
          data={mockSpendData}
          dataKey="spent"
          xAxisKey="date"
          height={300}
        />

        <ChartCard
          title="Distribuição por Etapa do Funil"
          type="bar"
          data={mockFunnelData}
          dataKey="value"
          xAxisKey="stage"
          height={300}
        />
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resumo do Período
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Investimento Total</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">R$ 9.550</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Custo Médio por Lead</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">R$ 45,50</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Leads Qualificados</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">180</p>
          </div>
        </div>
      </div>
    </div>
  );
}
