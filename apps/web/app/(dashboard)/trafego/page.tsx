'use client';

import React from 'react';
import { MetricCard, ChartCard, FilterBar } from '@/components';

const mockCampaignData = [
  { campaign: 'Campaign A', impressions: 15000, clicks: 450, spend: 1200, leads: 45 },
  { campaign: 'Campaign B', impressions: 12000, clicks: 360, spend: 1000, leads: 36 },
  { campaign: 'Campaign C', impressions: 18000, clicks: 540, spend: 1350, leads: 54 },
  { campaign: 'Campaign D', impressions: 10000, clicks: 300, spend: 800, leads: 30 },
];

const mockPerformanceData = [
  { date: 'Jan 1', impressions: 1000, clicks: 30, spend: 120 },
  { date: 'Jan 5', impressions: 1200, clicks: 36, spend: 140 },
  { date: 'Jan 10', impressions: 950, clicks: 28, spend: 110 },
  { date: 'Jan 15', impressions: 1400, clicks: 42, spend: 160 },
  { date: 'Jan 20', impressions: 1100, clicks: 33, spend: 130 },
  { date: 'Jan 25', impossibly: 1600, clicks: 48, spend: 180 },
  { date: 'Jan 30', impressions: 1300, clicks: 39, spend: 150 },
];

export default function TrafegoPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tráfego - Meta Ads</h1>
        <p className="text-gray-600 mt-2">Performance de campanhas no Meta Ads</p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Impressões"
          value="55.000"
          change={8}
          changeLabel="vs. período anterior"
          icon="👁️"
          trend="up"
        />
        <MetricCard
          title="Cliques"
          value="1.650"
          change={12}
          changeLabel="vs. período anterior"
          icon="🖱️"
          trend="up"
        />
        <MetricCard
          title="CTR"
          value="3.0%"
          change={0.2}
          changeLabel="vs. período anterior"
          icon="📊"
          trend="up"
        />
        <MetricCard
          title="Custo por Clique"
          value="R$ 0.73"
          change={-5}
          changeLabel="vs. período anterior"
          icon="💵"
          trend="up"
        />
      </div>

      {/* Performance Chart */}
      <ChartCard
        title="Performance ao Longo do Tempo"
        type="line"
        data={mockPerformanceData}
        dataKeys={['impressions', 'clicks']}
        xAxisKey="date"
        height={350}
      />

      {/* Campaign Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Performance por Campanha
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Campanha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Impressões
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliques
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  CTR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Investimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  CAC
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCampaignData.map((row) => (
                <tr key={row.campaign} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.campaign}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.clicks}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {((row.clicks / row.impressions) * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    R$ {row.spend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.leads}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    R$ {(row.spend / row.leads).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
