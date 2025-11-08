import { Moon, Sun, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header({ darkMode, toggleDarkMode }) {
  const handleToggleDarkMode = () => {
    try {
      toggleDarkMode?.();
    } catch (error) {
      console.warn('Error toggling dark mode:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-navy rounded-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy dark:text-light-blue">
              Calculadora Dev | CD
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Planeje seu futuro financeiro como desenvolvedor
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleDarkMode}
          className="rounded-full border-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}