'use client';

import React from 'react';

interface FilterBarProps {
  onDateChange?: (startDate: string, endDate: string) => void;
  onStatusChange?: (status: string) => void;
  showDateRange?: boolean;
  showStatus?: boolean;
  showFunnelStage?: boolean;
  onFunnelStageChange?: (stage: string) => void;
}

export function FilterBar({
  onDateChange,
  onStatusChange,
  showDateRange = true,
  showStatus = false,
  showFunnelStage = false,
  onFunnelStageChange,
}: FilterBarProps) {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [startDate, setStartDate] = React.useState(thirtyDaysAgo);
  const [endDate, setEndDate] = React.useState(today);
  const [status, setStatus] = React.useState('all');
  const [funnelStage, setFunnelStage] = React.useState('all');

  const handleDateChange = () => {
    onDateChange?.(startDate, endDate);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange?.(value);
  };

  const handleFunnelChange = (value: string) => {
    setFunnelStage(value);
    onFunnelStageChange?.(value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {showDateRange && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                De
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Até
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleDateChange}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Aplicar
              </button>
            </div>
          </>
        )}

        {showStatus && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos</option>
              <option value="open">Aberto</option>
              <option value="won">Ganho</option>
              <option value="lost">Perdido</option>
              <option value="abandoned">Abandonado</option>
            </select>
          </div>
        )}

        {showFunnelStage && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Etapa do Funil
            </label>
            <select
              value={funnelStage}
              onChange={(e) => handleFunnelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos</option>
              <option value="topo">Topo (Awareness)</option>
              <option value="meio">Meio (Consideration)</option>
              <option value="fundo">Fundo (Conversion)</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
