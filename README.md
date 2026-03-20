# Calculadora Dev (CD)

Uma calculadora de juros compostos especializada para desenvolvedores planejarem seu futuro financeiro considerando as diferentes fases da carreira.

**Implementado com um agente de IA, Cloude Opus 4.5 by Amazon Q**. Com isso, realizei em 1 único dia um projeto que duraria cerca de 1/2 meses para ser finalizado!

<img width="1230" height="951" alt="cd" src="https://github.com/user-attachments/assets/a083cc01-04ea-4054-ad45-a0cb58ddeced" />


## 🌐 Acesse Online

O projeto está hospedado na Vercel e pode ser acessado em:
**[https://calculadora-juros-dev.vercel.app/](https://calculadorajurosdev.vercel.app/)**


**[Calculadora Dev | CD](https://calculadorajurosdev.vercel.app/)**

## 🚀 Funcionalidades

- **Cálculo de Juros Compostos**: Suporte para taxas mensais e anuais com conversão automática
- **5 Fases da Carreira**: Simulação para Estagiário, Júnior, Pleno, Sênior e Tech Lead
- **Interface Responsiva**: Design minimalista e profissional para todos os dispositivos
- **Tema Dark/Light**: Alternância suave entre temas
- **Gráfico Interativo**: Visualização completa da evolução do investimento
- **Resultados Detalhados**: Resumo geral + detalhes individuais por fase
- **Validação Inteligente**: Cálculos precisos com validação de entrada

## 🛠️ Tecnologias

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Gráficos**: Chart.js, React-Chartjs-2
- **Ícones**: Lucide React
- **Build**: Vite com HMR

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/ghustdev/calculadora-juros-compostos.git

# Entre na pasta
cd calculadora-juros-compostos

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

## 🎯 Como Usar

1. **Selecione o tipo de juros** (anual ou mensal)
2. **Configure os valores básicos**:
   - Valor inicial (opcional)
   - Taxa de juros
3. **Escolha as fases da carreira** clicando no botão "+"
4. **Configure cada fase**:
   - Salário mensal
   - Porcentagem para investir (5% a 100%)
   - Duração em meses
5. **Clique em "Calcular"** e visualize os resultados

## 📊 Fórmulas Utilizadas

### Juros Compostos
```
Montante = P * (1 + i)^n + A * [((1 + i)^n - 1) / i]
```

### Conversão Taxa Anual para Mensal
```
Taxa Mensal = (1 + Taxa Anual)^(1/12) - 1
```

Onde:
- P = valor inicial
- A = aporte mensal
- i = taxa de juros (mensal)
- n = número de períodos (meses)

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes Shadcn UI
│   ├── Calculator/      # Componentes da calculadora
│   ├── CareerPhases/    # Seleção de fases da carreira
│   ├── Results/         # Exibição de resultados
│   └── Chart/           # Gráfico de evolução
├── pages/
│   └── Home/            # Página principal
└── utils/
    └── calculations.js  # Lógica de cálculos
```

## 🎨 Design System

- **Cores Principais**: Navy (#1e3a8a), Light Blue (#3b82f6)
- **Tipografia**: Clean e moderna com hierarquia clara
- **Layout**: Responsivo com breakpoints otimizados
- **Componentes**: Consistentes e acessíveis

## 📱 Responsividade

- **Mobile**: < 640px (1 coluna, padding otimizado)
- **Tablet**: 640px+ (2 colunas, espaçamento médio)
- **Desktop**: 1024px+ (3-4 colunas, layout completo)
- **Large**: 1280px+ (até 5 colunas para fases)

### Para fazer seu próprio deploy:

#### Vercel (Recomendado)
```bash
npm run build
# Conecte seu repositório no Vercel
```

#### Netlify
```bash
npm run build
# Faça upload da pasta dist/
```

## 👨‍💻 Desenvolvedor

**Gustavo Cardoso** - [@ghustdev](https://github.com/ghustdev)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Aviso Legal

Os valores apresentados são simulações matemáticas e não constituem garantia de rentabilidade. Sempre consulte um profissional qualificado antes de tomar decisões de investimento.
