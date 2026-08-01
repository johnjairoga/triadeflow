'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: any[];
  dataKey?: string;
  dataKeys?: string[];
  xAxisKey?: string;
  height?: number;
  colors?: string[];
}

const defaultColors = ['#4F46E5', '#06B6D4', '#EC4899', '#F59E0B', '#10B981'];

export function ChartCard({
  title,
  type,
  data,
  dataKey,
  dataKeys,
  xAxisKey = 'name',
  height = 300,
  colors = defaultColors,
}: ChartCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'line' && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys ? (
              dataKeys.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[idx % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))
            ) : dataKey ? (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={false}
              />
            ) : null}
          </LineChart>
        )}

        {type === 'bar' && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys ? (
              dataKeys.map((key, idx) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[idx % colors.length]}
                />
              ))
            ) : dataKey ? (
              <Bar dataKey={dataKey} fill={colors[0]} />
            ) : null}
          </BarChart>
        )}

        {type === 'pie' && (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey || 'value'}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={colors[idx % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
