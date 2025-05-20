# Guia do Usuário - App de Divisão de Treino

## Índice

1. [Introdução](#introdução)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Como Usar](#como-usar)
   - [Criação de Planos](#criação-de-planos)
   - [Periodização Automática](#periodização-automática)
   - [Visualização Gráfica](#visualização-gráfica)
   - [Banco de Dados de Exercícios](#banco-de-dados-de-exercícios)
   - [Cálculo de Volume](#cálculo-de-volume)
   - [Salvar e Carregar Planos](#salvar-e-carregar-planos)
   - [Exportar e Importar Planos](#exportar-e-importar-planos)
4. [Instalação como PWA](#instalação-como-pwa)
5. [Deploy na Vercel](#deploy-na-vercel)
6. [Solução de Problemas](#solução-de-problemas)

## Introdução

O App de Divisão de Treino é uma ferramenta completa para prescrição e acompanhamento de treinos, desenvolvida especialmente para profissionais de consultoria em treinamento físico. O aplicativo permite criar planos de treino personalizados com periodização automática, visualização gráfica das variáveis de treinamento, cálculo de volume por grupo muscular e muito mais.

## Funcionalidades Principais

- **Periodização Automática**: Geração de progressão de volume e intensidade ao longo do mesociclo, com suporte a diferentes níveis e objetivos.
- **Visualização Gráfica**: Gráficos interativos para visualizar a evolução das variáveis de treinamento (volume, intensidade, RIR, tonelagem).
- **Banco de Dados de Exercícios**: Catálogo completo de exercícios com informações detalhadas sobre grupos musculares trabalhados.
- **Cálculo de Volume**: Cálculo automático do volume de treinamento por grupo muscular, por sessão, por semana e total do mesociclo.
- **Exportação e Importação**: Compartilhamento de planos entre dispositivos através de arquivos JSON.
- **PWA (Progressive Web App)**: Instalação como aplicativo em dispositivos móveis e desktop.

## Como Usar

### Criação de Planos

1. **Preencha os dados iniciais**:
   - Nome do Plano
   - Nível do praticante (Iniciante, Intermediário, Avançado)
   - Frequência semanal (2x, 3x, 4x, etc.)
   - Objetivo (Hipertrofia, Força)
   - Divisão de treino (Upper/Lower, Full Body, etc.)
   - Número de semanas do mesociclo

2. **Clique em "Gerar Plano"** para criar o plano de treino com a periodização automática.

### Periodização Automática

Após gerar o plano, você verá a tabela de progressão do mesociclo, que mostra:

- **Tipo de Semana**: Acumulação, Intensificação, Deload ou Pico
- **Volume**: Séries por grupo muscular
- **Intensidade**: Percentual de 1RM estimado
- **RIR**: Repetições em Reserva
- **Foco**: Objetivo principal da semana

A periodização é ajustada automaticamente com base no nível do praticante e no objetivo selecionado.

### Visualização Gráfica

O aplicativo oferece gráficos interativos para visualizar a evolução das variáveis de treinamento:

1. **Selecione a variável** clicando nas abas (Volume, Intensidade, Tonelagem, RIR)
2. **Visualize a progressão** ao longo das semanas do mesociclo
3. **Exporte o gráfico** clicando no botão "Exportar Gráfico"

As semanas de deload são destacadas em amarelo e as semanas de pico em vermelho para fácil identificação.

### Banco de Dados de Exercícios

Para adicionar exercícios ao plano:

1. **Selecione exercícios** na lista suspensa filtrada por divisão de treino
2. **Clique no botão "+"** para adicionar ao plano
3. **Defina séries e repetições** para cada exercício
4. **Remova exercícios** clicando no botão "×" se necessário

O banco de dados inclui informações detalhadas sobre cada exercício, incluindo grupos musculares trabalhados, nível técnico e instruções de execução.

### Cálculo de Volume

O aplicativo calcula automaticamente o volume de treinamento:

1. **Visualize o volume total** por grupo muscular para todo o mesociclo
2. **Alterne entre visualizações** (Total Mesociclo, Por Semana, Por Sessão)
3. **Verifique o status** de cada grupo muscular (Baixo, Adequado, Alto)

O status é determinado com base em recomendações científicas para volume de treinamento por grupo muscular.

### Salvar e Carregar Planos

Para salvar um plano localmente:

1. **Clique em "Salvar Plano"** após gerar o plano
2. O plano será salvo no armazenamento local do navegador

Para carregar um plano salvo:

1. **Selecione o plano** na lista de histórico
2. **Clique em "Carregar Plano"**

### Exportar e Importar Planos

Para compartilhar planos entre dispositivos:

1. **Clique em "Exportar Plano"** para baixar um arquivo JSON com todos os dados do plano
2. **Clique em "Importar Plano"** e selecione um arquivo JSON para carregar um plano exportado

## Instalação como PWA

O aplicativo pode ser instalado como um Progressive Web App em dispositivos móveis e desktop:

1. **Acesse o aplicativo** no navegador
2. **Clique no botão "Instalar App"** que aparece na parte inferior da tela
3. **Siga as instruções** para instalar o aplicativo

Após a instalação, o aplicativo pode ser acessado offline e terá um ícone na tela inicial do dispositivo.

## Deploy na Vercel

Para fazer o deploy do aplicativo na Vercel:

1. **Crie uma conta** na [Vercel](https://vercel.com) se ainda não tiver
2. **Instale a CLI da Vercel**: `npm i -g vercel`
3. **Faça login** na sua conta: `vercel login`
4. **Navegue até a pasta do projeto** no terminal
5. **Execute o comando de deploy**: `vercel`
6. **Siga as instruções** para configurar o projeto
7. **Acesse a URL** fornecida pela Vercel após o deploy

Para atualizações futuras, basta executar `vercel` novamente na pasta do projeto.

## Solução de Problemas

**Problema**: Os gráficos não aparecem após gerar o plano.
**Solução**: Verifique se o JavaScript está habilitado no navegador e se a biblioteca Chart.js foi carregada corretamente.

**Problema**: Não consigo salvar ou carregar planos.
**Solução**: O armazenamento local pode estar desabilitado ou cheio. Verifique as configurações do navegador ou exporte os planos existentes para liberar espaço.

**Problema**: O aplicativo não funciona offline.
**Solução**: Certifique-se de que o Service Worker foi registrado corretamente e que o aplicativo foi instalado como PWA.

**Problema**: Os exercícios não aparecem na lista.
**Solução**: Verifique se o arquivo de banco de dados de exercícios foi carregado corretamente e se a divisão de treino selecionada possui exercícios cadastrados.

Para problemas adicionais, entre em contato com o suporte técnico.
