'use client';

import React from 'react';
import { FilterBar } from '@/components';

const mockAudienceSets = [
  {
    id: '1',
    name: 'Website Visitors - Last 30 days',
    size: 12500,
    reach: '2.3M',
    frequency: 2.1,
    status: 'active',
  },
  {
    id: '2',
    name: 'Lead Database - Qualified',
    size: 3200,
    reach: '1.8M',
    frequency: 3.5,
    status: 'active',
  },
  {
    id: '3',
    name: 'Cart Abandoners',
    size: 1850,
    reach: '950K',
    frequency: 2.8,
    status: 'active',
  },
  {
    id: '4',
    name: 'Past Customers',
    size: 5400,
    reach: '2.1M',
    frequency: 1.9,
    status: 'paused',
  },
];

export default function ConjuntosPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Conjuntos de Audiência</h1>
        <p className="text-gray-600 mt-2">
          Gerenciamento de públicos e segmentos para campanhas
        </p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange />

      {/* Audience Sets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Públicos Ativos
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome do Conjunto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tamanho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Alcance Potencial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Frequência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAudienceSets.map((set) => (
                <tr key={set.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {set.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {set.size.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {set.reach}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {set.frequency}x
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        set.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {set.status === 'active' ? '✓ Ativo' : 'Pausado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total de Conjuntos</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {mockAudienceSets.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Tamanho Total do Público</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {mockAudienceSets
              .reduce((sum, s) => sum + s.size, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Alcance Médio Potencial</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">8.55M</p>
        </div>
      </div>
    </div>
  );
}
