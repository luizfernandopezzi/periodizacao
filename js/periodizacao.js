/**
 * Classe para gerenciar a periodização e progressão automática do mesociclo
 */
class Periodizacao {
  constructor() {
    // Parâmetros de periodização por nível e objetivo
    this.parametros = {
      iniciante: {
        hipertrofia: {
          volumeInicial: 10, // séries por grupo muscular por semana
          incrementoVolume: 2, // incremento semanal
          intensidadeInicial: 70, // % de 1RM ou RIR 3
          incrementoIntensidade: 2.5, // incremento % semanal
          deloadSemana: 4, // a cada quantas semanas
          deloadReducaoVolume: 0.6, // redução de 40% no volume
          deloadReducaoIntensidade: 0.9, // redução de 10% na intensidade
          rir: {
            inicial: 3,
            final: 1
          }
        },
        forca: {
          volumeInicial: 8, // séries por grupo muscular por semana
          incrementoVolume: 1, // incremento semanal
          intensidadeInicial: 80, // % de 1RM
          incrementoIntensidade: 3, // incremento % semanal
          deloadSemana: 3, // a cada quantas semanas
          deloadReducaoVolume: 0.5, // redução de 50% no volume
          deloadReducaoIntensidade: 0.85, // redução de 15% na intensidade
          rir: {
            inicial: 2,
            final: 0
          }
        }
      },
      intermediario: {
        hipertrofia: {
          volumeInicial: 12, // séries por grupo muscular por semana
          incrementoVolume: 2, // incremento semanal
          intensidadeInicial: 75, // % de 1RM ou RIR 2-3
          incrementoIntensidade: 2, // incremento % semanal
          deloadSemana: 4, // a cada quantas semanas
          deloadReducaoVolume: 0.6, // redução de 40% no volume
          deloadReducaoIntensidade: 0.9, // redução de 10% na intensidade
          rir: {
            inicial: 2,
            final: 0
          }
        },
        forca: {
          volumeInicial: 10, // séries por grupo muscular por semana
          incrementoVolume: 1, // incremento semanal
          intensidadeInicial: 82.5, // % de 1RM
          incrementoIntensidade: 2.5, // incremento % semanal
          deloadSemana: 3, // a cada quantas semanas
          deloadReducaoVolume: 0.5, // redução de 50% no volume
          deloadReducaoIntensidade: 0.85, // redução de 15% na intensidade
          rir: {
            inicial: 1,
            final: 0
          }
        }
      },
      avancado: {
        hipertrofia: {
          volumeInicial: 14, // séries por grupo muscular por semana
          incrementoVolume: 1.5, // incremento semanal
          intensidadeInicial: 77.5, // % de 1RM ou RIR 2
          incrementoIntensidade: 1.5, // incremento % semanal
          deloadSemana: 3, // a cada quantas semanas
          deloadReducaoVolume: 0.6, // redução de 40% no volume
          deloadReducaoIntensidade: 0.9, // redução de 10% na intensidade
          rir: {
            inicial: 2,
            final: 0
          }
        },
        forca: {
          volumeInicial: 12, // séries por grupo muscular por semana
          incrementoVolume: 0.5, // incremento semanal
          intensidadeInicial: 85, // % de 1RM
          incrementoIntensidade: 2, // incremento % semanal
          deloadSemana: 3, // a cada quantas semanas
          deloadReducaoVolume: 0.5, // redução de 50% no volume
          deloadReducaoIntensidade: 0.85, // redução de 15% na intensidade
          rir: {
            inicial: 1,
            final: 0
          }
        }
      }
    };
  }

  /**
   * Gera a progressão automática para o mesociclo
   * @param {string} nivel - Nível do praticante (iniciante, intermediario, avancado)
   * @param {string} objetivo - Objetivo do treino (hipertrofia, forca)
   * @param {number} semanas - Número de semanas do mesociclo
   * @returns {Array} - Array com dados de progressão para cada semana
   */
  gerarProgressaoAutomatica(nivel, objetivo, semanas) {
    // Verificar se os parâmetros existem
    if (!this.parametros[nivel] || !this.parametros[nivel][objetivo]) {
      console.error('Parâmetros não encontrados para', nivel, objetivo);
      return [];
    }
    
    // Obter configuração para o nível e objetivo
    const config = this.parametros[nivel][objetivo];
    
    // Gerar progressão semanal
    const progressao = [];
    
    for (let semana = 1; semana <= semanas; semana++) {
      // Verificar se é semana de deload
      const isDeload = semana % config.deloadSemana === 0;
      const isPico = semana === semanas && !isDeload;
      
      // Calcular volume e intensidade para a semana
      let volume, intensidade, rir;
      
      if (isDeload) {
        // Semana de deload
        volume = config.volumeInicial * config.deloadReducaoVolume;
        intensidade = config.intensidadeInicial * config.deloadReducaoIntensidade;
        rir = config.rir.inicial + 1;
      } else {
        // Semana normal ou de pico
        const semanasEfetivas = semana - Math.floor((semana - 1) / config.deloadSemana);
        
        volume = config.volumeInicial + (config.incrementoVolume * (semanasEfetivas - 1));
        
        if (isPico) {
          // Semana de pico: intensidade máxima, volume reduzido
          intensidade = config.intensidadeInicial + (config.incrementoIntensidade * semanasEfetivas);
          volume = volume * 0.8; // Redução de 20% no volume para semana de pico
          rir = config.rir.final;
        } else {
          // Semana normal
          intensidade = config.intensidadeInicial + (config.incrementoIntensidade * (semanasEfetivas - 1));
          rir = Math.max(
            config.rir.final,
            config.rir.inicial - Math.floor((semanasEfetivas - 1) / (semanas / (config.rir.inicial - config.rir.final + 1)))
          );
        }
      }
      
      // Determinar tipo de semana e foco
      let tipoSemana, foco;
      
      if (isDeload) {
        tipoSemana = 'Deload';
        foco = 'Recuperação';
      } else if (isPico) {
        tipoSemana = 'Pico';
        foco = 'Intensidade Máxima';
      } else {
        // Alternar entre acumulação e intensificação
        const cicloAtual = Math.ceil(semana / config.deloadSemana);
        const posicaoNoCiclo = semana % config.deloadSemana || config.deloadSemana;
        
        if (posicaoNoCiclo <= Math.ceil(config.deloadSemana / 2)) {
          tipoSemana = 'Acumulação';
          foco = 'Volume';
        } else {
          tipoSemana = 'Intensificação';
          foco = 'Intensidade';
        }
      }
      
      progressao.push({
        semana,
        volume: parseFloat(volume.toFixed(1)),
        intensidade: parseFloat(intensidade.toFixed(1)),
        rir,
        isDeload,
        isPico,
        tipoSemana,
        foco,
        descricao: this.gerarDescricaoSemana(tipoSemana, nivel, objetivo)
      });
    }
    
    return progressao;
  }

  /**
   * Gera descrição textual para cada tipo de semana
   * @param {string} tipoSemana - Tipo da semana (Acumulação, Intensificação, Deload, Pico)
   * @param {string} nivel - Nível do praticante
   * @param {string} objetivo - Objetivo do treino
   * @returns {string} - Descrição da semana
   */
  gerarDescricaoSemana(tipoSemana, nivel, objetivo) {
    const descricoes = {
      Acumulação: {
        hipertrofia: "Foco em volume e tempo sob tensão. Utilize séries de 8-12 repetições com RIR 2-3. Priorize controle excêntrico (3-4s) e conexão mente-músculo.",
        forca: "Foco em volume com cargas moderadas. Utilize séries de 5-8 repetições com RIR 2. Mantenha técnica rigorosa e trabalhe na zona de 75-80% de 1RM."
      },
      Intensificação: {
        hipertrofia: "Foco em intensidade progressiva. Utilize séries de 6-10 repetições com RIR 1-2. Aumente cargas em relação à fase de acumulação, mantendo controle técnico.",
        forca: "Foco em intensidade elevada. Utilize séries de 3-5 repetições com RIR 1. Trabalhe na zona de 80-87.5% de 1RM com ênfase na velocidade concêntrica."
      },
      Deload: {
        hipertrofia: "Semana de recuperação. Reduza volume em 40% e intensidade em 10%. Mantenha séries longe da falha (RIR 4+) e priorize recuperação e técnica.",
        forca: "Semana de recuperação. Reduza volume em 50% e intensidade em 15%. Utilize séries de 3-5 repetições com cargas moderadas (65-70% de 1RM) e RIR 3+."
      },
      Pico: {
        hipertrofia: "Semana de pico de intensidade. Reduza volume em 20% e aumente cargas para RIR 0-1. Foco em séries de 6-8 repetições com máxima intensidade.",
        forca: "Semana de pico de força. Reduza volume em 30% e trabalhe próximo ao máximo (90%+ de 1RM). Utilize séries de 1-3 repetições com RIR 0-1."
      }
    };
    
    // Ajustar descrição conforme nível
    let descricao = descricoes[tipoSemana]?.[objetivo] || "Ajuste conforme necessidade individual.";
    
    if (nivel === "iniciante") {
      descricao += " Para iniciantes, mantenha foco especial na técnica e evite falha concêntrica.";
    } else if (nivel === "avancado") {
      descricao += " Para avançados, considere técnicas avançadas como séries descendentes ou rest-pause nas semanas de intensificação e pico.";
    }
    
    return descricao;
  }

  /**
   * Atualiza a explicação teórica da periodização com base no nível
   * @param {string} nivel - Nível do praticante
   */
  atualizarExplicacaoTeorica(nivel) {
    const explicacoes = {
      iniciante: `
        <h3>📘 Modelo de Periodização Aplicado: Iniciante – Linear Adaptativo com Ênfase Técnica</h3>
        <p><strong>Resumo Estrutural:</strong> Para iniciantes, a periodização segue um modelo linear adaptativo, no qual a progressão de carga ou volume ocorre de forma direta e semanal, priorizando eficiência neuromotora e consolidação dos padrões de movimento fundamentais.</p>
        <p><strong>Justificativa Técnica:</strong></p>
        <blockquote style="border-left: 4px solid #50fa7b; padding-left: 12px; margin: 12px 0;">
          "Iniciantes se beneficiam de qualquer estímulo estruturado, e o progresso pode ser sustentado com acréscimos lineares por longos períodos, dado o seu alto potencial de adaptação neural inicial."  
          <br><em>— Helms et al., The Muscle and Strength Pyramid (2016)</em>
        </blockquote>
        <p><strong>Distribuição semanal típica:</strong></p>
        <ul>
          <li><strong>Semanas 1–2:</strong> Técnica e controle motor. Ênfase em estabilidade articular, amplitude ativa e familiarização com padrões básicos (agachar, puxar, empurrar).</li>
          <li><strong>Semanas 3–4:</strong> Aumento progressivo de volume, com foco em repetição sob controle, sem falha concêntrica.</li>
        </ul>
        <p><strong>Objetivo Fisiológico:</strong> Reforçar adaptações neurais iniciais (recrutamento motor, coordenação inter e intramuscular) com mínima fadiga metabólica, estabelecendo bases sólidas para progressões futuras.</p>
        <p><strong>Referências:</strong></p>
        <ul style="font-size: 0.95em;">
          <li>Helms et al. (2016). The Muscle and Strength Pyramid: Training.</li>
          <li>Fleck & Kraemer (2014). Designing Resistance Training Programs.</li>
          <li>Bompa & Buzzichelli (2019). Periodization: Theory and Methodology of Training.</li>
        </ul>
      `,
      intermediario: `
        <h3>📘 Modelo de Periodização Aplicado: Intermediário – Ondulação Semanal Estratégica</h3>
        <p><strong>Resumo Estrutural:</strong> Com a estabilização do ganho neural inicial, o praticante intermediário passa a demandar variações cíclicas no estímulo. A periodização ondulatória semanal alterna entre blocos de acúmulo (maior volume) e intensificação (maior carga), com deloads opcionais.</p>
        <p><strong>Justificativa Técnica:</strong></p>
        <blockquote style="border-left: 4px solid #50fa7b; padding-left: 12px; margin: 12px 0;">
          "A manipulação sistemática de volume e intensidade semanalmente permite manutenção da sobrecarga progressiva, evitando estagnação em indivíduos com maior treinamento prévio."  
          <br><em>— Schoenfeld & Grgic (2021). Periodization Theory: Confronting Traditional Paradigms.</em>
        </blockquote>
        <p><strong>Distribuição semanal típica:</strong></p>
        <ul>
          <li><strong>Semana 1:</strong> Técnica com volume moderado e repetições controladas</li>
          <li><strong>Semana 2:</strong> Acúmulo — aumento do volume, menor intensidade</li>
          <li><strong>Semana 3:</strong> Intensificação — maior carga, menor número de repetições</li>
          <li><strong>Semana 4:</strong> Consolidação ou regeneração</li>
          <li><strong>Semanas 5–6 (opcional):</strong> Novo ciclo de estímulo com pico e deload</li>
        </ul>
        <p><strong>Objetivo Fisiológico:</strong> Alternar entre sobrecarga metabólica (via volume), recrutamento neural (via intensidade) e regeneração ativa, promovendo um ciclo de estímulo-adaptação-recuperação coerente.</p>
        <p><strong>Referências:</strong></p>
        <ul style="font-size: 0.95em;">
          <li>Jonato Prestes et al. (2022). Prescrição e Periodização do Treinamento de Força em Academias.</li>
          <li>Schoenfeld, B. J. (2010). The mechanisms of muscle hypertrophy and their application to resistance training.</li>
          <li>Fleck & Kraemer (2014). Periodization Models for Resistance Training.</li>
        </ul>
      `,
      avancado: `
        <h3>📘 Modelo de Periodização Aplicado: Avançado – Bloco Clássico (Acúmulo → Intensificação → Deload)</h3>
        <p><strong>Resumo Estrutural:</strong> Este plano segue a lógica da periodização por blocos, com separação de funções fisiológicas entre fases. O objetivo é manipular variáveis de treino de forma planejada, otimizando adaptações específicas por meio da alternância entre estímulo e recuperação.</p>
        <p><strong>Justificativa Técnica:</strong></p>
        <blockquote style="border-left: 4px solid #50fa7b; padding-left: 12px; margin: 12px 0;">
          "Advanced athletes require a periodized training program with distinct blocks that emphasize specific adaptations. These blocks must be ordered in a logical sequence to allow for progressive overload while managing fatigue."  
          <br><em>— Helms et al., The Muscle and Strength Pyramid (2016)</em>
        </blockquote>
        <p><strong>Distribuição semanal típica:</strong></p>
        <ul>
          <li><strong>Semanas 1–2: Acúmulo</strong> — Alto volume, baixa intensidade. Objetivo: aumentar densidade de treino, tempo sob tensão e recrutamento metabólico.</li>
          <li><strong>Semanas 3–4: Intensificação</strong> — Volume reduzido, maior carga. Objetivo: estimular adaptações neurais, força máxima e eficiência mecânica.</li>
          <li><strong>Semana 5: Pico</strong> — Carga elevada com redução de volume. Objetivo: maximizar performance ou aplicar overreaching controlado.</li>
          <li><strong>Semana 6: Deload</strong> — Redução geral de volume e intensidade. Objetivo: recuperação sistêmica e supercompensação.</li>
        </ul>
        <p><strong>Objetivo Fisiológico:</strong> Modular os sistemas metabólico (acúmulo), neural (intensificação) e endócrino (deload), respeitando a janela de adaptações específicas. Este modelo reduz risco de estagnação, lesão e permite progressão sustentável de médio e longo prazo.</p>
        <p><strong>Referências:</strong></p>
        <ul style="font-size: 0.95em;">
          <li>Helms et al. (2016). The Muscle and Strength Pyramid: Training.</li>
          <li>Schoenfeld, B. J. (2010). The mechanisms of muscle hypertrophy and their application to resistance training.</li>
          <li>Greg Nuckols. The Art and Science of Lifting.</li>
          <li>Jonato Prestes et al. (2022). Prescrição e Periodização do Treinamento de Força em Academias.</li>
        </ul>
      `
    };

    const container = document.getElementById("explicacaoPeriodizacao");
    if (container) container.innerHTML = explicacoes[nivel] || "";
  }

  /**
   * Exibe a tabela de progressão na interface
   * @param {Array} progressao - Dados de progressão gerados
   */
  exibirTabelaProgressao(progressao) {
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
      
      tbody.appendChild(tr);
    });
    
    // Mostrar o container
    container.style.display = 'block';
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.periodizacao = new Periodizacao();
  
  const nivelSelect = document.getElementById("nivel");
  if (nivelSelect) {
    window.periodizacao.atualizarExplicacaoTeorica(nivelSelect.value);
    nivelSelect.addEventListener("change", () => window.periodizacao.atualizarExplicacaoTeorica(nivelSelect.value));
  }
});
