import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhaseResultCard } from './PhaseResultCard';
import { TrendingUp, DollarSign, Target, PiggyBank } from 'lucide-react';

export function ResultsDisplay({ results, phases }) {
  if (!results) {
    return null;
  }

  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const profitPercentage = results.totalInvested > 0 ? ((results.totalInterest / results.totalInvested) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <Card className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-navy dark:text-light-blue">
            <Target className="w-6 h-6" />
            Resumo Final da Simulação
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Montante Final */}
            <div className="bg-gradient-to-br from-navy to-light-blue rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  PATRIMÔNIO FINAL
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-black text-white">
                {formatCurrency(results.finalAmount)}
              </p>
              <p className="text-xs text-blue-100 mt-1 font-semibold">
                Em {Math.round((results.totalMonths || 0) / 12)} anos
              </p>
            </div>

            {/* Total Investido */}
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  TOTAL INVESTIDO
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-black text-white">
                {formatCurrency(results.totalInvested)}
              </p>
              <p className="text-xs text-gray-200 mt-1 font-semibold">
                Seus aportes
              </p>
            </div>

            {/* Juros Ganhos */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  LUCRO TOTAL
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-black text-white">
                {formatCurrency(results.totalInterest)}
              </p>
              <p className="text-xs text-green-100 mt-1 font-semibold">
                +{profitPercentage}% de retorno
              </p>
            </div>

            {/* Duração Total */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  TEMPO TOTAL
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-black text-white">
                {Math.round((results.totalMonths || 0) / 12)} anos
              </p>
              <p className="text-xs text-purple-100 mt-1 font-semibold">
                {results.totalMonths || 0} meses
              </p>
            </div>
          </div>

          {/* Resumo Detalhado */}
          <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Detalhamento do Investimento</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Valor inicial:</span>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {formatCurrency(results.initialAmount || 0)}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Aporte médio mensal:</span>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {formatCurrency((results.totalInvested - (results.initialAmount || 0)) / (results.totalMonths || 1))}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Rentabilidade total:</span>
                <p className="font-semibold text-profit">
                  +{profitPercentage}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados por Fase */}
      {results.phaseDetails && results.phaseDetails.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Detalhes por Fase da Carreira
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {results.phaseDetails.map((phaseDetail, index) => (
              <PhaseResultCard
                key={`${phaseDetail.name}-${index}`}
                phaseDetail={phaseDetail}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}