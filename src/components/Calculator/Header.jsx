import { Moon, Sun, Calculator, TrendingUp } from 'lucide-react';
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
    <header className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-navy to-light-blue rounded-xl shadow-lg">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold text-navy dark:text-light-blue truncate">
              Calculadora Dev | CD
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
              Planeje seu futuro financeiro como desenvolvedor
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 sm:hidden">
              Planeje seu futuro financeiro
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">Investimentos</span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleDarkMode}
            className="rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-light-blue dark:hover:border-light-blue transition-all duration-200 w-9 h-9 sm:w-10 sm:h-10"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}