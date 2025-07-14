import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Erro ao buscar dados');
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Welcome to Plannfly</h2>
          <p className="text-gray-600">
            This is your internal dashboard where you can manage classes, students, subscriptions, and more.
          </p>
        </div>

        {isLoading ? (
          <p className="text-gray-600">Carregando métricas...</p>
        ) : error ? (
          <p className="text-red-500">Erro ao carregar métricas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[
              { title: 'Classes', count: data.classes },
              { title: 'Active Students', count: data.students },
              { title: 'Teachers', count: data.teachers },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase">{item.title}</h3>
                <p className="text-3xl font-bold mt-2">{item.count}</p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
                <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
