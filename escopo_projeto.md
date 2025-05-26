# Escopo Detalhado do Projeto Otimizado - App de Divisão de Treino

## 1. Visão Geral

Este documento define o escopo detalhado para a implementação das otimizações no App de Divisão de Treino, transformando-o em uma ferramenta completa para prescrição e acompanhamento de treinos com recursos avançados de periodização, visualização e cálculo de volume muscular.

## 2. Funcionalidades a Implementar

### 2.1. Banco de Dados de Exercícios
- **Estrutura de dados**: Criar arquivo JSON com informações detalhadas sobre exercícios
- **Metadados por exercício**: Nome, categoria, equipamento, grupos musculares alvo e secundários, nível técnico, volume por série para cada grupo muscular, tags, instruções, links para vídeos e imagens
- **Interface de seleção**: Componente para selecionar exercícios filtrados por divisão de treino
- **Gerenciamento**: Permitir definir séries e repetições para cada exercício selecionado

### 2.2. Cálculo Automático de Volume
- **Cálculo por sessão**: Somar o volume de cada exercício para cada grupo muscular em uma sessão
- **Cálculo por semana**: Agregar o volume de todas as sessões da semana
- **Cálculo total do mesociclo**: Agregar o volume de todas as semanas
- **Visualização tabular**: Tabela mostrando volume por grupo muscular com indicadores de status (baixo, adequado, alto)
- **Visualização gráfica**: Gráfico de barras mostrando a distribuição do volume entre grupos musculares

### 2.3. Periodização e Progressão Automática
- **Parâmetros de progressão**: Definir parâmetros baseados no nível e objetivo
- **Geração automática**: Calcular volume e intensidade para cada semana do mesociclo
- **Suporte a deload**: Implementar lógica para semanas de deload e pico
- **Interface de edição**: Permitir ajustes manuais nos parâmetros gerados automaticamente
- **Integração com plano**: Incorporar dados de progressão na geração do plano de treino

### 2.4. Visualização Gráfica das Variáveis
- **Integração com Chart.js**: Adicionar biblioteca para criação de gráficos
- **Gráficos de volume**: Visualizar evolução do volume ao longo das semanas
- **Gráficos de intensidade**: Visualizar evolução da intensidade ao longo das semanas
- **Gráficos de tonelagem**: Visualizar evolução da tonelagem estimada
- **Interface com abas**: Permitir alternar entre diferentes visualizações

### 2.5. Melhorias Adicionais
- **Responsividade**: Otimizar interface para dispositivos móveis e desktop
- **Exportação/Importação**: Adicionar funcionalidades para compartilhar planos entre dispositivos
- **PWA**: Transformar o aplicativo em uma Progressive Web App para instalação
- **Compatibilidade com Vercel**: Garantir que o projeto seja 100% compatível com deploy na Vercel

## 3. Requisitos Técnicos

### 3.1. Tecnologias
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Bibliotecas**: Chart.js para visualização gráfica
- **Armazenamento**: LocalStorage para dados do usuário, JSON para banco de dados de exercícios
- **Compatibilidade**: Garantir funcionamento em navegadores modernos (Chrome, Firefox, Safari, Edge)

### 3.2. Arquitetura
- **Modularização**: Separar código em módulos lógicos (exercícios, periodização, gráficos, etc.)
- **Padrão de Projeto**: Utilizar classes e objetos para encapsular funcionalidades
- **Responsividade**: Design adaptável a diferentes tamanhos de tela
- **Offline First**: Garantir funcionamento mesmo sem conexão à internet

### 3.3. Compatibilidade com Vercel
- **Estrutura de Arquivos**: Organizar conforme recomendações da Vercel
- **Rotas**: Utilizar apenas rotas estáticas compatíveis com hospedagem Vercel
- **Builds**: Garantir que o processo de build seja compatível com a plataforma
- **Limites**: Respeitar limites de tamanho de arquivos e payload

## 4. Priorização e Dependências

### 4.1. Ordem de Implementação
1. **Banco de Dados de Exercícios** - Base para as demais funcionalidades
2. **Cálculo Automático de Volume** - Depende do banco de exercícios
3. **Implementação de Periodização** - Melhoria fundamental para o fluxo de trabalho
4. **Visualização Gráfica** - Complementa as funcionalidades anteriores
5. **Melhorias Adicionais** - Refinamentos após as funcionalidades principais

### 4.2. Dependências entre Componentes
- O cálculo de volume depende do banco de dados de exercícios
- A visualização gráfica do volume depende do cálculo de volume
- A periodização automática é independente das outras funcionalidades
- As melhorias de UI/UX dependem da implementação das funcionalidades principais

## 5. Entregáveis

### 5.1. Código-Fonte
- Arquivos HTML, CSS e JavaScript organizados em estrutura de diretórios
- Banco de dados de exercícios em formato JSON
- Bibliotecas externas (Chart.js)

### 5.2. Documentação
- Guia de uso das novas funcionalidades
- Documentação técnica para manutenção futura
- Instruções de deploy

### 5.3. Versão Funcional
- Aplicativo completo com todas as funcionalidades implementadas
- Testado em diferentes navegadores e dispositivos
- Pronto para deploy na Vercel

## 6. Critérios de Aceitação

- Todas as funcionalidades descritas devem estar implementadas e funcionais
- Interface responsiva em dispositivos móveis e desktop
- Código organizado, modular e bem documentado
- Compatibilidade com navegadores modernos
- Pronto para deploy na Vercel
- Funcionamento offline através de PWA

## 7. Limitações e Considerações

- O aplicativo utilizará apenas tecnologias frontend (HTML, CSS, JavaScript)
- Dados serão armazenados localmente no navegador do usuário
- Não haverá backend ou banco de dados remoto
- Imagens e vídeos de exercícios serão referenciados por URLs externas ou incluídos no projeto

## 8. Conclusão

Este escopo define as funcionalidades, requisitos técnicos e entregáveis para a implementação das otimizações no App de Divisão de Treino. O projeto será desenvolvido seguindo a ordem de priorização estabelecida, garantindo a entrega de um produto final completo, funcional e alinhado às necessidades do usuário.
