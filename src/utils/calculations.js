/**
 * Calcula juros compostos com aportes mensais
 * Fórmula: Montante = P * (1 + i)^n + A * [((1 + i)^n - 1) / i]
 * @param {number} initialAmount - Valor inicial (P)
 * @param {number} monthlyContribution - Aporte mensal (A)
 * @param {number} interestRate - Taxa de juros (i)
 * @param {number} periods - Número de períodos (n)
 * @param {boolean} isAnnual - Se a taxa é anual (true) ou mensal (false)
 * @returns {Object} Resultado dos cálculos
 */
export function calculateCompoundInterest(initialAmount, contribution, interestRate, periods, isAnnual = false) {
  // Validações de entrada
  initialAmount = Number(initialAmount) || 0;
  contribution = Number(contribution) || 0;
  interestRate = Number(interestRate) || 0;
  periods = Number(periods) || 1;
  
  if (initialAmount < 0) initialAmount = 0;
  if (contribution < 0) contribution = 0;
  if (interestRate < 0) interestRate = 0;
  if (periods <= 0) periods = 1;
  
  let monthlyRate, totalMonths, monthlyContribution;
  
  if (isAnnual) {
    // Taxa anual convertida para mensal: (1 + taxa_anual)^(1/12) - 1
    monthlyRate = Math.pow(1 + interestRate / 100, 1/12) - 1;
    totalMonths = periods; // períodos já em meses
    monthlyContribution = contribution; // contribuição já mensal
  } else {
    monthlyRate = interestRate / 100;
    totalMonths = periods;
    monthlyContribution = contribution;
  }
  
  // Calcula montante do valor inicial com juros compostos
  const initialGrowth = initialAmount * Math.pow(1 + monthlyRate, totalMonths);
  
  // Calcula montante dos aportes mensais (série de pagamentos)
  let contributionGrowth = 0;
  if (monthlyRate === 0) {
    contributionGrowth = monthlyContribution * totalMonths;
  } else {
    contributionGrowth = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  }
  
  const finalAmount = initialGrowth + contributionGrowth;
  const totalInvested = initialAmount + (monthlyContribution * totalMonths);
  const totalInterest = finalAmount - totalInvested;
  
  return {
    finalAmount: Math.round(finalAmount * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    monthlyRate: monthlyRate * 100,
    totalMonths,
    initialAmount
  };
}

/**
 * Calcula evolução mensal para gráfico
 * @param {number} initialAmount - Valor inicial
 * @param {number} monthlyContribution - Aporte mensal
 * @param {number} interestRate - Taxa de juros
 * @param {number} periods - Número de períodos
 * @param {boolean} isAnnual - Se a taxa é anual
 * @returns {Array} Array com evolução mensal
 */
export function calculateMonthlyEvolution(initialAmount, contribution, interestRate, periods, isAnnual = false) {
  // Validações de entrada
  initialAmount = Number(initialAmount) || 0;
  contribution = Number(contribution) || 0;
  interestRate = Number(interestRate) || 0;
  periods = Number(periods) || 1;
  
  if (initialAmount < 0) initialAmount = 0;
  if (contribution < 0) contribution = 0;
  if (interestRate < 0) interestRate = 0;
  if (periods <= 0) periods = 1;
  
  let monthlyRate, totalMonths, monthlyContribution;
  
  if (isAnnual) {
    // Taxa anual convertida para mensal: (1 + taxa_anual)^(1/12) - 1
    monthlyRate = Math.pow(1 + interestRate / 100, 1/12) - 1;
    totalMonths = periods; // períodos já em meses
    monthlyContribution = contribution; // contribuição já mensal
  } else {
    monthlyRate = interestRate / 100;
    totalMonths = periods;
    monthlyContribution = contribution;
  }
  
  const evolution = [];
  let currentAmount = initialAmount;
  let totalInvested = initialAmount;
  
  for (let month = 0; month <= totalMonths; month++) {
    if (month > 0) {
      currentAmount = currentAmount * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;
    }
    
    const interest = currentAmount - totalInvested;
    
    evolution.push({
      month,
      totalAmount: Math.round(currentAmount * 100) / 100,
      totalInvested: Math.round(totalInvested * 100) / 100,
      totalInterest: Math.round(interest * 100) / 100
    });
  }
  
  return evolution;
}

/**
 * Dados das fases da carreira de desenvolvedor
 */
export const careerPhases = [
  {
    id: 'estagiario',
    name: 'Estagiário',
    averageSalary: 1200,
    recommendedPercentage: 25,
    duration: 12, // meses
    description: 'Primeiro contato com desenvolvimento'
  },
  {
    id: 'junior',
    name: 'Júnior',
    averageSalary: 3500,
    recommendedPercentage: 30,
    duration: 24, // meses
    description: 'Início da carreira, foco em aprendizado'
  },
  {
    id: 'pleno',
    name: 'Pleno',
    averageSalary: 6500,
    recommendedPercentage: 35,
    duration: 36, // meses
    description: 'Experiência consolidada, maior responsabilidade'
  },
  {
    id: 'senior',
    name: 'Sênior',
    averageSalary: 12000,
    recommendedPercentage: 40,
    duration: 48, // meses
    description: 'Liderança técnica, mentoria de equipes'
  },
  {
    id: 'techlead',
    name: 'Tech Lead',
    averageSalary: 18000,
    recommendedPercentage: 45,
    duration: 60, // meses
    description: 'Liderança estratégica, arquitetura de soluções'
  }
];

/**
 * Calcula investimento por fases da carreira
 * @param {Array} phases - Fases selecionadas com configurações
 * @param {number} interestRate - Taxa de juros
 * @param {boolean} isAnnual - Se a taxa é anual
 * @returns {Object} Resultado consolidado
 */
export function calculateCareerInvestment(phases, interestRate, isAnnual = false) {
  // Validações de entrada
  if (!Array.isArray(phases) || phases.length === 0) {
    return {
      finalAmount: 0,
      totalInvested: 0,
      totalInterest: 0,
      evolution: [],
      totalMonths: 0,
      phaseDetails: []
    };
  }
  if (typeof interestRate !== 'number' || interestRate < 0) interestRate = 0;
  
  let currentAmount = 0;
  let totalInvestedSum = 0;
  let evolution = [];
  let currentMonth = 0;
  let phaseDetails = [];
  
  // Adiciona valor inicial apenas na primeira fase
  const firstPhase = phases[0];
  if (firstPhase) {
    currentAmount = Number(firstPhase?.initialAmount) || 0;
    totalInvestedSum = currentAmount;
  }
  
  for (let index = 0; index < phases.length; index++) {
    const phase = phases[index];
    
    // Validação mais robusta
    const salary = Number(phase?.salary) || 0;
    const percentage = Number(phase?.percentage) || 0;
    const duration = Number(phase?.duration) || 0;
    
    if (!phase || salary <= 0 || percentage <= 0 || duration <= 0) {
      continue; // Skip invalid phases
    }
    
    const monthlyContribution = (salary * percentage) / 100;
    
    const phaseResult = calculateCompoundInterest(
      currentAmount,
      monthlyContribution,
      interestRate,
      duration,
      isAnnual // Usa a configuração de taxa anual/mensal
    );
    
    const phaseEvolution = calculateMonthlyEvolution(
      currentAmount,
      monthlyContribution,
      interestRate,
      duration,
      isAnnual // Usa a configuração de taxa anual/mensal
    );
    
    // Calcula detalhes da fase
    const phaseInvested = (monthlyContribution * duration);
    const phaseInterest = phaseResult.finalAmount - currentAmount - phaseInvested;
    
    phaseDetails.push({
      name: phase.name,
      salary: salary,
      percentage: percentage,
      duration: duration,
      monthlyContribution: Math.round(monthlyContribution * 100) / 100,
      initialAmount: Math.round(currentAmount * 100) / 100,
      finalAmount: Math.round(phaseResult.finalAmount * 100) / 100,
      totalInvested: Math.round(phaseInvested * 100) / 100,
      totalInterest: Math.round(phaseInterest * 100) / 100
    });
    
    // Ajusta os meses da evolução
    const adjustedEvolution = phaseEvolution.map(item => ({
      ...item,
      month: currentMonth + item.month,
      phase: phase.name
    }));
    
    evolution = [...evolution, ...adjustedEvolution.slice(1)]; // Remove o primeiro item para evitar duplicação
    currentMonth += duration;
    currentAmount = phaseResult.finalAmount;
    totalInvestedSum += phaseInvested;
  }
  
  const totalInterest = currentAmount - totalInvestedSum;
  
  return {
    finalAmount: Math.round(currentAmount * 100) / 100,
    totalInvested: Math.round(totalInvestedSum * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    evolution,
    totalMonths: currentMonth,
    phaseDetails
  };
}