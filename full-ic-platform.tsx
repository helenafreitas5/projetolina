import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter, Calendar, Plus, MessageSquare, Bell, Settings } from 'lucide-react';

const ICPlatform = () => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [activeChart, setActiveChart] = useState(null);

  const sources = [
    { id: 1, name: 'Google Trends', status: 'active' },
    { id: 2, name: 'Social Media', status: 'active' },
    { id: 3, name: 'Market Reports', status: 'pending' },
    { id: 4, name: 'News Feed', status: 'active' }
  ];

  const messages = [
    { type: 'system', content: '✓ Fontes conectadas: Google Trends, Social Media' },
    { type: 'assistant', content: 'Identifiquei tendências relevantes do setor de beleza. A busca por "skincare coreano" aumentou 45% no último trimestre.' },
    { type: 'user', content: 'Mostre os principais produtos' },
    { type: 'assistant', content: 'Produtos mais relevantes:\n1. Essência facial (42%)\n2. Máscara de arroz (28%)\n3. Sérum vitamina C (15%)' }
  ];

  const mockData = {
    trends: [
      { month: 'Jan', skincare: 65, makeup: 45 },
      { month: 'Feb', skincare: 70, makeup: 52 },
      { month: 'Mar', skincare: 85, makeup: 58 }
    ],
    market: [
      { name: 'Natura', value: 35 },
      { name: 'Avon', value: 25 },
      { name: 'Boticário', value: 20 }
    ],
    performance: [
      { category: 'Skincare', atual: 92, meta: 85 },
      { category: 'Makeup', atual: 78, meta: 80 }
    ]
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold">Plataforma IC Natura</h1>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sources Panel */}
        <div className="w-64 border-r p-4">
          <div className="space-y-4">
            <h2 className="font-medium flex justify-between items-center">
              Fontes de Dados
              <Plus size={16} className="cursor-pointer" />
            </h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar fontes..." className="w-full pl-9 p-2 rounded-md border bg-gray-50" />
            </div>

            <div className="flex gap-2">
              <button className="p-2 text-sm rounded-md border hover:bg-gray-50 flex items-center gap-1">
                <Filter size={14} />Filtrar
              </button>
              <button className="p-2 text-sm rounded-md border hover:bg-gray-50 flex items-center gap-1">
                <Calendar size={14} />Data
              </button>
            </div>

            <div className="space-y-2">
              {sources.map(source => (
                <div key={source.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={selectedSources.includes(source.id)}
                    onChange={() => {
                      setSelectedSources(prev =>
                        prev.includes(source.id)
                          ? prev.filter(id => id !== source.id)
                          : [...prev, source.id]
                      );
                    }}
                  />
                  <span>{source.name}</span>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    source.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {source.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'system' 
                      ? 'bg-blue-50 text-blue-700 text-sm' 
                      : msg.type === 'user'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Digite sua pergunta ou comando de análise..."
              className="w-full p-3 rounded-md border bg-gray-50"
            />
          </div>
        </div>

        {/* Studio Panel */}
        <div className="w-96 border-l bg-gray-900 text-white p-4">
          <div className="mb-6">
            <h2 className="text-lg font-medium">Estúdio</h2>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-3">Dashboard Rápido</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setActiveChart('trends')}
                className={`p-2 text-sm rounded-md ${
                  activeChart === 'trends' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}>
                Trends
              </button>
              <button 
                onClick={() => setActiveChart('market')}
                className={`p-2 text-sm rounded-md ${
                  activeChart === 'market' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}>
                Market Share
              </button>
              <button 
                onClick={() => setActiveChart('performance')}
                className={`p-2 text-sm rounded-md ${
                  activeChart === 'performance' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}>
                Performance
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="h-96">
              {activeChart === 'trends' && (
                <ResponsiveContainer>
                  <LineChart data={mockData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="skincare" stroke="#8884d8" />
                    <Line type="monotone" dataKey="makeup" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeChart === 'market' && (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={mockData.market}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}

              {activeChart === 'performance' && (
                <ResponsiveContainer>
                  <BarChart data={mockData.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atual" fill="#8884d8" />
                    <Bar dataKey="meta" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {activeChart && (
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md">
                  Exportar
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md">
                  Compartilhar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPlatform;