import { Button } from '@/components/ui/button';
import { Calculator, Sparkles } from 'lucide-react';

export function CalculateButton({ onCalculate, isReady }) {
  return (
    <div className="text-center py-8">
      <Button
        onClick={() => {
          try {
            onCalculate()
          } catch (error) {
            console.error('Error in calculate button:', error)
          }
        }}
        disabled={!isReady}
        size="lg"
        className={`px-12 py-6 text-lg font-bold transition-all duration-300 ${
          isReady 
            ? 'bg-gradient-to-r from-navy to-light-blue hover:from-light-blue hover:to-navy shadow-2xl hover:shadow-3xl transform hover:scale-105' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        <Calculator className="w-6 h-6 mr-3" />
        {isReady ? 'Calcular Meu Futuro' : 'Preencha os Dados'}
        <Sparkles className="w-6 h-6 ml-3" />
      </Button>
      {isReady && (
        <p className="text-sm text-gray-600 mt-3 animate-pulse">
          Descubra o poder dos juros compostos na sua carreira!
        </p>
      )}
    </div>
  );
}