import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';

export function CareerPhaseCard({ 
  phase, 
  isSelected, 
  onToggle, 
  salary, 
  setSalary,
  percentage,
  setPercentage,
  duration,
  setDuration
}) {
  if (!phase) return null;
  
  const monthlyContribution = ((Number(salary) || 0) * (percentage || 0)) / 100;

  const handleSalaryChange = (e) => {
    try {
      const inputValue = e.target.value;
      if (inputValue === '') {
        setSalary?.('');
      } else {
        const value = Math.max(0, Number(inputValue) || 0);
        setSalary?.(value);
      }
    } catch (error) {
      console.warn('Error setting salary:', error);
    }
  };

  const handlePercentageChange = (e) => {
    try {
      const value = Math.max(5, Math.min(100, Number(e.target.value) || 5));
      setPercentage?.(value);
    } catch (error) {
      console.warn('Error setting percentage:', error);
    }
  };

  const handleDurationChange = (e) => {
    try {
      const inputValue = e.target.value;
      if (inputValue === '') {
        setDuration?.('');
      } else {
        const value = Math.max(0, Number(inputValue) || 0);
        setDuration?.(value);
      }
    } catch (error) {
      console.warn('Error setting duration:', error);
    }
  };

  return (
    <Card className={`bg-white dark:bg-gray-800 border-2 transition-all duration-300 ${
      isSelected 
        ? 'border-light-blue shadow-2xl scale-105 bg-blue-50 dark:bg-blue-900/50' 
        : 'border-gray-300 dark:border-gray-600 hover:shadow-xl hover:border-light-blue/50 dark:hover:border-light-blue/50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{phase?.name || 'Fase'}</CardTitle>
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={onToggle}
            className={`rounded-full w-8 h-8 p-0 transition-all duration-200 ${
              isSelected 
                ? 'bg-green-600 hover:bg-green-700 border-green-600' 
                : 'bg-blue-50 hover:bg-blue-100 border-blue-300 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 dark:border-blue-600'
            }`}
          >
            {isSelected ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {phase?.description || 'Descrição da fase'}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Salário */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Salário Mensal (R$)
          </label>
          <Input
            type="number"
            value={salary === '' ? '' : salary}
            onChange={handleSalaryChange}
            aria-label="Salário mensal"
            placeholder={phase?.averageSalary?.toString() || '0'}
            min="0"
            className="bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 focus:border-light-blue focus:ring-2 focus:ring-light-blue/50 dark:text-white text-gray-900"
          />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Sugestão: R$ {(phase?.averageSalary || 0).toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Porcentagem */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
            % do Salário para Investir: {percentage}%
          </label>
          <input
            type="range"
            min={5}
            max={100}
            step={1}
            value={percentage}
            onChange={handlePercentageChange}
            aria-label="Porcentagem para investir"
            className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>5%</span>
            <span className="font-bold text-profit bg-green-200 dark:bg-green-800 px-3 py-1 rounded-full border border-green-400 dark:border-green-600">
              R$ {monthlyContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
            </span>
            <span>100%</span>
          </div>
        </div>

        {/* Duração */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Tempo nesta Fase (meses)
          </label>
          <Input
            type="number"
            value={duration === '' ? '' : duration}
            onChange={handleDurationChange}
            aria-label="Duração da fase"
            placeholder={phase?.duration?.toString() || '0'}
            min="0"
            className="bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 focus:border-light-blue focus:ring-2 focus:ring-light-blue/50 dark:text-white text-gray-900"
          />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Sugestão: {phase?.duration || 0} meses ({Math.round((phase?.duration || 0) / 12)} anos)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}