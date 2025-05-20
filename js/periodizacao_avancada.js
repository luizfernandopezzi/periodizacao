/**
 * Classe para gerenciar modelos avançados de periodização
 * Implementa periodização ondulatória diária e blocos conjugados
 */
class PeriodizacaoAvancada {
  constructor() {
    // Parâmetros para periodização ondulatória diária
    this.parametrosOndulatoriaDiaria = {
      iniciante: {
        hipertrofia: {
          ciclos: [
            { volume: 10, intensidade: 70, repeticoes: "12-15", rir: 3, foco: "Volume/Metabólico" },
            { volume: 8, intensidade: 75, repeticoes: "8-12", rir: 2, foco: "Misto" },
            { volume: 6, intensidade: 80, repeticoes: "6-8", rir: 1, foco: "Força/Tensão" }
          ],
          deloadReducaoVolume: 0.6,
          deloadReducaoIntensidade: 0.9
        },
        forca: {
          ciclos: [
            { volume: 8, intensidade: 75, repeticoes: "8-10", rir: 2, foco: "Volume/Técnica" },
            { volume: 6, intensidade: 80, repeticoes: "5-7", rir: 1, foco: "Força" },
            { volume: 4, intensidade: 85, repeticoes: "3-5", rir: 1, foco: "Força/Potência" }
          ],
          deloadReducaoVolume: 0.5,
          deloadReducaoIntensidade: 0.85
        }
      },
      intermediario: {
        hipertrofia: {
          ciclos: [
            { volume: 12, intensidade: 70, repeticoes: "12-15", rir: 2, foco: "Volume/Metabólico" },
            { volume: 9, intensidade: 77.5, repeticoes: "8-10", rir: 1, foco: "Misto" },
            { volume: 6, intensidade: 82.5, repeticoes: "6-8", rir: 0, foco: "Força/Tensão" }
          ],
          deloadReducaoVolume: 0.6,
          deloadReducaoIntensidade: 0.9
        },
        forca: {
          ciclos: [
            { volume: 9, intensidade: 77.5, repeticoes: "6-8", rir: 2, foco: "Volume/Técnica" },
            { volume: 6, intensidade: 85, repeticoes: "4-6", rir: 1, foco: "Força" },
            { volume: 3, intensidade: 90, repeticoes: "2-4", rir: 0, foco: "Força/Potência" }
          ],
          deloadReducaoVolume: 0.5,
          deloadReducaoIntensidade: 0.85
        }
      },
      avancado: {
        hipertrofia: {
          ciclos: [
            { volume: 14, intensidade: 72.5, repeticoes: "12-15", rir: 1, foco: "Volume/Metabólico" },
            { volume: 10, intensidade: 80, repeticoes: "8-10", rir: 1, foco: "Misto" },
            { volume: 6, intensidade: 85, repeticoes: "5-7", rir: 0, foco: "Força/Tensão" },
            { volume: 4, intensidade: 90, repeticoes: "3-5", rir: 0, foco: "Força Máxima" }
          ],
          deloadReducaoVolume: 0.6,
          deloadReducaoIntensidade: 0.9
        },
        forca: {
          ciclos: [
            { volume: 10, intensidade: 80, repeticoes: "6-8", rir: 1, foco: "Volume/Técnica" },
            { volume: 6, intensidade: 87.5, repeticoes: "3-5", rir: 1, foco: "Força" },
            { volume: 4, intensidade: 92.5, repeticoes: "1-3", rir: 0, foco: "Força Máxima" },
            { volume: 3, intensidade: 95, repeticoes: "1-2", rir: 0, foco: "Potência/Velocidade" }
          ],
          deloadReducaoVolume: 0.5,
          deloadReducaoIntensidade: 0.85
        }
      }
    };
    
    // Parâmetros para periodização por blocos conjugados
    this.parametrosBlocosConjugados = {
      iniciante: {
        hipertrofia: {
          blocos: [
            {
              nome: "Acumulação",
              semanas: 3,
              principal: { volume: 12, intensidade: 70, rir: 3, foco: "Volume/Metabólico" },
              secundario: { volume: 6, intensidade: 75, rir: 2, foco: "Força/Técnica" }
            },
            {
              nome: "Transmutação",
              semanas: 2,
              principal: { volume: 9, intensidade: 77.5, rir: 2, foco: "Misto" },
              secundario: { volume: 4, intensidade: 80, rir: 1, foco: "Força" }
            },
            {
              nome: "Realização",
              semanas: 1,
              principal: { volume: 6, intensidade: 82.5, rir: 1, foco: "Força/Tensão" },
              secundario: { volume: 3, intensidade: 70, rir: 3, foco: "Recuperação" }
            }
          ],
          deloadSemana: 7,
          deloadReducaoVolume: 0.6,
          deloadReducaoIntensidade: 0.9
        },
        forca: {
          blocos: [
            {
              nome: "Acumulação",
              semanas: 3,
              principal: { volume: 10, intensidade: 75, rir: 2, foco: "Volume/Técnica" },
              secundario: { volume: 5, intensidade: 80, rir: 1, foco: "Força" }
            },
            {
              nome: "Transmutação",
              semanas: 2,
              principal: { volume: 7, intensidade: 82.5, rir: 1, foco: "Força" },
              secundario: { volume: 3, intensidade: 87.5, rir: 1, foco: "Força Máxima" }
            },
            {
              nome: "Realização",
              semanas: 1,
              principal: { volume: 5, intensidade: 87.5, rir: 0, foco: "Força Máxima" },
              secundario: { volume: 2, intensidade: 75, rir: 2, foco: "Recuperação" }
            }
          ],
          deloadSemana: 7,
          deloadReducaoVolume: 0.5,
          deloadReducaoIntensidade: 0.85
        }
      },
      intermediario: {
        hipertrofia: {
          blocos: [
            {
              nome: "Acumulação",
              semanas: 3,
              principal: { volume: 14, intensidade: 72.5, rir: 2, foco: "Volume/Metabólico" },
              secundario: { volume: 7, intensidade: 77.5, rir: 1, foco: "Força/Técnica" }
            },
            {
              nome: "Transmutação",
              semanas: 2,
              principal: { volume: 10, intensidade: 80, rir: 1, foco: "Misto" },
              secundario: { volume: 5, intensidade: 85, rir: 0, foco: "Força" }
            },
            {
              nome: "Realização",
              semanas: 1,
              principal: { volume: 7, intensidade: 85, rir: 0, foco: "Força/Tensão" },
              secundario: { volume: 3, intensidade: 72.5, rir: 2, foco: "Recuperação" }
            }
          ],
          deloadSemana: 7,
          deloadReducaoVolume: 0.6,
          deloadReducaoIntensidade: 0.9
        },
        forca: {
          blocos: [
            {
              nome: "Acumulação",
              semanas: 3,
              principal: { volume: 12, intensidade: 77.5, rir: 2, foco: "Volume/Técnica" },
              secundario: { volume: 6, intensidade: 85, rir: 1, foco: "Força" }
            },
            {
              nome: "Transmutação",
              semanas: 2,
              principal: { volume: 8, intensidade: 85, rir: 1, foco: "Força" },
              secundario: { volume: 4, intensidade: 90, rir: 0, foco: "Força Máxima" }
            },
            {
              nome: "Realização",
              semanas: 1,
              principal: { volume: 5, intensidade: 92.5, rir: 0, foco: "Força Máxima" },
              secundario: { volume: 2, intensidade: 77.5, rir: 2, foco: "Recuperação" }
            }
          ],
          deloadSemana: 7,
          deloadReducaoVolume: 0.5,
          deloadReducaoIntensidade: 0.85
        }
      },
      avancado: {
        hipertrofia: {
          blocos: [
            {
              nome: "Acumulação",
              semanas: 2,
              principal: { volume: 16, intensidade: 75, rir: 1, foco: "Volume/Metabólico" },
              secundario: { volume: 8, intensidade: 80, rir: 1, foco: "Força/Técnica" }
            },
            {
              nome: "Transmutação",
              semanas: 2,
              principal: { volume: 12, intensidade: 82.5, rir: 1, foco: "Misto" },
              secundario: { volume: 6, intensidade: 87.5, rir: 0, foco: "Força" }
            },
            {
              nome: "Realização",
              semanas: 1,
              principal: { volume: 8, intensidade: 87.5, rir: 0, foco: "Força/Tensão" },
              secundario: { volume: 4, intensidade: 75, rir: 1, foco: "Recuperação" }
            }
          ],
          deloadSemana: 6,
          deloadReducaoVolume: 0.6,
          deloadReducaoIntensidade: 0.9
        },
        forca: {
          blocos: [
            {
              nome: "Acumulação",
              semanas: 2,
              principal: { volume: 14, intensidade: 80, rir: 1, foco: "Volume/Técnica" },
              secundario: { volume: 7, intensidade: 87.5, rir: 1, foco: "Força" }
            },
            {
              nome: "Transmutação",
              semanas: 2,
              principal: { volume: 10, intensidade: 87.5, rir: 0, foco: "Força" },
              secundario: { volume: 5, intensidade: 92.5, rir: 0, foco: "Força Máxima" }
            },
            {
              nome: "Realização",
              semanas: 1,
              principal: { volume: 6, intensidade: 95, rir: 0, foco: "Força Máxima" },
              secundario: { volume: 3, intensidade: 80, rir: 1, foco: "Recuperação" }
            }
          ],
          deloadSemana: 6,
          deloadReducaoVolume: 0.5,
          deloadReducaoIntensidade: 0.85
        }
      }
    };
  }

  /**
   * Gera a progressão para periodização ondulatória diária
   * @param {string} nivel - Nível do praticante (iniciante, intermediario, avancado)
   * @param {string} objetivo - Objetivo do treino (hipertrofia, forca)
   * @param {number} semanas - Número de semanas do mesociclo
   * @returns {Array} - Array com dados de progressão para cada semana
   */
  gerarProgressaoOndulatoriaDiaria(nivel, objetivo, semanas) {
    // Verificar se os parâmetros existem
    if (!this.parametrosOndulatoriaDiaria[nivel] || !this.parametrosOndulatoriaDiaria[nivel][objetivo]) {
      console.error('Parâmetros não encontrados para', nivel, objetivo);
      return [];
    }
    
    // Obter configuração para o nível e objetivo
    const config = this.parametrosOndulatoriaDiaria[nivel][objetivo];
    const ciclos = config.ciclos;
    
    // Gerar progressão semanal
    const progressao = [];
    
    for (let semana = 1; semana <= semanas; semana++) {
      // Verificar se é semana de deload
      const isDeload = semana % 4 === 0;
      const isPico = semana === semanas && !isDeload;
      
      // Criar objeto base para a semana
      const semanaDados = {
        semana,
        isDeload,
        isPico,
        tipoSemana: isDeload ? 'Deload' : isPico ? 'Pico' : 'Ondulatória Diária',
        foco: isDeload ? 'Recuperação' : isPico ? 'Intensidade Máxima' : 'Variação Diária',
        descricao: this.gerarDescricaoSemanaOndulatoria(nivel, objetivo, isDeload, isPico),
        diasVariacao: []
      };
      
      // Calcular volume e intensidade médios para a semana
      if (isDeload) {
        // Semana de deload
        const volumeBase = ciclos.reduce((sum, c) => sum + c.volume, 0) / ciclos.length;
        const intensidadeBase = ciclos.reduce((sum, c) => sum + c.intensidade, 0) / ciclos.length;
        
        semanaDados.volume = parseFloat((volumeBase * config.deloadReducaoVolume).toFixed(1));
        semanaDados.intensidade = parseFloat((intensidadeBase * config.deloadReducaoIntensidade).toFixed(1));
        semanaDados.rir = ciclos[0].rir + 1;
        
        // Dias de deload são todos iguais
        for (let i = 0; i < 7; i++) {
          semanaDados.diasVariacao.push({
            dia: i + 1,
            volume: semanaDados.volume,
            intensidade: semanaDados.intensidade,
            repeticoes: "10-12",
            rir: semanaDados.rir,
            foco: "Recuperação"
          });
        }
      } else if (isPico) {
        // Semana de pico - usar o ciclo de maior intensidade
        const cicloPico = [...ciclos].sort((a, b) => b.intensidade - a.intensidade)[0];
        
        semanaDados.volume = parseFloat((cicloPico.volume * 0.8).toFixed(1)); // Redução de 20% no volume para pico
        semanaDados.intensidade = parseFloat((cicloPico.intensidade * 1.05).toFixed(1)); // Aumento de 5% na intensidade
        semanaDados.rir = Math.max(0, cicloPico.rir - 1);
        
        // Dias de pico alternam entre alta intensidade e recuperação
        for (let i = 0; i < 7; i++) {
          if (i % 2 === 0) { // Dias de alta intensidade
            semanaDados.diasVariacao.push({
              dia: i + 1,
              volume: semanaDados.volume,
              intensidade: semanaDados.intensidade,
              repeticoes: cicloPico.repeticoes,
              rir: semanaDados.rir,
              foco: "Intensidade Máxima"
            });
          } else { // Dias de recuperação ativa
            semanaDados.diasVariacao.push({
              dia: i + 1,
              volume: parseFloat((semanaDados.volume * 0.7).toFixed(1)),
              intensidade: parseFloat((semanaDados.intensidade * 0.9).toFixed(1)),
              repeticoes: "10-12",
              rir: semanaDados.rir + 2,
              foco: "Recuperação Ativa"
            });
          }
        }
      } else {
        // Semana normal com ondulação diária
        // Calcular médias para a semana
        const volumeBase = ciclos.reduce((sum, c) => sum + c.volume, 0) / ciclos.length;
        const intensidadeBase = ciclos.reduce((sum, c) => sum + c.intensidade, 0) / ciclos.length;
        const rirBase = ciclos.reduce((sum, c) => sum + c.rir, 0) / ciclos.length;
        
        // Ajustar progressivamente ao longo das semanas
        const progressaoFator = (semana - 1) % 4; // 0, 1, 2, 3
        const progressaoAjuste = 1 + (progressaoFator * 0.05); // 1.0, 1.05, 1.1, 1.15
        
        semanaDados.volume = parseFloat((volumeBase * progressaoAjuste).toFixed(1));
        semanaDados.intensidade = parseFloat((intensidadeBase * progressaoAjuste).toFixed(1));
        semanaDados.rir = Math.max(0, Math.round(rirBase - progressaoFator * 0.5));
        
        // Distribuir os ciclos ao longo dos dias da semana
        for (let i = 0; i < 7; i++) {
          const cicloIndex = i % ciclos.length;
          const ciclo = ciclos[cicloIndex];
          
          // Ajustar valores do ciclo com base na progressão da semana
          semanaDados.diasVariacao.push({
            dia: i + 1,
            volume: parseFloat((ciclo.volume * progressaoAjuste).toFixed(1)),
            intensidade: parseFloat((ciclo.intensidade * progressaoAjuste).toFixed(1)),
            repeticoes: ciclo.repeticoes,
            rir: Math.max(0, ciclo.rir - Math.floor(progressaoFator * 0.5)),
            foco: ciclo.foco
          });
        }
      }
      
      progressao.push(semanaDados);
    }
    
    return progressao;
  }

  /**
   * Gera a progressão para periodização por blocos conjugados
   * @param {string} nivel - Nível do praticante (iniciante, intermediario, avancado)
   * @param {string} objetivo - Objetivo do treino (hipertrofia, forca)
   * @param {number} semanas - Número de semanas do mesociclo
   * @returns {Array} - Array com dados de progressão para cada semana
   */
  gerarProgressaoBlocosConjugados(nivel, objetivo, semanas) {
    // Verificar se os parâmetros existem
    if (!this.parametrosBlocosConjugados[nivel] || !this.parametrosBlocosConjugados[nivel][objetivo]) {
      console.error('Parâmetros não encontrados para', nivel, objetivo);
      return [];
    }
    
    // Obter configuração para o nível e objetivo
    const config = this.parametrosBlocosConjugados[nivel][objetivo];
    const blocos = config.blocos;
    
    // Gerar progressão semanal
    const progressao = [];
    
    // Determinar a distribuição dos blocos
    let semanaAtual = 1;
    let blocoAtual = 0;
    let semanaNoBloco = 1;
    
    while (semanaAtual <= semanas) {
      // Verificar se é semana de deload
      const isDeload = semanaAtual % config.deloadSemana === 0;
      const isPico = semanaAtual === semanas && !isDeload;
      
      // Obter bloco atual
      const bloco = blocos[blocoAtual];
      
      // Criar objeto base para a semana
      const semanaDados = {
        semana: semanaAtual,
        isDeload,
        isPico,
        tipoSemana: isDeload ? 'Deload' : isPico ? 'Pico' : bloco.nome,
        foco: isDeload ? 'Recuperação' : isPico ? 'Intensidade Máxima' : `${bloco.principal.foco} + ${bloco.secundario.foco}`,
        descricao: this.gerarDescricaoSemanaBlocos(nivel, objetivo, bloco.nome, isDeload, isPico),
        blocoAtual: bloco.nome,
        semanaNoBloco,
        principal: {},
        secundario: {}
      };
      
      if (isDeload) {
        // Semana de deload
        const volumeBase = (bloco.principal.volume + bloco.secundario.volume) / 2;
        const intensidadeBase = (bloco.principal.intensidade + bloco.secundario.intensidade) / 2;
        
        semanaDados.volume = parseFloat((volumeBase * config.deloadReducaoVolume).toFixed(1));
        semanaDados.intensidade = parseFloat((intensidadeBase * config.deloadReducaoIntensidade).toFixed(1));
        semanaDados.rir = Math.min(bloco.principal.rir, bloco.secundario.rir) + 2;
        
        semanaDados.principal = {
          volume: parseFloat((bloco.principal.volume * config.deloadReducaoVolume).toFixed(1)),
          intensidade: parseFloat((bloco.principal.intensidade * config.deloadReducaoIntensidade).toFixed(1)),
          rir: bloco.principal.rir + 2,
          foco: "Recuperação"
        };
        
        semanaDados.secundario = {
          volume: parseFloat((bloco.secundario.volume * config.deloadReducaoVolume).toFixed(1)),
          intensidade: parseFloat((bloco.secundario.intensidade * config.deloadReducaoIntensidade).toFixed(1)),
          rir: bloco.secundario.rir + 2,
          foco: "Recuperação"
        };
      } else if (isPico) {
        // Semana de pico
        // Usar o bloco de maior intensidade (geralmente o último)
        const blocoPico = blocos[blocos.length - 1];
        
        semanaDados.volume = parseFloat((blocoPico.principal.volume * 0.8).toFixed(1)); // Redução de 20% no volume
        semanaDados.intensidade = parseFloat((blocoPico.principal.intensidade * 1.05).toFixed(1)); // Aumento de 5% na intensidade
        semanaDados.rir = Math.max(0, blocoPico.principal.rir - 1);
        
        semanaDados.principal = {
          volume: parseFloat((blocoPico.principal.volume * 0.8).toFixed(1)),
          intensidade: parseFloat((blocoPico.principal.intensidade * 1.05).toFixed(1)),
          rir: Math.max(0, blocoPico.principal.rir - 1),
          foco: "Intensidade Máxima"
        };
        
        semanaDados.secundario = {
          volume: parseFloat((blocoPico.secundario.volume * 0.7).toFixed(1)),
          intensidade: parseFloat((blocoPico.secundario.intensidade * 0.95).toFixed(1)),
          rir: blocoPico.secundario.rir,
          foco: "Suporte"
        };
      } else {
        // Semana normal de bloco
        // Calcular progressão dentro do bloco
        const progressaoNoBloco = semanaNoBloco / bloco.semanas;
        
        // Ajustar valores com base na progressão dentro do bloco
        const ajusteVolume = 1 - (progressaoNoBloco * 0.1); // Redução gradual de volume (100% -> 90%)
        const ajusteIntensidade = 1 + (progressaoNoBloco * 0.05); // Aumento gradual de intensidade (100% -> 105%)
        
        semanaDados.principal = {
          volume: parseFloat((bloco.principal.volume * ajusteVolume).toFixed(1)),
          intensidade: parseFloat((bloco.principal.intensidade * ajusteIntensidade).toFixed(1)),
          rir: Math.max(0, bloco.principal.rir - Math.floor(progressaoNoBloco)),
          foco: bloco.principal.foco
        };
        
        semanaDados.secundario = {
          volume: parseFloat((bloco.secundario.volume * ajusteVolume).toFixed(1)),
          intensidade: parseFloat((bloco.secundario.intensidade * ajusteIntensidade).toFixed(1)),
          rir: Math.max(0, bloco.secundario.rir - Math.floor(progressaoNoBloco)),
          foco: bloco.secundario.foco
        };
        
        // Calcular médias para a semana
        semanaDados.volume = parseFloat(((semanaDados.principal.volume + semanaDados.secundario.volume) / 2).toFixed(1));
        semanaDados.intensidade = parseFloat(((semanaDados.principal.intensidade + semanaDados.secundario.intensidade) / 2).toFixed(1));
        semanaDados.rir = Math.round((semanaDados.principal.rir + semanaDados.secundario.rir) / 2);
      }
      
      progressao.push(semanaDados);
      
      // Avançar para a próxima semana
      semanaAtual++;
      
      if (isDeload) {
        // Após deload, reiniciar contagem de semana no bloco
        semanaNoBloco = 1;
      } else {
        semanaNoBloco++;
        
        // Verificar se é hora de mudar de bloco
        if (semanaNoBloco > blocos[blocoAtual].semanas) {
          blocoAtual = (blocoAtual + 1) % blocos.length;
          semanaNoBloco = 1;
        }
      }
    }
    
    return progressao;
  }

  /**
   * Gera descrição textual para semana de periodização ondulatória diária
   * @param {string} nivel - Nível do praticante
   * @param {string} objetivo - Objetivo do treino
   * @param {boolean} isDeload - Se é semana de deload
   * @param {boolean} isPico - Se é semana de pico
   * @returns {string} - Descrição da semana
   */
  gerarDescricaoSemanaOndulatoria(nivel, objetivo, isDeload, isPico) {
    if (isDeload) {
      return `Semana de recuperação (deload). Reduza volume e intensidade, mantendo técnica e conexão neuromuscular. Utilize séries longe da falha (RIR 3+) e priorize recuperação. Ideal para restauração da homeostase neuroendócrina e preparação para o próximo ciclo de sobrecarga.`;
    }
    
    if (isPico) {
      return `Semana de pico de intensidade. Alterne entre dias de alta intensidade (RIR 0-1) e dias de recuperação ativa. Nos dias intensos, foque em progressão de carga com técnica impecável. Nos dias de recuperação, utilize cargas moderadas com ênfase em controle excêntrico e fluxo sanguíneo.`;
    }
    
    if (objetivo === "hipertrofia") {
      return `Periodização ondulatória diária para hipertrofia. Alterne entre: 1) Dias de alto volume/baixa intensidade (12-15 reps, foco metabólico), 2) Dias de volume/intensidade moderados (8-12 reps, foco misto), e 3) Dias de baixo volume/alta intensidade (6-8 reps, foco em tensão mecânica). Esta variação diária maximiza os diferentes mecanismos de hipertrofia: tensão mecânica, dano muscular e estresse metabólico (Schoenfeld, 2010).`;
    } else {
      return `Periodização ondulatória diária para força. Alterne entre: 1) Dias de volume moderado/técnica (8-10 reps, foco em padrão motor), 2) Dias de força submáxima (5-7 reps, foco em recrutamento), e 3) Dias de força/potência (3-5 reps, foco em taxa de desenvolvimento de força). Esta variação diária otimiza adaptações neurais e estruturais (Rhea et al., 2002).`;
    }
  }

  /**
   * Gera descrição textual para semana de periodização por blocos conjugados
   * @param {string} nivel - Nível do praticante
   * @param {string} objetivo - Objetivo do treino
   * @param {string} bloco - Nome do bloco atual
   * @param {boolean} isDeload - Se é semana de deload
   * @param {boolean} isPico - Se é semana de pico
   * @returns {string} - Descrição da semana
   */
  gerarDescricaoSemanaBlocos(nivel, objetivo, bloco, isDeload, isPico) {
    if (isDeload) {
      return `Semana de recuperação (deload). Reduza volume e intensidade, mantendo técnica e conexão neuromuscular. Utilize séries longe da falha (RIR 3+) e priorize recuperação. Ideal para restauração da homeostase neuroendócrina e preparação para o próximo bloco.`;
    }
    
    if (isPico) {
      return `Semana de pico de intensidade. Priorize exercícios principais com alta intensidade (RIR 0-1) e reduza volume. Mantenha exercícios secundários com intensidade moderada para suporte. Foque em progressão de carga com técnica impecável e prepare-se para testes de força ou avaliações.`;
    }
    
    if (bloco === "Acumulação") {
      if (objetivo === "hipertrofia") {
        return `Bloco de Acumulação para hipertrofia. Foco primário em volume e estresse metabólico, com séries de 10-15 repetições e RIR 2-3. Exercícios principais visam acúmulo de volume, enquanto secundários desenvolvem força e técnica. Este bloco estabelece as bases metabólicas e estruturais para os blocos subsequentes (Issurin, 2008).`;
      } else {
        return `Bloco de Acumulação para força. Foco primário em volume e técnica, com séries de 6-10 repetições e RIR 2. Exercícios principais visam desenvolvimento de padrões motores, enquanto secundários iniciam adaptações neurais específicas. Este bloco estabelece as bases para expressão de força nos blocos subsequentes (Verkhoshansky & Siff, 2009).`;
      }
    } else if (bloco === "Transmutação") {
      if (objetivo === "hipertrofia") {
        return `Bloco de Transmutação para hipertrofia. Foco primário em intensidade moderada-alta com volume moderado, séries de 8-10 repetições e RIR 1-2. Exercícios principais visam tensão mecânica, enquanto secundários mantêm estímulo metabólico. Este bloco converte as adaptações do bloco anterior em estímulos mais específicos (Issurin, 2008).`;
      } else {
        return `Bloco de Transmutação para força. Foco primário em intensidade submáxima, com séries de 4-6 repetições e RIR 1. Exercícios principais visam recrutamento neural máximo, enquanto secundários mantêm volume e técnica. Este bloco converte as adaptações do bloco anterior em força específica (Verkhoshansky & Siff, 2009).`;
      }
    } else if (bloco === "Realização") {
      if (objetivo === "hipertrofia") {
        return `Bloco de Realização para hipertrofia. Foco primário em alta intensidade com volume reduzido, séries de 6-8 repetições e RIR 0-1. Exercícios principais visam tensão mecânica máxima, enquanto secundários mantêm recuperação ativa. Este bloco expressa as adaptações acumuladas nos blocos anteriores (Issurin, 2008).`;
      } else {
        return `Bloco de Realização para força. Foco primário em intensidade máxima, com séries de 1-3 repetições e RIR 0. Exercícios principais visam expressão máxima de força, enquanto secundários mantêm recuperação ativa. Este bloco expressa as adaptações neurais e estruturais dos blocos anteriores (Verkhoshansky & Siff, 2009).`;
      }
    }
    
    return `Bloco ${bloco}. Siga as recomendações específicas para exercícios principais e secundários, respeitando volume e intensidade prescritos.`;
  }

  /**
   * Atualiza a explicação teórica da periodização avançada com base no modelo
   * @param {string} modelo - Modelo de periodização (ondulatoria_diaria, blocos_conjugados)
   */
  atualizarExplicacaoTeoricaAvancada(modelo) {
    const explicacoes = {
      ondulatoria_diaria: `
        <h3>📘 Modelo de Periodização Aplicado: Ondulatória Diária</h3>
        <p><strong>Resumo Estrutural:</strong> A periodização ondulatória diária (DUP - Daily Undulating Periodization) representa uma evolução dos modelos não-lineares, caracterizada pela variação sistemática de volume e intensidade entre sessões de treino dentro da mesma semana.</p>
        
        <p><strong>Justificativa Fisiológica:</strong></p>
        <blockquote style="border-left: 4px solid #50fa7b; padding-left: 12px; margin: 12px 0;">
          "A variação diária de estímulos de treinamento pode produzir ganhos superiores em força e hipertrofia quando comparada a modelos lineares tradicionais, possivelmente devido à frequente alteração do estímulo que previne a acomodação e potencializa múltiplas vias de sinalização celular."
          <br><em>— Rhea et al., "A Comparison of Linear and Daily Undulating Periodized Programs with Equated Volume and Intensity for Strength" (2002)</em>
        </blockquote>
        
        <p><strong>Mecanismos Moleculares:</strong> A DUP atua através de múltiplos mecanismos:</p>
        <ul>
          <li><strong>Sinalização mTOR:</strong> Dias de alto volume/moderada intensidade maximizam a fosforilação de mTORC1 via estresse metabólico e acúmulo de metabólitos</li>
          <li><strong>Expressão de Miostatina:</strong> Dias de alta intensidade/baixo volume promovem downregulation da miostatina via tensão mecânica</li>
          <li><strong>Adaptações Neurais:</strong> Alternância entre padrões de recrutamento motor otimiza adaptações do sistema nervoso central e periférico</li>
        </ul>
        
        <p><strong>Estrutura Típica:</strong></p>
        <ul>
          <li><strong>Dia 1:</strong> Alto volume/baixa intensidade (12-15 repetições, 65-70% 1RM) — Foco em estresse metabólico</li>
          <li><strong>Dia 2:</strong> Volume/intensidade moderados (8-12 repetições, 70-80% 1RM) — Foco em equilíbrio tensão/metabolismo</li>
          <li><strong>Dia 3:</strong> Baixo volume/alta intensidade (4-6 repetições, 80-90% 1RM) — Foco em tensão mecânica</li>
        </ul>
        
        <p><strong>Evidências Científicas:</strong></p>
        <ul style="font-size: 0.95em;">
          <li>Rhea et al. (2002) demonstraram ganhos de força 28% superiores com DUP vs. periodização linear em períodos de 12 semanas</li>
          <li>Simão et al. (2012) observaram maior hipertrofia e ganhos de força em DUP vs. modelos lineares em praticantes intermediários</li>
          <li>Zourdos et al. (2016) evidenciaram que a DUP pode ser superior para atletas avançados devido à constante variação de estímulos</li>
        </ul>
        
        <p><strong>Considerações Práticas:</strong> A DUP requer planejamento cuidadoso para evitar interferência entre sessões e garantir recuperação adequada. A distribuição dos estímulos deve considerar grupos musculares, padrões de movimento e tempo de recuperação entre sessões.</p>
      `,
      blocos_conjugados: `
        <h3>📘 Modelo de Periodização Aplicado: Blocos Conjugados</h3>
        <p><strong>Resumo Estrutural:</strong> A periodização por blocos conjugados, desenvolvida inicialmente por Verkhoshansky e refinada por Issurin, organiza o treinamento em mesociclos especializados (blocos) com objetivos fisiológicos distintos, enquanto mantém qualidades secundárias em níveis de manutenção.</p>
        
        <p><strong>Justificativa Fisiológica:</strong></p>
        <blockquote style="border-left: 4px solid #50fa7b; padding-left: 12px; margin: 12px 0;">
          "O sistema de blocos conjugados permite concentração de cargas de trabalho homogêneas, criando um efeito residual que serve como fundação para o próximo bloco, enquanto evita o fenômeno de interferência entre adaptações concorrentes através da priorização sequencial de objetivos."
          <br><em>— Vladimir Issurin, "Block Periodization: Breakthrough in Sports Training" (2008)</em>
        </blockquote>
        
        <p><strong>Estrutura Sequencial:</strong> O modelo segue tipicamente três blocos consecutivos:</p>
        <ul>
          <li><strong>Bloco de Acumulação:</strong> Desenvolvimento de capacidades básicas (resistência, hipertrofia, técnica)</li>
          <li><strong>Bloco de Transmutação:</strong> Conversão das adaptações em qualidades mais específicas</li>
          <li><strong>Bloco de Realização:</strong> Expressão máxima das adaptações acumuladas</li>
        </ul>
        
        <p><strong>Mecanismos Moleculares e Fisiológicos:</strong></p>
        <ul>
          <li><strong>Efeito Residual:</strong> Cada bloco produz adaptações que persistem por 15-35 dias após seu término</li>
          <li><strong>Compatibilidade de Cargas:</strong> Minimização da interferência entre vias de sinalização anabólicas (mTOR) e catabólicas (AMPK)</li>
          <li><strong>Especificidade Sequencial:</strong> Adaptações estruturais precedem adaptações neurais para maximizar potencial de desempenho</li>
        </ul>
        
        <p><strong>Estrutura Conjugada:</strong> Cada bloco contém:</p>
        <ul>
          <li><strong>Capacidades Principais:</strong> Recebem volume e intensidade ótimos para desenvolvimento (70-80% do estímulo)</li>
          <li><strong>Capacidades Secundárias:</strong> Recebem estímulo mínimo para manutenção (20-30% do estímulo)</li>
        </ul>
        
        <p><strong>Evidências Científicas:</strong></p>
        <ul style="font-size: 0.95em;">
          <li>Issurin (2010) demonstrou superioridade do modelo de blocos vs. periodização tradicional em atletas de elite</li>
          <li>García-Pallarés et al. (2010) observaram ganhos superiores em força, potência e desempenho específico com blocos conjugados em atletas de canoagem</li>
          <li>Painter et al. (2012) evidenciaram melhorias significativas em atletas universitários usando o sistema de blocos conjugados</li>
        </ul>
        
        <p><strong>Aplicações Práticas:</strong> O modelo é particularmente eficaz para praticantes intermediários e avançados, onde a necessidade de estímulos específicos e concentrados se torna mais relevante para continuar progredindo. A duração típica de cada bloco varia entre 2-4 semanas, com deload estratégico entre transições de blocos.</p>
      `
    };

    const container = document.getElementById("explicacaoPeriodizacao");
    if (container) container.innerHTML = explicacoes[modelo] || "";
  }

  /**
   * Exibe a tabela de progressão ondulatória diária na interface
   * @param {Array} progressao - Dados de progressão gerados
   */
  exibirTabelaProgressaoOndulatoria(progressao) {
    const container = document.getElementById('progressao-container');
    if (!container) return;
    
    const tbody = document.getElementById('progressao-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    progressao.forEach(semana => {
      const tr = document.createElement('tr');
      
      // Adicionar classe para semanas especiais
      if (semana.isDeload) {
        tr.classList.add('semana-deload');
      } else if (semana.isPico) {
        tr.classList.add('semana-pico');
      }
      
      tr.innerHTML = `
        <td>${semana.semana}</td>
        <td>${semana.tipoSemana}</td>
        <td>${semana.volume}</td>
        <td>${semana.intensidade}%</td>
        <td>${semana.rir}</td>
        <td>${semana.foco}</td>
      `;
      
      // Adicionar evento para mostrar detalhes da ondulação diária
      tr.addEventListener('click', () => {
        this.mostrarDetalhesOndulatoriaDiaria(semana);
      });
      
      tbody.appendChild(tr);
    });
    
    // Mostrar o container
    container.style.display = 'block';
  }

  /**
   * Exibe a tabela de progressão por blocos conjugados na interface
   * @param {Array} progressao - Dados de progressão gerados
   */
  exibirTabelaProgressaoBlocos(progressao) {
    const container = document.getElementById('progressao-container');
    if (!container) return;
    
    const tbody = document.getElementById('progressao-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    progressao.forEach(semana => {
      const tr = document.createElement('tr');
      
      // Adicionar classe para semanas especiais
      if (semana.isDeload) {
        tr.classList.add('semana-deload');
      } else if (semana.isPico) {
        tr.classList.add('semana-pico');
      } else {
        // Adicionar classe para o tipo de bloco
        tr.classList.add(`bloco-${semana.blocoAtual.toLowerCase().replace(/\s+/g, '-')}`);
      }
      
      tr.innerHTML = `
        <td>${semana.semana}</td>
        <td>${semana.tipoSemana}</td>
        <td>${semana.volume}</td>
        <td>${semana.intensidade}%</td>
        <td>${semana.rir}</td>
        <td>${semana.foco}</td>
      `;
      
      // Adicionar evento para mostrar detalhes dos blocos conjugados
      tr.addEventListener('click', () => {
        this.mostrarDetalhesBlocosConjugados(semana);
      });
      
      tbody.appendChild(tr);
    });
    
    // Mostrar o container
    container.style.display = 'block';
  }

  /**
   * Mostra detalhes da ondulação diária em um modal ou painel
   * @param {Object} semana - Dados da semana selecionada
   */
  mostrarDetalhesOndulatoriaDiaria(semana) {
    // Verificar se já existe um modal
    let modal = document.getElementById('detalhes-modal');
    if (!modal) {
      // Criar modal
      modal = document.createElement('div');
      modal.id = 'detalhes-modal';
      modal.className = 'modal';
      document.body.appendChild(modal);
    }
    
    // Conteúdo do modal
    let conteudo = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>Detalhes da Semana ${semana.semana} - ${semana.tipoSemana}</h3>
        <p>${semana.descricao}</p>
    `;
    
    // Se for semana ondulatória, mostrar variação diária
    if (semana.diasVariacao && semana.diasVariacao.length > 0) {
      conteudo += `
        <h4>Variação Diária</h4>
        <table class="detalhes-table">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Volume</th>
              <th>Intensidade</th>
              <th>Repetições</th>
              <th>RIR</th>
              <th>Foco</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      semana.diasVariacao.forEach(dia => {
        conteudo += `
          <tr>
            <td>${dia.dia}</td>
            <td>${dia.volume}</td>
            <td>${dia.intensidade}%</td>
            <td>${dia.repeticoes}</td>
            <td>${dia.rir}</td>
            <td>${dia.foco}</td>
          </tr>
        `;
      });
      
      conteudo += `
          </tbody>
        </table>
      `;
    }
    
    conteudo += `</div>`;
    modal.innerHTML = conteudo;
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Adicionar evento para fechar modal
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  /**
   * Mostra detalhes dos blocos conjugados em um modal ou painel
   * @param {Object} semana - Dados da semana selecionada
   */
  mostrarDetalhesBlocosConjugados(semana) {
    // Verificar se já existe um modal
    let modal = document.getElementById('detalhes-modal');
    if (!modal) {
      // Criar modal
      modal = document.createElement('div');
      modal.id = 'detalhes-modal';
      modal.className = 'modal';
      document.body.appendChild(modal);
    }
    
    // Conteúdo do modal
    let conteudo = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>Detalhes da Semana ${semana.semana} - ${semana.tipoSemana}</h3>
        <p>${semana.descricao}</p>
    `;
    
    // Se for semana de bloco conjugado, mostrar detalhes principal/secundário
    if (semana.principal && semana.secundario) {
      conteudo += `
        <h4>Estrutura Conjugada</h4>
        <table class="detalhes-table">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Volume</th>
              <th>Intensidade</th>
              <th>RIR</th>
              <th>Foco</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Principal</strong></td>
              <td>${semana.principal.volume}</td>
              <td>${semana.principal.intensidade}%</td>
              <td>${semana.principal.rir}</td>
              <td>${semana.principal.foco}</td>
            </tr>
            <tr>
              <td><strong>Secundário</strong></td>
              <td>${semana.secundario.volume}</td>
              <td>${semana.secundario.intensidade}%</td>
              <td>${semana.secundario.rir}</td>
              <td>${semana.secundario.foco}</td>
            </tr>
          </tbody>
        </table>
      `;
    }
    
    conteudo += `</div>`;
    modal.innerHTML = conteudo;
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Adicionar evento para fechar modal
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.periodizacaoAvancada = new PeriodizacaoAvancada();
});
