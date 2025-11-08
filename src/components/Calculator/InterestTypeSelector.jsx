import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function InterestTypeSelector({ isAnnual, setIsAnnual }) {
  const handleToggle = (value) => {
    try {
      setIsAnnual?.(value);
    } catch (error) {
      console.warn('Error setting interest type:', error);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-navy dark:text-light-blue">Tipo de Juros</h3>
        <div className="flex gap-2">
          <Button
            variant={!isAnnual ? "default" : "outline"}
            onClick={() => handleToggle(false)}
            className="flex-1"
          >
            Mensal
          </Button>
          <Button
            variant={isAnnual ? "default" : "outline"}
            onClick={() => handleToggle(true)}
            className="flex-1"
          >
            Anual
          </Button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          {isAnnual 
            ? "Taxa de juros será aplicada anualmente" 
            : "Taxa de juros será aplicada mensalmente"
          }
        </p>
      </CardContent>
    </Card>
  );
}