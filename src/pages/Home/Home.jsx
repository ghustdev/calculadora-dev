import { useState, useEffect } from 'react';
import { Header } from '@/components/Calculator/Header';
import { InterestTypeSelector } from '@/components/Calculator/InterestTypeSelector';
import { BasicInputs } from '@/components/Calculator/BasicInputs';
import { CalculateButton } from '@/components/Calculator/CalculateButton';
import { CareerPhasesSelector } from '@/components/CareerPhases/CareerPhasesSelector';
import { ResultsDisplay } from '@/components/Results/ResultsDisplay';
import { EvolutionChart } from '@/components/Chart/EvolutionChart';
import { calculateCareerInvestment } from '@/utils/calculations';
import logoImage from '@/assets/logo.png';


export function Home() {
  // Estados do tema
  const [darkMode, setDarkMode] = useState(true);

  // Estados da calculadora
  const [isAnnual, setIsAnnual] = useState(true);
  const [initialAmount, setInitialAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(1);

  // Estados das fases da carreira
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [phasesWithConfig, setPhasesWithConfig] = useState([]);

  // Estados dos resultados
  const [results, setResults] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Controle do tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Função para calcular resultados
  const calculateResults = () => {
    try {
      console.log('Iniciando cálculo...');
      console.log('Fases configuradas:', phasesWithConfig);
      console.log('Fases selecionadas:', selectedPhases);
      console.log('Taxa de juros:', interestRate);
      
      if (phasesWithConfig.length > 0 && Number(interestRate) > 0) {
        // Filtra apenas fases selecionadas com dados válidos
        const validPhases = phasesWithConfig.filter(phase => {
          const isSelected = selectedPhases.includes(phase.id);
          const hasValidSalary = Number(phase.salary) > 0;
          const hasValidDuration = Number(phase.duration) > 0;
          
          console.log(`Fase ${phase.name}: selecionada=${isSelected}, salário=${phase.salary}, duração=${phase.duration}`);
          
          return isSelected && hasValidSalary && hasValidDuration;
        });
        
        console.log('Fases válidas:', validPhases);
        
        if (validPhases.length > 0) {
          // Adiciona valor inicial às fases
          const phasesWithInitial = validPhases.map((phase, index) => ({
            ...phase,
            initialAmount: index === 0 ? Number(initialAmount) || 0 : 0
          }));
          
          const result = calculateCareerInvestment(phasesWithInitial, Number(interestRate), isAnnual);
          console.log('Resultado do cálculo:', result);
          
          setResults(result);
          setEvolution(result.evolution || []);
          setPhasesWithConfig(phasesWithInitial); // Atualiza com apenas as fases selecionadas
          setShowResults(true);
        } else {
          console.warn('Nenhuma fase válida para calcular');
          alert('Selecione pelo menos uma fase com salário e duração válidos!');
        }
      } else {
        console.warn('Dados insuficientes para cálculo');
        alert('Preencha a taxa de juros e configure pelo menos uma fase!');
      }
    } catch (error) {
      console.error('Erro no cálculo:', error);
      alert('Erro no cálculo: ' + error.message);
      setShowResults(false);
    }
  };

  // Verifica se está pronto para calcular
  const isReadyToCalculate = Array.isArray(phasesWithConfig) && phasesWithConfig.length > 0 && Number(interestRate) > 0;

  // Reset results only when user changes parameters
  useEffect(() => {
    if (showResults) {
      setShowResults(false);
    }
  }, [isAnnual, initialAmount, interestRate]);

  // Função especial para receber as fases configuradas
  const setSelectedPhasesWithConfig = (phaseIds) => {
    setSelectedPhases(phaseIds);
  };

  // Adiciona método withConfig ao setter
  setSelectedPhasesWithConfig.withConfig = (phases) => {
    setPhasesWithConfig(phases || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="space-y-6 sm:space-y-8">
          {/* Tipo de Juros */}
          <InterestTypeSelector 
            isAnnual={isAnnual} 
            setIsAnnual={setIsAnnual} 
          />

          {/* Configurações Básicas */}
          <BasicInputs
            initialAmount={initialAmount}
            setInitialAmount={setInitialAmount}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            isAnnual={isAnnual}
          />

          {/* Fases da Carreira */}
          <CareerPhasesSelector
            selectedPhases={selectedPhases}
            setSelectedPhases={setSelectedPhasesWithConfig}
          />

          {/* Botão Calcular */}
          <CalculateButton 
            onCalculate={calculateResults}
            isReady={isReadyToCalculate}
          />

          {/* Resultados */}
          {showResults && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-1000">
              <ResultsDisplay results={results} phases={phasesWithConfig.filter(phase => selectedPhases.includes(phase.id))} />
              <EvolutionChart evolution={evolution} darkMode={darkMode} />
            </div>
          )}

          {/* Rodapé */}
          <footer className="text-center py-6 px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div className="mt-4 flex items-center justify-center gap-2">
              <p className="font-medium">
                Calculadora Dev | CD - Planeje seu futuro financeiro como desenvolvedor |
              </p>
              <a 
                href="https://calculadora-juros-dev.vercel.app/" 
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-70 transition-opacity"
              >
                <img src={logoImage} alt="Logo" className='w-8' />
              </a>
            </div>
            <p className="mt-1 opacity-75">
              Os valores são simulações e não constituem garantia de rentabilidade
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span>Desenvolvido por Gustavo Cardoso - ghustdev</span>
              <a 
                href="https://github.com/ghustdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}