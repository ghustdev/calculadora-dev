import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function EvolutionChart({ evolution, darkMode }) {
  if (!evolution || evolution.length === 0) {
    return (
      <Card className="glass border-0">
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Gráfico será exibido após o cálculo
          </p>
        </CardContent>
      </Card>
    );
  }

  const data = {
    labels: evolution.map(item => {
      const years = Math.floor(item.month / 12);
      const months = item.month % 12;
      if (years === 0) return `${months}m`;
      if (months === 0) return `${years}a`;
      return `${years}a ${months}m`;
    }),
    datasets: [
      {
        label: 'Total Investido',
        data: evolution.map(item => item.totalInvested),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Juros Acumulados',
        data: evolution.map(item => item.totalInterest),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Montante Total',
        data: evolution.map(item => item.totalAmount),
        borderColor: '#1e3a8a',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        fill: false,
        tension: 0.4,
        borderWidth: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#e5e7eb' : '#374151',
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#e5e7eb' : '#374151',
        bodyColor: darkMode ? '#e5e7eb' : '#374151',
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const value = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(context.parsed.y);
            return `${context.dataset.label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-light-blue" />
          Evolução do Investimento
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="h-64 sm:h-80 mb-4">
          <Line data={data} options={options} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-3 h-3 bg-light-blue rounded-full mx-auto mb-1"></div>
            <p className="font-medium text-blue-700 dark:text-blue-300">Total Investido</p>
            <p className="text-xs text-muted-foreground">Seus aportes</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-3 h-3 bg-profit rounded-full mx-auto mb-1"></div>
            <p className="font-medium text-profit">Juros Acumulados</p>
            <p className="text-xs text-muted-foreground">Rendimento</p>
          </div>
          <div className="text-center p-3 bg-navy/10 dark:bg-navy/20 rounded-lg">
            <div className="w-3 h-3 bg-navy rounded-full mx-auto mb-1"></div>
            <p className="font-medium text-navy dark:text-light-blue">Montante Total</p>
            <p className="text-xs text-muted-foreground">Valor final</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}