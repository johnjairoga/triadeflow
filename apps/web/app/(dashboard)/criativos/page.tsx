'use client';

import React from 'react';
import { ChartCard, FilterBar } from '@/components';

const mockCreativeData = [
  {
    id: '1',
    name: 'Video - Product Demo',
    type: 'VIDEO',
    impressions: 8500,
    clicks: 255,
    spend: 400,
    leads: 25,
  },
  {
    id: '2',
    name: 'Carousel - Benefits',
    type: 'CAROUSEL',
    impressions: 12000,
    clicks: 360,
    spend: 500,
    leads: 36,
  },
  {
    id: '3',
    name: 'Image - Testimonial',
    type: 'IMAGE',
    impressions: 15500,
    clicks: 465,
    spend: 650,
    leads: 46,
  },
  {
    id: '4',
    name: 'Collection - Products',
    type: 'COLLECTION',
    impressions: 10200,
    clicks: 306,
    spend: 450,
    leads: 30,
  },
  {
    id: '5',
    name: 'Video - Customer Success',
    type: 'VIDEO',
    impressions: 9800,
    clicks: 294,
    spend: 380,
    leads: 29,
  },
];

const mockCreativePerformance = [
  { name: 'Video - Product', engagement: 78, conversion: 12 },
  { name: 'Carousel - Benefits', engagement: 82, conversion: 15 },
  { name: 'Image - Testimonial', engagement: 88, conversion: 18 },
  { name: 'Collection', engagement: 72, conversion: 10 },
  { name: 'Video - Success', engagement: 75, conversion: 11 },
];

export default function CriativosPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Criativos</h1>
        <p className="text-gray-600 mt-2">Performance por tipo de criativo</p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange />

      {/* Performance Chart */}
      <ChartCard
        title="Engajamento vs Conversão por Criativo"
        type="bar"
        data={mockCreativePerformance}
        dataKeys={['engagement', 'conversion']}
        xAxisKey="name"
        height={300}
      />

      {/* Creatives Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Performance por Criativo
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Criativo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
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
                  CPL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCreativeData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.clicks}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {((row.clicks / row.impressions) * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    R$ {row.spend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.leads}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    R$ {(row.spend / row.leads).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creative Types Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {['VIDEO', 'IMAGE', 'CAROUSEL', 'COLLECTION'].map((type) => {
          const typeData = mockCreativeData.filter((c) => c.type === type);
          const totalSpend = typeData.reduce((sum, c) => sum + c.spend, 0);
          const totalLeads = typeData.reduce((sum, c) => sum + c.leads, 0);
          return (
            <div
              key={type}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4"
            >
              <p className="text-sm font-medium text-gray-700">{type}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {typeData.length}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                CPL: R$ {(totalSpend / totalLeads).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
