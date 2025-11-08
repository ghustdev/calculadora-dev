import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Clock, PiggyBank, Target, Wallet } from 'lucide-react';

export function PhaseResultCard({ phaseDetail, index }) {
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!phaseDetail) {
    return null;
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-navy dark:text-light-blue">
          <TrendingUp className="w-5 h-5" />
          {phaseDetail.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Salário</span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(phaseDetail.salary)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Aporte Mensal</span>
            </div>
            <p className="font-semibold text-navy dark:text-light-blue">
              {formatCurrency(phaseDetail.monthlyContribution)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Duração</span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {phaseDetail.duration} meses
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Valor Inicial</span>
            </div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              {formatCurrency(phaseDetail.initialAmount)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Investido</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {formatCurrency(phaseDetail.totalInvested)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lucro</span>
            <span className="font-bold text-green-600">
              {formatCurrency(phaseDetail.totalInterest)}
            </span>
          </div>
          
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-navy dark:text-light-blue" />
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Patrimônio Final</span>
            </div>
            <span className="font-black text-navy dark:text-light-blue">
              {formatCurrency(phaseDetail.finalAmount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}