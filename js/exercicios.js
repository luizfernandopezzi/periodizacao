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
    const volumePorSessao = {};
    const volumePorSemana = {};
    const volumeTotal = {};
    
    // Inicializar objetos
    this.gruposMusculares.forEach(grupo => {
      volumeTotal[grupo] = 0;
      volumePorSemana[grupo] = 0;
    });
    
    // Percorrer todas as sessões de treino
    document.querySelectorAll('.exercicios-selecionados').forEach((sessao, idx) => {
      const volumeSessao = {};
      this.gruposMusculares.forEach(grupo => {
        volumeSessao[grupo] = 0;
      });
      
      // Calcular volume para cada exercício na sessão
      sessao.querySelectorAll('.exercicio-item').forEach(item => {
        const exercicioId = parseInt(item.dataset.id);
        const series = parseInt(item.querySelector('.series').value) || 0;
        
        const exercicio = this.exercicios.find(e => e.id === exercicioId);
        if (exercicio && exercicio.volumePorSerie) {
          Object.entries(exercicio.volumePorSerie).forEach(([grupo, valor]) => {
            const volumeExercicio = valor * series;
            volumeSessao[grupo] += volumeExercicio;
            volumePorSemana[grupo] += volumeExercicio;
            volumeTotal[grupo] += volumeExercicio;
          });
        }
      });
      
      volumePorSessao[`Sessão ${idx + 1}`] = volumeSessao;
    });
    
    return {
      porSessao: volumePorSessao,
      porSemana: volumePorSemana,
      total: volumeTotal
    };
  }

  /**
   * Renderiza o gráfico de volume por grupo muscular
   * @param {string} tipo - Tipo de visualização ('sessao', 'semana', 'mesociclo')
   */
  renderizarGraficoVolume(tipo = 'mesociclo') {
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
        break;
      case 'semana':
        // Implementar visualização por semana
        // Será implementado quando tivermos a interface para selecionar a semana
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
        }
      }
    });
    
    // Atualizar tabela de volume
    this.atualizarTabelaVolume(volumeData, tipo);
  }

  /**
   * Atualiza a tabela de volume por grupo muscular
   * @param {Object} volumeData - Dados de volume calculados
   * @param {string} tipo - Tipo de visualização ('sessao', 'semana', 'mesociclo')
   */
  atualizarTabelaVolume(volumeData, tipo) {
    const tbody = document.getElementById('volume-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    let dadosVolume;
    switch(tipo) {
      case 'sessao':
        // Implementar para sessão específica
        break;
      case 'semana':
        dadosVolume = volumeData.porSemana;
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
  }
}

/**
 * Função para atualizar a UI com o volume calculado
 */
function atualizarVolumeGruposMuscularesUI() {
  if (window.bancoExercicios) {
    const tipoVisualizacao = document.querySelector('.volume-tab-btn.active')?.dataset.tab || 'mesociclo';
    window.bancoExercicios.renderizarGraficoVolume(tipoVisualizacao);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  // Criar instância global do banco de exercícios
  window.bancoExercicios = new BancoExercicios();
  
  // Carregar exercícios
  await window.bancoExercicios.carregarExercicios();
  
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
        div.dataset.id = exercicio.id;
        
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
});
