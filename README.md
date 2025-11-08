# Calculadora Dev (CD)

Uma calculadora de juros compostos especializada para desenvolvedores planejarem seu futuro financeiro considerando as diferentes fases da carreira.

## 🚀 Funcionalidades

- **Cálculo de Juros Compostos**: Suporte para taxas mensais e anuais
- **Fases da Carreira**: Simulação específica para Júnior, Pleno, Sênior e Tech Lead
- **Interface Responsiva**: Design minimalista com efeitos glassmorphism
- **Tema Dark/Light**: Alternância entre temas
- **Gráfico Interativo**: Visualização da evolução do investimento
- **Validação em Tempo Real**: Cálculos automáticos conforme alterações

## 🛠️ Tecnologias

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Gráficos**: Chart.js, React-Chartjs-2
- **Ícones**: Lucide React

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta
cd calculadora-juros-compostos

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

## 🎯 Como Usar

1. **Selecione o tipo de juros** (mensal ou anual)
2. **Configure os valores básicos**:
   - Valor inicial
   - Salário mensal
   - Porcentagem para investir (5% a 100%)
   - Taxa de juros
3. **Escolha as fases da carreira** que deseja simular
4. **Visualize os resultados** em tempo real

## 📊 Fórmula Utilizada

```
Montante = P * (1 + i)^n + A * [((1 + i)^n - 1) / i]
```

Onde:
- P = aporte inicial
- A = aporte mensal
- i = taxa de juros mensal
- n = número de períodos

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
├── styles/
│   └── globals.css      # Estilos globais
└── utils/
    └── calculations.js  # Lógica de cálculos
```

## 🎨 Design System

- **Cores Principais**: Azul marinho (#1e3a8a), Azul claro (#3b82f6)
- **Efeitos**: Glassmorphism, blur, sombras suaves
- **Tipografia**: Clean e moderna
- **Layout**: Responsivo com grid system

## 📈 Melhorias Futuras

- [ ] Exportação para PDF
- [ ] Histórico de simulações
- [ ] Comparação de cenários
- [ ] Integração com APIs de investimentos
- [ ] Calculadora de aposentadoria
- [ ] Simulação de inflação

## 🚀 Deploy

### Vercel
```bash
npm run build
# Conecte seu repositório no Vercel
```

### Netlify
```bash
npm run build
# Faça upload da pasta dist/
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Actions para deploy automático
```

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes.