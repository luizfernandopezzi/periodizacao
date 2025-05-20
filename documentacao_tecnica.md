# Documentação Técnica - App de Divisão de Treino

## Estrutura do Projeto

```
projeto_otimizado/
├── css/
│   └── style.css           # Estilos do aplicativo
├── data/
│   ├── dados.json          # Dados de divisões de treino
│   └── exercicios.json     # Banco de dados de exercícios
├── img/
│   └── exercicios/         # Imagens de exercícios (a serem adicionadas)
├── js/
│   ├── exercicios.js       # Gerenciamento do banco de exercícios e cálculo de volume
│   ├── graficos.js         # Visualização gráfica das variáveis
│   ├── main.js             # Script principal e inicialização
│   ├── periodizacao.js     # Lógica de periodização e progressão automática
│   ├── plano.js            # Geração e manipulação de planos
│   └── utils.js            # Utilitários (exportação, importação, PWA)
├── escopo_projeto.md       # Definição detalhada do escopo
├── guia_usuario.md         # Guia do usuário
├── index.html              # Página principal
├── manifest.json           # Configuração do PWA
└── sw.js                   # Service Worker para funcionamento offline
```

## Componentes Principais

### 1. Banco de Dados de Exercícios

Implementado em `exercicios.js` e `data/exercicios.json`.

- **Estrutura de dados**: JSON com informações detalhadas sobre exercícios
- **Metadados por exercício**: Nome, categoria, equipamento, grupos musculares, volume por série, etc.
- **Classe `BancoExercicios`**: Gerencia o carregamento, filtragem e seleção de exercícios

### 2. Cálculo Automático de Volume

Implementado em `exercicios.js`.

- **Método `calcularVolumeGrupoMuscular`**: Calcula volume por grupo muscular para exercícios selecionados
- **Método `calcularVolumeTotal`**: Agrega volume por sessão, semana e mesociclo
- **Método `atualizarTabelaVolume`**: Atualiza a interface com os dados calculados
- **Parâmetros de volume recomendado**: Definidos por grupo muscular com valores mínimos e máximos

### 3. Periodização e Progressão Automática

Implementado em `periodizacao.js`.

- **Classe `Periodizacao`**: Gerencia a geração de progressão automática
- **Parâmetros por nível e objetivo**: Configurações específicas para diferentes perfis
- **Método `gerarProgressaoAutomatica`**: Calcula volume, intensidade e RIR para cada semana
- **Suporte a deload e pico**: Lógica para semanas especiais de recuperação e intensidade máxima

### 4. Visualização Gráfica

Implementado em `graficos.js`.

- **Classe `GraficosTreino`**: Gerencia a criação e atualização de gráficos
- **Integração com Chart.js**: Biblioteca para renderização de gráficos
- **Métodos para diferentes visualizações**: Volume, intensidade, tonelagem, RIR
- **Exportação de gráficos**: Funcionalidade para salvar gráficos como imagens

### 5. Interface do Usuário

Implementado em `index.html` e `css/style.css`.

- **Design responsivo**: Adaptação para diferentes tamanhos de tela
- **Tema escuro**: Interface moderna com cores contrastantes
- **Componentes interativos**: Tabs, botões, seletores, notificações
- **Animações e transições**: Feedback visual para ações do usuário

### 6. Exportação e Importação

Implementado em `utils.js`.

- **Classe `GerenciadorPlanos`**: Gerencia exportação e importação de planos
- **Formato JSON**: Estrutura de dados para compartilhamento entre dispositivos
- **Notificações**: Feedback visual para operações bem-sucedidas ou erros

### 7. PWA (Progressive Web App)

Implementado em `manifest.json`, `sw.js` e `utils.js`.

- **Service Worker**: Caching de recursos para funcionamento offline
- **Manifest**: Configuração para instalação como aplicativo
- **Classe `PWAManager`**: Gerencia a instalação do PWA

## Fluxo de Dados

1. **Geração de Plano**:
   - Usuário seleciona parâmetros (nível, frequência, objetivo, etc.)
   - Sistema gera progressão automática baseada nos parâmetros
   - Sistema cria tabela de treino com divisões selecionadas
   - Sistema atualiza gráficos e tabelas de progressão

2. **Seleção de Exercícios**:
   - Sistema filtra exercícios por divisão de treino
   - Usuário seleciona exercícios do banco de dados
   - Usuário define séries e repetições para cada exercício
   - Sistema calcula volume por grupo muscular

3. **Visualização de Volume**:
   - Sistema agrega volume por sessão, semana e mesociclo
   - Sistema compara com valores recomendados
   - Sistema atualiza gráficos e tabelas de volume

4. **Exportação/Importação**:
   - Sistema serializa dados do plano em formato JSON
   - Usuário baixa arquivo ou seleciona arquivo para importar
   - Sistema carrega dados e atualiza interface

## Requisitos Técnicos

- **Navegadores suportados**: Chrome 70+, Firefox 63+, Safari 12+, Edge 79+
- **Dispositivos**: Desktop e dispositivos móveis (responsivo)
- **Dependências externas**: Chart.js para visualização gráfica
- **Armazenamento**: LocalStorage para dados do usuário, JSON para banco de dados

## Compatibilidade com Vercel

O projeto foi desenvolvido seguindo as melhores práticas para deploy na Vercel:

- **Estrutura estática**: Apenas arquivos estáticos (HTML, CSS, JS, JSON)
- **Sem backend**: Toda lógica implementada no frontend
- **Paths relativos**: Referências a arquivos usando paths relativos
- **Service Worker**: Configurado para funcionar com o domínio da Vercel

## Extensibilidade

O projeto foi desenvolvido com modularidade e extensibilidade em mente:

- **Adição de exercícios**: Basta adicionar novos itens ao arquivo `exercicios.json`
- **Novos parâmetros de periodização**: Podem ser adicionados à classe `Periodizacao`
- **Novas visualizações gráficas**: Podem ser implementadas estendendo a classe `GraficosTreino`
- **Novos tipos de divisão**: Podem ser adicionados ao arquivo `dados.json`

## Limitações Conhecidas

- **Armazenamento local**: Limitado pelo tamanho do LocalStorage do navegador
- **Sem sincronização em nuvem**: Dados são armazenados apenas localmente
- **Sem autenticação**: Não há sistema de login ou perfis de usuário
- **Imagens de exercícios**: Precisam ser adicionadas manualmente à pasta `img/exercicios/`

## Melhorias Futuras

- **Sincronização em nuvem**: Implementar backend para armazenamento remoto
- **Sistema de autenticação**: Adicionar login e perfis de usuário
- **Editor de exercícios**: Interface para adicionar/editar exercícios
- **Acompanhamento de progresso**: Registro de cargas e repetições ao longo do tempo
- **Exportação para PDF**: Gerar planos em formato PDF para impressão
