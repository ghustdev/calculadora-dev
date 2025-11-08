import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function BasicInputs({ 
  initialAmount, 
  setInitialAmount,
  interestRate,
  setInterestRate,
  isAnnual 
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl">
      <CardHeader>
        <CardTitle className="text-navy dark:text-light-blue">Configurações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Valor Inicial */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Valor Inicial (R$)
          </label>
          <Input
            type="number"
            value={initialAmount === '' ? '' : initialAmount}
            onChange={(e) => {
              try {
                const inputValue = e.target.value;
                if (inputValue === '') {
                  setInitialAmount('');
                } else {
                  const value = Math.max(0, Number(inputValue) || 0);
                  setInitialAmount(value);
                }
              } catch (error) {
                console.warn('Error setting initial amount:', error)
              }
            }}
            placeholder="0"
            min="0"
            className="bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 focus:border-light-blue focus:ring-2 focus:ring-light-blue/50 dark:text-white text-gray-900"
          />
        </div>

        {/* Taxa de Juros */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Taxa de Juros ({isAnnual ? 'ao ano' : 'ao mês'}) (%)
          </label>
          <Input
            type="number"
            value={interestRate === '' ? '' : interestRate}
            onChange={(e) => {
              try {
                const inputValue = e.target.value;
                if (inputValue === '') {
                  setInterestRate('');
                } else {
                  const value = Math.max(0, Number(inputValue) || 0);
                  setInterestRate(value);
                }
              } catch (error) {
                console.warn('Error setting interest rate:', error)
              }
            }}
            placeholder={isAnnual ? "12" : "1"}
            min="0"
            step="0.1"
            className="bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 focus:border-light-blue focus:ring-2 focus:ring-light-blue/50 dark:text-white text-gray-900"
          />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {isAnnual 
              ? "Ex: 12% ao ano (CDI, Tesouro Direto)" 
              : "Ex: 1% ao mês (Fundos, Ações)"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}