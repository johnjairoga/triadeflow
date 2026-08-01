import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number; // percentage change
  changeLabel?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  trend = 'neutral',
}: MetricCardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-green-600'
      : trend === 'down'
        ? 'text-red-600'
        : 'text-gray-600';

  const trendIcon =
    trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary-500">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            {unit && <span className="text-gray-600 text-sm">{unit}</span>}
          </div>
          {change !== undefined && (
            <div className={`mt-2 flex items-center space-x-1 ${trendColor}`}>
              <span className="text-sm font-medium">
                {trendIcon} {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-gray-600">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  );
}
