'use client';

import React from 'react';
import { MetricCard, ChartCard, FilterBar } from '@/components';

const mockROIData = [
  { date: 'Jan 1', investment: 1200, revenue: 3400 },
  { date: 'Jan 5', investment: 1350, revenue: 3800 },
  { date: 'Jan 10', investment: 1100, revenue: 3200 },
  { date: 'Jan 15', investment: 1450, revenue: 4200 },
  { date: 'Jan 20', investment: 1300, revenue: 3900 },
  { date: 'Jan 25', investment: 1600, revenue: 4600 },
  { date: 'Jan 30', investment: 1550, revenue: 4400 },
];

const mockChannelROI = [
  { channel: 'Meta Ads', roi: 285, roas: 3.85, spend: 5000 },
  { channel: 'Google Ads', roi: 210, roas: 3.1, spend: 3200 },
  { channel: 'Organic', roi: 500, roas: 9.5, spend: 800 },
];

export default function ResultadoROIPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resultado e ROI</h1>
        <p className="text-gray-600 mt-2">
          Análise de retorno sobre investimento e lucratividade
        </p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          value="R$ 27.600"
          change={18}
          changeLabel="vs. período anterior"
          icon="💵"
          trend="up"
        />
        <MetricCard
          title="Investimento Total"
          value="R$ 9.550"
          change={2}
          changeLabel="vs. período anterior"
          icon="💳"
          trend="up"
        />
        <MetricCard
          title="ROI"
          value="285%"
          change={15}
          changeLabel="vs. período anterior"
          icon="📊"
          trend="up"
        />
        <MetricCard
          title="ROAS"
          value="2.89x"
          change={12}
          changeLabel="vs. período anterior"
          icon="🎯"
          trend="up"
        />
      </div>

      {/* ROI Chart */}
      <ChartCard
        title="Investimento vs Receita (Últimos 30 dias)"
        type="line"
        data={mockROIData}
        dataKeys={['investment', 'revenue']}
        xAxisKey="date"
        height={350}
        colors={['#EC4899', '#10B981']}
      />

      {/* Channel ROI Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            ROI por Canal
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Canal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Investimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ROAS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockChannelROI.map((row) => (
                <tr key={row.channel} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.channel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    R$ {row.spend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {row.roi}%
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {row.roas}x
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div
                      className="w-full bg-gray-200 rounded-full h-2"
                      title={`${row.roi}% ROI`}
                    >
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (row.roi / 500) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profitability Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Lucro Bruto
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-800">Receita Total</span>
              <span className="font-bold text-green-900">R$ 27.600</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-800">Investimento Marketing</span>
              <span className="font-bold text-green-900">-R$ 9.550</span>
            </div>
            <div className="border-t-2 border-green-200 pt-3 flex justify-between">
              <span className="font-bold text-green-900">Lucro Líquido</span>
              <span className="text-2xl font-bold text-green-900">
                R$ 18.050
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Indicadores Chave
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-800">Margem de Lucro</span>
              <span className="font-bold text-blue-900">65.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800">Payback Period</span>
              <span className="font-bold text-blue-900">8 dias</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800">Valor Médio por Cliente</span>
              <span className="font-bold text-blue-900">R$ 153,33</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
