'use client';

import React from 'react';
import { FilterBar } from '@/components';

const mockSyncLogs = [
  {
    id: '1',
    module: 'Meta Ads',
    entity: 'ad_insights',
    status: 'success',
    rowsProcessed: 450,
    startedAt: '2026-08-01T10:00:00Z',
    finishedAt: '2026-08-01T10:02:30Z',
  },
  {
    id: '2',
    module: 'GHL',
    entity: 'contacts',
    status: 'success',
    rowsProcessed: 125,
    startedAt: '2026-08-01T10:15:00Z',
    finishedAt: '2026-08-01T10:16:45Z',
  },
  {
    id: '3',
    module: 'Meta Ads',
    entity: 'campaigns',
    status: 'success',
    rowsProcessed: 28,
    startedAt: '2026-08-01T10:30:00Z',
    finishedAt: '2026-08-01T10:31:15Z',
  },
  {
    id: '4',
    module: 'GHL',
    entity: 'opportunities',
    status: 'failed',
    rowsProcessed: 0,
    errorMessage: 'API authentication failed',
    startedAt: '2026-08-01T09:45:00Z',
    finishedAt: '2026-08-01T09:45:30Z',
  },
];

const mockFreshnessStatus = [
  {
    module: 'Meta Ads',
    entity: 'ad_insights',
    status: 'fresh',
    lastUpdate: '2 minutos atrás',
    expectedUpdate: '15 minutos',
  },
  {
    module: 'GHL',
    entity: 'contacts',
    status: 'fresh',
    lastUpdate: '8 minutos atrás',
    expectedUpdate: '15 minutos',
  },
  {
    module: 'GHL',
    entity: 'opportunities',
    status: 'error',
    lastUpdate: '45 minutos atrás',
    expectedUpdate: '15 minutos',
  },
];

const mockSchemaDrift = [
  {
    id: '1',
    module: 'Meta Ads',
    entity: 'ad_insights',
    changeType: 'added_column',
    columnName: 'video_p100_watched_actions',
    detectedAt: '2026-08-01T09:30:00Z',
    severity: 'warning',
    acknowledged: false,
  },
];

export default function AuditoriaPage() {
  const [activeTab, setActiveTab] = React.useState<
    'sync' | 'freshness' | 'schema'
  >('sync');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Auditoria</h1>
        <p className="text-gray-600 mt-2">
          Logs de sincronização, freshness de dados e schema drift
        </p>
      </div>

      {/* Filters */}
      <FilterBar showDateRange />

      {/* Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 text-sm font-medium">
                Sincronizações com Sucesso
              </p>
              <p className="text-3xl font-bold text-green-900 mt-2">3/4</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 text-sm font-medium">
                Dados Atualizados
              </p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">2/3</p>
            </div>
            <span className="text-4xl">⚠️</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 text-sm font-medium">
                Schema Changes
              </p>
              <p className="text-3xl font-bold text-red-900 mt-2">1</p>
            </div>
            <span className="text-4xl">⚡</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('sync')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'sync'
              ? 'text-primary-600 border-primary-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          Logs de Sincronização
        </button>
        <button
          onClick={() => setActiveTab('freshness')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'freshness'
              ? 'text-primary-600 border-primary-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          Freshness de Dados
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'schema'
              ? 'text-primary-600 border-primary-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          Schema Drift
        </button>
      </div>

      {/* Sync Logs Tab */}
      {activeTab === 'sync' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Módulo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Entidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Linhas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Duração
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Iniciado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockSyncLogs.map((log) => {
                  const duration = new Date(
                    new Date(log.finishedAt!).getTime() -
                      new Date(log.startedAt).getTime()
                  )
                    .getSeconds()
                    .toString();
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {log.module}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.entity}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            log.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {log.status === 'success' ? '✓ Sucesso' : '✗ Falha'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.rowsProcessed}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {duration}s
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(log.startedAt).toLocaleTimeString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Freshness Tab */}
      {activeTab === 'freshness' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Módulo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Entidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Última Atualização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Próxima Esperada
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockFreshnessStatus.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {row.module}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.entity}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'fresh'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {row.status === 'fresh' ? '✓ Atualizado' : '✗ Atrasado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.lastUpdate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.expectedUpdate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schema Drift Tab */}
      {activeTab === 'schema' && (
        <div className="space-y-4">
          {mockSchemaDrift.length > 0 ? (
            mockSchemaDrift.map((drift) => (
              <div
                key={drift.id}
                className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-yellow-900">
                      {drift.module} - {drift.entity}
                    </p>
                    <p className="text-yellow-800 text-sm mt-1">
                      Mudança: {drift.changeType} ({drift.columnName})
                    </p>
                  </div>
                  <button className="text-sm font-medium text-yellow-700 hover:text-yellow-900">
                    Revisar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">Nenhuma mudança de schema detectada</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
