'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerenciar preferências e identidade visual</p>
      </div>

      {/* Branding Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Identidade Visual
        </h3>

        <div className="space-y-6">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo da Empresa
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-gray-400">Logo</span>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Alterar
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Primária
              </label>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-600 rounded-lg"></div>
                <input
                  type="text"
                  value="#4F46E5"
                  readOnly
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Secundária
              </label>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary-600 rounded-lg"></div>
                <input
                  type="text"
                  value="#06B6D4"
                  readOnly
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor de Destaque
              </label>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent-600 rounded-lg"></div>
                <input
                  type="text"
                  value="#EC4899"
                  readOnly
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Font */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fonte Principal
            </label>
            <select
              defaultValue="inter"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="inter">Inter (Padrão)</option>
              <option value="roboto">Roboto</option>
              <option value="poppins">Poppins</option>
              <option value="sans">Helvetica</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            Salvar Alterações
          </button>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Usuários
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">John Jairo</p>
              <p className="text-sm text-gray-600">john@triadeflow.com.br</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Admin
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            + Convidar Usuário
          </button>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Integrações</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Meta Ads</p>
              <p className="text-sm text-gray-600">
                Sincronização ativa de campanhas
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Conectado
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">GoHighLevel (GHL)</p>
              <p className="text-sm text-gray-600">
                Sincronização de CRM e oportunidades
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Conectado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
