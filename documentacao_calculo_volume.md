# Documentação Técnica e Científica: Cálculo de Volume e Periodização

## Índice

1. [Introdução](#introdução)
2. [Cálculo de Volume por Grupo Muscular](#cálculo-de-volume-por-grupo-muscular)
   - [Fórmulas e Parâmetros](#fórmulas-e-parâmetros)
   - [Valores Teóricos vs. Práticos](#valores-teóricos-vs-práticos)
3. [Modelos de Periodização](#modelos-de-periodização)
   - [Periodização Linear](#periodização-linear)
   - [Periodização Ondulatória Diária](#periodização-ondulatória-diária)
   - [Periodização por Blocos Conjugados](#periodização-por-blocos-conjugados)
4. [Referências Bibliográficas](#referências-bibliográficas)

## Introdução

Este documento detalha as fórmulas, parâmetros e bases científicas utilizados no App de Divisão de Treino para cálculos de volume muscular e implementação dos diferentes modelos de periodização.

## Cálculo de Volume por Grupo Muscular

### Fórmulas e Parâmetros

O cálculo de volume por grupo muscular no aplicativo utiliza um sistema de ponderação que considera a contribuição específica de cada exercício para diferentes grupos musculares. Este sistema é baseado em pesquisas de eletromiografia (EMG) e análise biomecânica.

#### 1. Volume Efetivo por Exercício

Para cada exercício, o volume efetivo para um grupo muscular específico é calculado como:

```
V_efetivo = S × C_grupo
```

Onde:
- `V_efetivo` = Volume efetivo para o grupo muscular
- `S` = Número de séries do exercício
- `C_grupo` = Coeficiente de contribuição para o grupo muscular (0.0 - 1.0)

Os coeficientes de contribuição são derivados de estudos de EMG e análises biomecânicas (Schoenfeld et al., 2018; Vigotsky et al., 2017) e representam a ativação relativa de cada grupo muscular durante o exercício.

#### 2. Volume Total por Grupo Muscular

O volume total para cada grupo muscular é a soma dos volumes efetivos de todos os exercícios:

```
V_total_grupo = ∑(V_efetivo_exercício_i)
```

Onde:
- `V_total_grupo` = Volume total para o grupo muscular
- `V_efetivo_exercício_i` = Volume efetivo do exercício i para o grupo muscular

#### 3. Volume por Semana

O volume semanal para cada grupo muscular é calculado somando os volumes de todas as sessões de treino na semana:

```
V_semana_grupo = ∑(V_sessão_grupo_j)
```

Onde:
- `V_semana_grupo` = Volume semanal para o grupo muscular
- `V_sessão_grupo_j` = Volume da sessão j para o grupo muscular

### Valores Teóricos vs. Práticos

O aplicativo trabalha com dois tipos de valores de volume:

#### 1. Valores Teóricos (Decimais)

Os valores teóricos são calculados pelo algoritmo de periodização e representam o volume médio ideal por grupo muscular, baseado em pesquisas científicas. Estes valores podem ser decimais para representar com precisão as recomendações da literatura.

Para a periodização por blocos conjugados, o volume teórico é calculado como:

```
V_teórico = (V_principal + V_secundário) / 2 × F_ajuste
```

Onde:
- `V_principal` = Volume do componente principal do bloco
- `V_secundário` = Volume do componente secundário do bloco
- `F_ajuste` = Fator de ajuste baseado na progressão dentro do bloco (1 - progressãoNoBloco × 0.1)

Referência: Issurin, V. B. (2008). "Block periodization versus traditional training theory: a review." Journal of Sports Medicine and Physical Fitness, 48(1), 65-75.

#### 2. Valores Práticos (Inteiros)

Os valores práticos são os números inteiros de séries efetivamente programados no plano de treino. Estes valores são arredondados para facilitar a implementação prática do treinamento.

## Modelos de Periodização

### Periodização Linear

#### Fórmulas para Progressão

A progressão de volume e intensidade na periodização linear segue as seguintes fórmulas:

```
V_semana_n = V_inicial + (n-1) × Δ_volume
I_semana_n = I_inicial + (n-1) × Δ_intensidade
```

Onde:
- `V_semana_n` = Volume na semana n
- `V_inicial` = Volume inicial
- `Δ_volume` = Incremento semanal de volume
- `I_semana_n` = Intensidade na semana n
- `I_inicial` = Intensidade inicial
- `Δ_intensidade` = Incremento semanal de intensidade

Para semanas de deload:
```
V_deload = V_semana_anterior × 0.6
I_deload = I_semana_anterior × 0.9
```

Referência: Rhea, M. R., et al. (2003). "A meta-analysis to determine the dose response for strength development." Medicine and Science in Sports and Exercise, 35(3), 456-464.

### Periodização Ondulatória Diária

#### Fórmulas para Ciclos de Variação

Na periodização ondulatória diária, os ciclos de variação são calculados como:

```
V_ciclo_i = V_base_ciclo_i × (1 + progressão_semana × 0.05)
I_ciclo_i = I_base_ciclo_i × (1 + progressão_semana × 0.05)
```

Onde:
- `V_ciclo_i` = Volume do ciclo i
- `V_base_ciclo_i` = Volume base do ciclo i
- `I_ciclo_i` = Intensidade do ciclo i
- `I_base_ciclo_i` = Intensidade base do ciclo i
- `progressão_semana` = Fator de progressão da semana (0, 1, 2, 3)

Referência: Zourdos, M. C., et al. (2016). "Modified Daily Undulating Periodization Model Produces Greater Performance Than a Traditional Configuration in Powerlifters." Journal of Strength and Conditioning Research, 30(3), 784-791.

### Periodização por Blocos Conjugados

#### Fórmulas para Blocos

Na periodização por blocos conjugados, os parâmetros de cada bloco são calculados como:

```
V_semana_bloco = V_bloco × (1 - progressão_no_bloco × 0.1)
I_semana_bloco = I_bloco × (1 + progressão_no_bloco × 0.05)
```

Onde:
- `V_semana_bloco` = Volume da semana no bloco
- `V_bloco` = Volume base do bloco
- `I_semana_bloco` = Intensidade da semana no bloco
- `I_bloco` = Intensidade base do bloco
- `progressão_no_bloco` = Progressão dentro do bloco (0 a 1)

Para o volume médio da semana:
```
V_médio_semana = (V_principal + V_secundário) / 2
```

Onde:
- `V_médio_semana` = Volume médio da semana
- `V_principal` = Volume do componente principal
- `V_secundário` = Volume do componente secundário

Referência: Issurin, V. B. (2010). "New horizons for the methodology and physiology of training periodization." Sports Medicine, 40(3), 189-206.

## Referências Bibliográficas

1. Issurin, V. B. (2008). "Block periodization versus traditional training theory: a review." Journal of Sports Medicine and Physical Fitness, 48(1), 65-75.
2. Issurin, V. B. (2010). "New horizons for the methodology and physiology of training periodization." Sports Medicine, 40(3), 189-206.
3. Rhea, M. R., et al. (2003). "A meta-analysis to determine the dose response for strength development." Medicine and Science in Sports and Exercise, 35(3), 456-464.
4. Schoenfeld, B. J., et al. (2018). "Resistance Training Volume Enhances Muscle Hypertrophy but Not Strength in Trained Men." Medicine and Science in Sports and Exercise, 51(1), 94-103.
5. Vigotsky, A. D., et al. (2017). "Greater electromyographic responses do not imply greater motor unit recruitment and 'hypertrophic potential' cannot be inferred." Journal of Strength and Conditioning Research, 31(1), e1-e4.
6. Zourdos, M. C., et al. (2016). "Modified Daily Undulating Periodization Model Produces Greater Performance Than a Traditional Configuration in Powerlifters." Journal of Strength and Conditioning Research, 30(3), 784-791.
