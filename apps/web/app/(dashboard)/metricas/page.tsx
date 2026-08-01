'use client';

import React from 'react';

const metrics = [
  {
    id: 'cac',
    name: 'Custo de Aquisição de Cliente (CAC)',
    category: 'Primária',
    funnelStage: 'Fundo',
    value: 'R$ 45,50',
    description: 'Total gasto dividido por clientes novos adquiridos',
  },
  {
    id: 'conversion_rate',
    name: 'Taxa de Conversão',
    category: 'Primária',
    funnelStage: 'Fundo',
    value: '3.2%',
    description: 'Percentual de visitantes que se convertem em clientes',
  },
  {
    id: 'ctr',
    name: 'Click-Through Rate (CTR)',
    category: 'Secundária',
    funnelStage: 'Topo',
    value: '3.0%',
    description: 'Taxa de cliques em relação a impressões (Meta Ads)',
  },
  {
    id: 'roi',
    name: 'Retorno sobre Investimento (ROI)',
    category: 'Primária',
    funnelStage: 'Fundo',
    value: '285%',
    description: 'Lucro gerado em relação ao investimento em marketing',
  },
  {
    id: 'roas',
    name: 'Retorno sobre Gasto em Ads (ROAS)',
    category: 'Primária',
    funnelStage: 'Fundo',
    value: '3.85x',
    description: 'Receita gerada por real gasto em anúncios',
  },
  {
    id: 'cpc',
    name: 'Custo por Clique (CPC)',
    category: 'Secundária',
    funnelStage: 'Topo',
    value: 'R$ 0.73',
    description: 'Quanto custa cada clique nos anúncios',
  },
];

export default function MetricasPage() {
  const [selectedMetric, setSelectedMetric] = React.useState<string | null>(null);

  const selected = metrics.find((m) => m.id === selectedMetric);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Catálogo de Métricas</h1>
        <p className="text-gray-600 mt-2">
          Definições e valores atuais de todas as métricas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metrics List */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedMetric === metric.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {metric.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {metric.description}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-primary-600 ml-4 whitespace-nowrap">
                    {metric.value}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    {metric.category}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                    {metric.funnelStage}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detalhes
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Métrica
                  </p>
                  <p className="text-gray-900 mt-1">{selected.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Valor Atual
                  </p>
                  <p className="text-3xl font-bold text-primary-600 mt-1">
                    {selected.value}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Descrição
                  </p>
                  <p className="text-gray-600 mt-1">{selected.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Etapa do Funil
                  </p>
                  <p className="text-gray-900 mt-1">{selected.funnelStage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Tipo
                  </p>
                  <p className="text-gray-900 mt-1">{selected.category}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600">Selecione uma métrica para ver detalhes</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Metrics Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Métricas Customizadas
          </h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            + Criar Métrica
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Crie métricas customizadas específicas para seu negócio
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600">Nenhuma métrica customizada criada ainda</p>
          <button className="mt-4 text-primary-600 font-medium hover:text-primary-700">
            Clique para criar a primeira
          </button>
        </div>
      </div>
    </div>
  );
}
