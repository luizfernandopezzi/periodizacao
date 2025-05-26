/**
 * Classe para gerenciar o banco de dados de exercícios e cálculos de volume
 */
class BancoExercicios {
  constructor() {
    this.exercicios = [];
    this.gruposMusculares = [
      "Peitoral", "Costas", "Quadríceps", "Isquiotibiais", "Glúteos", 
      "Deltóide Anterior", "Deltóide Lateral", "Deltóide Posterior",
      "Bíceps", "Tríceps", "Antebraço", "Panturrilha", "Abdômen",
      "Eretores da Espinha", "Core", "Trapézio", "Latíssimo do Dorso",
      "Serrátil", "Glúteo Médio", "Abdutores do Quadril", "Adutores do Quadril",
      "Braquial", "Rotadores do Manguito"
    ];
    this.volumeRecomendado = {
      "Peitoral": { min: 10, max: 20 },
      "Costas": { min: 10, max: 20 },
      "Latíssimo do Dorso": { min: 10, max: 20 },
      "Quadríceps": { min: 8, max: 16 },
      "Isquiotibiais": { min: 6, max: 12 },
      "Glúteos": { min: 8, max: 16 },
      "Deltóide Anterior": { min: 6, max: 12 },
      "Deltóide Lateral": { min: 8, max: 16 },
      "Deltóide Posterior": { min: 6, max: 12 },
      "Bíceps": { min: 6, max: 12 },
      "Tríceps": { min: 6, max: 12 },
      "Antebraço": { min: 4, max: 8 },
      "Panturrilha": { min: 6, max: 12 },
      "Abdômen": { min: 6, max: 12 },
      "Eretores da Espinha": { min: 6, max: 12 },
      "Core": { min: 6, max: 12 },
      "Trapézio": { min: 4, max: 10 },
      "Serrátil": { min: 2, max: 6 },
      "Glúteo Médio": { min: 4, max: 8 },
      "Abdutores do Quadril": { min: 4, max: 8 },
      "Adutores do Quadril": { min: 4, max: 8 },
      "Braquial": { min: 4, max: 8 },
      "Rotadores do Manguito": { min: 2, max: 6 }
    };
    
    // Armazenar volume por semana para cada grupo muscular
    this.volumePorSemana = {};
    
    // Inicializar volume por semana
    for (let semana = 1; semana <= 12; semana++) {
      this.volumePorSemana[semana] = {};
      this.gruposMusculares.forEach(grupo => {
        this.volumePorSemana[semana][grupo] = 0;
      });
    }
  }

  /**
   * Carrega os exercícios do arquivo JSON
   */
  async carregarExercicios() {
    try {
      const response = await fetch('data/exercicios.json');
      this.exercicios = await response.json();
      console.log('Exercícios carregados:', this.exercicios.length);
      return this.exercicios;
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error);
      this.exercicios = [];
      return [];
    }
  }

  /**
   * Filtra exercícios por tag (divisão de treino)
   * @param {string} tag - Tag para filtrar (ex: "Upper", "Lower", "Push", "Pull", "Legs", "Full Body")
   * @returns {Array} - Lista de exercícios filtrados
   */
  filtrarExerciciosPorTag(tag) {
    return this.exercicios.filter(ex => ex.tags.includes(tag));
  }

  /**
   * Filtra exercícios por grupo muscular
   * @param {string} grupo - Grupo muscular para filtrar
   * @returns {Array} - Lista de exercícios filtrados
   */
  filtrarExerciciosPorGrupo(grupo) {
    return this.exercicios.filter(ex => 
      ex.gruposMuscularesAlvo.includes(grupo) || 
      ex.gruposMuscularesSecundarios.includes(grupo)
    );
  }

  /**
   * Preenche um elemento select com exercícios filtrados por divisão
   * @param {HTMLElement} seletor - Elemento select para preencher
   * @param {string} divisao - Divisão de treino para filtrar
   */
  preencherSeletorExercicios(seletor, divisao) {
    const exerciciosFiltrados = this.filtrarExerciciosPorTag(divisao);
    seletor.innerHTML = '';
    
    exerciciosFiltrados.forEach(ex => {
      const option = document.createElement('option');
      option.value = ex.id;
      option.textContent = ex.nome;
      option.dataset.exercicio = JSON.stringify(ex);
      seletor.appendChild(option);
    });
  }

  /**
   * Calcula o volume por grupo muscular para uma lista de exercícios
   * @param {Array} exerciciosSelecionados - Lista de IDs de exercícios selecionados
   * @param {Array} series - Lista de número de séries correspondentes aos exercícios
   * @returns {Object} - Volume por grupo muscular
   */
  calcularVolumeGrupoMuscular(exerciciosSelecionados, series) {
    // Inicializar objeto para armazenar volume por grupo muscular
    const volumePorGrupo = {};
    this.gruposMusculares.forEach(grupo => {
      volumePorGrupo[grupo] = 0;
    });
    
    // Calcular volume para cada exercício selecionado
    exerciciosSelecionados.forEach((exId, index) => {
      const exercicio = this.exercicios.find(e => e.id === parseInt(exId));
      const numSeries = series[index] || 0;
      
      if (exercicio && exercicio.volumePorSerie) {
        Object.entries(exercicio.volumePorSerie).forEach(([grupo, valor]) => {
          volumePorGrupo[grupo] += valor * numSeries;
        });
      }
    });
    
    return volumePorGrupo;
  }

  /**
   * Calcula o volume total por sessão, semana e mesociclo
   * @returns {Object} - Objeto com volume por sessão, semana e total
   */
  calcularVolumeTotal() {
    // Resetar volume por semana
    for (let semana = 1; semana <= 12; semana++) {
      this.volumePorSemana[semana] = {};
      this.gruposMusculares.forEach(grupo => {
        this.volumePorSemana[semana][grupo] = 0;
      });
    }
    
    const volumePorSessao = {};
    const volumeTotal = {};
    
    // Inicializar objetos
    this.gruposMusculares.forEach(grupo => {
      volumeTotal[grupo] = 0;
    });
    
    // Percorrer todas as semanas do plano
    document.querySelectorAll('.semana-container').forEach(semanaContainer => {
      const semanaNum = parseInt(semanaContainer.dataset.semana) || 1;
      
      // Percorrer todas as sessões de treino desta semana
      semanaContainer.querySelectorAll('.exercicios-selecionados').forEach((sessao, sessaoIdx) => {
        const sessaoId = `Semana ${semanaNum} - Sessão ${sessaoIdx + 1}`;
        const volumeSessao = {};
        
        this.gruposMusculares.forEach(grupo => {
          volumeSessao[grupo] = 0;
        });
        
        // Calcular volume para cada exercício na sessão
        sessao.querySelectorAll('.exercicio-item').forEach(item => {
          const exercicioId = parseInt(item.dataset.id);
          const series = parseInt(item.querySelector('.series').value) || 0;
          
          const exercicio = this.exercicios.find(e => parseInt(e.id) === exercicioId);
          console.log("DEBUG → exercício encontrado:", exercicio);

          if (exercicio && exercicio.volumePorSerie) {
            Object.entries(exercicio.volumePorSerie).forEach(([grupo, valor]) => {
              const volumeExercicio = valor * series;
              volumeSessao[grupo] += volumeExercicio;
              
              // Adicionar ao volume da semana
              if (!this.volumePorSemana[semanaNum][grupo]) {
                this.volumePorSemana[semanaNum][grupo] = 0;
              }
              this.volumePorSemana[semanaNum][grupo] += volumeExercicio;
              
              // Adicionar ao volume total
              volumeTotal[grupo] += volumeExercicio;
            });
          }
        });
        
        volumePorSessao[sessaoId] = volumeSessao;
      });
    });
    
    console.log("Volume por semana calculado:", this.volumePorSemana);
    
    return {
      porSessao: volumePorSessao,
      porSemana: this.volumePorSemana,
      total: volumeTotal
    };
  }

  /**
   * Renderiza o gráfico de volume por grupo muscular
   * @param {string} tipo - Tipo de visualização ('sessao', 'semana', 'mesociclo')
   * @param {number} semanaAtual - Número da semana atual (para visualização por semana)
   */
  renderizarGraficoVolume(tipo = 'mesociclo', semanaAtual = 1) {
    const volumeData = this.calcularVolumeTotal();
    const ctx = document.getElementById('grafico-volume').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (this.graficoVolume) {
      this.graficoVolume.destroy();
    }
    
    let dados, labels;
    
    switch(tipo) {
      case 'sessao':
        // Implementar visualização por sessão específica
        // Será implementado quando tivermos a interface para selecionar a sessão
        console.log("Implementar visualização por sessão específica. Será implementado quando tivermos a interface para selecionar a sessão")
        return; // <---- aqui está a correção que evita o erro
      case 'semana':
        // Visualização por semana específica
        labels = Object.keys(volumeData.porSemana[semanaAtual] || {})
          .filter(grupo => (volumeData.porSemana[semanaAtual][grupo] || 0) > 0);
        dados = labels.map(grupo => volumeData.porSemana[semanaAtual][grupo] || 0);
        break;
      case 'mesociclo':
      default:
        // Visualização do mesociclo completo
        labels = Object.keys(volumeData.total).filter(grupo => volumeData.total[grupo] > 0);
        dados = labels.map(grupo => volumeData.total[grupo]);
        break;
    }
    
    // Criar gráfico
    this.graficoVolume = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Volume (séries)',
          data: dados,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: (context) => {
                const grupo = labels[context.dataIndex];
                const recomendado = this.volumeRecomendado[grupo];
                if (recomendado) {
                  return `Recomendado: ${recomendado.min}-${recomendado.max} séries`;
                }
                return '';
              }
            }
          }
        }
      }
    });
    
    // Atualizar tabela de volume
    this.atualizarTabelaVolume(volumeData, tipo, semanaAtual);
  }

  /**
   * Atualiza a tabela de volume por grupo muscular
   * @param {Object} volumeData - Dados de volume calculados
   * @param {string} tipo - Tipo de visualização ('sessao', 'semana', 'mesociclo')
   * @param {number} semanaAtual - Número da semana atual (para visualização por semana)
   */
  atualizarTabelaVolume(volumeData, tipo, semanaAtual = 1) {
    const tbody = document.getElementById('volume-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    let dadosVolume;
    switch(tipo) {
      case 'sessao':
        // Implementar para sessão específica
        break;
      case 'semana':
        dadosVolume = volumeData.porSemana[semanaAtual] || {};
        break;
      case 'mesociclo':
      default:
        dadosVolume = volumeData.total;
        break;
    }
    
    // Criar linhas da tabela
    Object.entries(dadosVolume)
      .filter(([grupo, volume]) => volume > 0)
      .sort((a, b) => b[1] - a[1]) // Ordenar por volume decrescente
      .forEach(([grupo, volume]) => {
        const tr = document.createElement('tr');
        
        // Determinar status do volume
        let status = 'Adequado';
        let statusClass = 'status-ok';
        
        if (this.volumeRecomendado[grupo]) {
          if (volume < this.volumeRecomendado[grupo].min) {
            status = 'Baixo';
            statusClass = 'status-baixo';
          } else if (volume > this.volumeRecomendado[grupo].max) {
            status = 'Alto';
            statusClass = 'status-alto';
          }
        }
        
        tr.innerHTML = `
          <td>${grupo}</td>
          <td>${volume.toFixed(1)}</td>
          <td class="${statusClass}">${status}</td>
        `;
        
        tbody.appendChild(tr);
      });
    
    // Adicionar explicação sobre os valores decimais
    const container = document.querySelector('.volume-tabela-container');
    if (container) {
      let explicacao = container.querySelector('.volume-explicacao');
      if (!explicacao) {
        explicacao = document.createElement('div');
        explicacao.className = 'volume-explicacao';
        container.appendChild(explicacao);
      }
      
      explicacao.innerHTML = `
        <p class="info-text">
          <i class="info-icon">ℹ️</i>
          Os valores decimais representam o volume efetivo por grupo muscular, calculado com base na contribuição de cada exercício.
          Exercícios podem trabalhar múltiplos grupos musculares com diferentes intensidades.
        </p>
      `;
    }
  }
  
  /**
   * Atualiza os seletores de semana para visualização de volume
   */
  atualizarSeletoresSemana() {
    const seletorSemana = document.getElementById('semana-selector');
    if (!seletorSemana) return;
    
    // Limpar seletor
    seletorSemana.innerHTML = '';
    
    // Encontrar número máximo de semanas no plano
    const semanas = document.querySelectorAll('.semana-container');
    const numSemanas = semanas.length;
    
    // Adicionar opções para cada semana
    for (let i = 1; i <= numSemanas; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Semana ${i}`;
      seletorSemana.appendChild(option);
    }
    
    // Adicionar listener para mudança de semana
    seletorSemana.addEventListener('change', () => {
      const semanaAtual = parseInt(seletorSemana.value);
      this.renderizarGraficoVolume('semana', semanaAtual);
    });
  }
}

/**
 * Função para atualizar a UI com o volume calculado
 */
function atualizarVolumeGruposMuscularesUI() {
  if (window.bancoExercicios) {
    const tipoVisualizacao = document.querySelector('.volume-tab-btn.active')?.dataset.tab || 'mesociclo';
    const semanaAtual = parseInt(document.getElementById('semana-selector')?.value || '1');
    window.bancoExercicios.renderizarGraficoVolume(tipoVisualizacao, semanaAtual);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  // Criar instância global do banco de exercícios
  window.bancoExercicios = new BancoExercicios();
  
  // Carregar exercícios
  await window.bancoExercicios.carregarExercicios();
  
  // Adicionar seletor de semana para visualização de volume
  const volumeTabs = document.querySelector('.volume-tabs');
  if (volumeTabs) {
    const semanaTab = volumeTabs.querySelector('[data-tab="semana"]');
    if (semanaTab) {
      const seletorContainer = document.createElement('div');
      seletorContainer.className = 'semana-selector-container';
      seletorContainer.innerHTML = `
        <label for="semana-selector">Selecionar Semana:</label>
        <select id="semana-selector"></select>
      `;
      
      // Inserir após as abas
      volumeTabs.parentNode.insertBefore(seletorContainer, volumeTabs.nextSibling);
      
      // Inicialmente oculto
      seletorContainer.style.display = 'none';
      
      // Mostrar/ocultar seletor conforme a aba ativa
      document.querySelectorAll('.volume-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          seletorContainer.style.display = btn.dataset.tab === 'semana' ? 'block' : 'none';
        });
      });
    }
  }
  
  // Adicionar listeners para botões de adicionar exercício
  document.addEventListener('click', event => {
    if (event.target.classList.contains('adicionar-exercicio')) {
      const container = event.target.closest('.exercicios-container');
      const selector = container.querySelector('.exercicio-selector');
      const selecionados = container.querySelector('.exercicios-selecionados');
      
      Array.from(selector.selectedOptions).forEach(option => {
        const exercicio = JSON.parse(option.dataset.exercicio);
        
        // Criar elemento para o exercício selecionado
        const div = document.createElement('div');
        div.classList.add('exercicio-item');
        div.dataset.id = parseInt(exercicio.id); // Garante que seja um número
        
        div.innerHTML = `
          <span>${exercicio.nome}</span>
          <input type="number" class="series" placeholder="Séries" min="1" max="10" value="3">
          <span>x</span>
          <input type="number" class="repeticoes" placeholder="Reps" min="1" max="30" value="10">
          <button class="remover-exercicio">×</button>
        `;
        
        selecionados.appendChild(div);
      });
      
      // Limpar seleção
      selector.selectedIndex = -1;
      
      // Recalcular volume
      atualizarVolumeGruposMuscularesUI();
      
      // Atualizar seletores de semana
      if (window.bancoExercicios) {
        window.bancoExercicios.atualizarSeletoresSemana();
      }
    }
    
    if (event.target.classList.contains('remover-exercicio')) {
      event.target.closest('.exercicio-item').remove();
      atualizarVolumeGruposMuscularesUI();
    }
  });
  
  // Adicionar listeners para as abas de volume
  document.querySelectorAll('.volume-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.volume-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      atualizarVolumeGruposMuscularesUI();
    });
  });
  
  // Observar mudanças nos inputs de séries e repetições
  document.addEventListener('change', event => {
    if (event.target.classList.contains('series') || 
        event.target.classList.contains('repeticoes')) {
      atualizarVolumeGruposMuscularesUI();
    }
  });
  
  // Adicionar listener para o botão de gerar plano
  const gerarPlanoBtn = document.getElementById('gerarPlano');
  if (gerarPlanoBtn) {
    const gerarPlanoOriginal = gerarPlanoBtn.onclick;
    
    gerarPlanoBtn.onclick = function() {
      // Executar função original se existir
      if (typeof gerarPlanoOriginal === 'function') {
        gerarPlanoOriginal.call(this);
      }
      
      // Atualizar seletores de semana após gerar plano
      setTimeout(() => {
        if (window.bancoExercicios) {
          window.bancoExercicios.atualizarSeletoresSemana();
          atualizarVolumeGruposMuscularesUI();
        }
      }, 500);
    };
  }
});
