import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CareerPhaseCard } from './CareerPhaseCard';
import { careerPhases } from '@/utils/calculations';

export function CareerPhasesSelector({ selectedPhases, setSelectedPhases }) {
  const [phaseConfigs, setPhaseConfigs] = useState(() => {
    const configs = {};
    careerPhases.forEach(phase => {
      configs[phase.id] = {
        salary: phase.averageSalary,
        percentage: phase.recommendedPercentage,
        duration: phase.duration
      };
    });
    return configs;
  });

  const togglePhase = (phaseId) => {
    const newSelectedPhases = selectedPhases.includes(phaseId)
      ? selectedPhases.filter(id => id !== phaseId)
      : [...selectedPhases, phaseId];
    
    setSelectedPhases(newSelectedPhases);
  };

  const updatePhaseDuration = (phaseId, duration) => {
    updatePhaseConfig(phaseId, 'duration', duration);
  };

  const updatePhaseConfig = (phaseId, field, value) => {
    setPhaseConfigs(prev => ({
      ...prev,
      [phaseId]: {
        ...prev[phaseId],
        [field]: value
      }
    }));
  };

  // Atualiza as fases selecionadas com as configurações
  const getSelectedPhasesWithConfig = React.useCallback(() => {
    try {
      return selectedPhases.map(phaseId => {
        const phase = careerPhases.find(p => p?.id === phaseId);
        const config = phaseConfigs[phaseId];
        if (!phase || !config) return null;
        return {
          ...phase,
          ...config
        };
      }).filter(Boolean);
    } catch (error) {
      console.warn('Error getting phases with config:', error);
      return [];
    }
  }, [selectedPhases, phaseConfigs]);

  // Expõe as fases configuradas para o componente pai
  useEffect(() => {
    try {
      if (typeof setSelectedPhases === 'function' && setSelectedPhases.withConfig) {
        setSelectedPhases.withConfig(getSelectedPhasesWithConfig());
      }
    } catch (error) {
      console.warn('Error updating phases config:', error);
    }
  }, [getSelectedPhasesWithConfig, setSelectedPhases]);

  return (
    <Card className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl">
      <CardHeader>
        <CardTitle className="text-navy dark:text-light-blue">Fases da Carreira</CardTitle>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Configure salário, % de investimento e tempo em cada fase
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-4">
          {careerPhases.map(phase => (
            <CareerPhaseCard
              key={phase.id}
              phase={phase}
              isSelected={selectedPhases.includes(phase.id)}
              onToggle={() => togglePhase(phase.id)}
              salary={phaseConfigs[phase.id].salary}
              setSalary={(value) => updatePhaseConfig(phase.id, 'salary', value)}
              percentage={phaseConfigs[phase.id].percentage}
              setPercentage={(value) => updatePhaseConfig(phase.id, 'percentage', value)}
              duration={phaseConfigs[phase.id].duration}
              setDuration={(value) => updatePhaseDuration(phase.id, value)}
            />
          ))}
        </div>
        
        {selectedPhases.length === 0 && (
          <div className="text-center py-8 px-6 mt-6 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600">
            <p className="font-medium text-base">Selecione pelo menos uma fase da carreira</p>
            <p className="text-sm mt-2 opacity-80">Clique nos botões para ativar/desativar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}