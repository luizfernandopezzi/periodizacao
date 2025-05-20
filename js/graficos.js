/**
 * Classe para gerenciar a visualização gráfica das variáveis de treinamento
 */
class GraficosTreino {
  constructor() {
    this.graficoAtual = null;
    this.dados = null;
    this.tipoAtual = 'volume';
    this.cores = {
      volume: 'rgba(75, 192, 192, 0.8)',
      intensidade: 'rgba(255, 99, 132, 0.8)',
      tonelagem: 'rgba(153, 102, 255, 0.8)',
      rir: 'rgba(255, 159, 64, 0.8)'
    };
  }
  
  /**
   * Inicializa os listeners para as abas de gráficos
   */
  inicializar() {
    // Configurar listeners para as abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.tipoAtual = btn.dataset.tab;
        this.renderizarGrafico(this.tipoAtual);
      });
    });
  }
  
  /**
   * Atualiza os dados para os gráficos
   * @param {Array} progressao - Dados de progressão do mesociclo
   */
  atualizarDados(progressao) {
    this.dados = progressao;
    // Renderizar o gráfico inicial
    this.renderizarGrafico(this.tipoAtual);
  }
  
  /**
   * Renderiza o gráfico conforme o tipo selecionado
   * @param {string} tipo - Tipo de gráfico (volume, intensidade, tonelagem, rir)
   */
  renderizarGrafico(tipo) {
    if (!this.dados) return;
    
    const ctx = document.getElementById('grafico-treino').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (this.graficoAtual) {
      this.graficoAtual.destroy();
    }
    
    // Preparar dados para o gráfico
    const labels = this.dados.map(d => `Semana ${d.semana}`);
    let dados, titulo, cor;
    
    switch(tipo) {
      case 'volume':
        dados = this.dados.map(d => d.volume);
        titulo = 'Volume (séries por grupo muscular)';
        cor = this.cores.volume;
        break;
      case 'intensidade':
        dados = this.dados.map(d => d.intensidade);
        titulo = 'Intensidade (%1RM)';
        cor = this.cores.intensidade;
        break;
      case 'tonelagem':
        // Cálculo estimado de tonelagem (volume x intensidade)
        dados = this.dados.map(d => parseFloat((d.volume * d.intensidade / 100 * 10).toFixed(1)));
        titulo = 'Tonelagem Estimada (u.a.)';
        cor = this.cores.tonelagem;
        break;
      case 'rir':
        dados = this.dados.map(d => d.rir);
        titulo = 'Repetições em Reserva (RIR)';
        cor = this.cores.rir;
        break;
      default:
        dados = this.dados.map(d => d.volume);
        titulo = 'Volume (séries por grupo muscular)';
        cor = this.cores.volume;
    }
    
    // Criar novo gráfico
    this.graficoAtual = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: titulo,
          data: dados,
          backgroundColor: this.dados.map(d => {
            if (d.isDeload) return 'rgba(255, 206, 86, 0.8)'; // Amarelo para deload
            if (d.isPico) return 'rgba(255, 99, 132, 0.8)'; // Vermelho para pico
            return cor;
          }),
          borderColor: this.dados.map(d => {
            if (d.isDeload) return 'rgba(255, 206, 86, 1)';
            if (d.isPico) return 'rgba(255, 99, 132, 1)';
            return cor.replace('0.8', '1');
          }),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: tipo === 'rir' // Começar do zero apenas para RIR
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              afterLabel: (context) => {
                const idx = context.dataIndex;
                return [
                  `Tipo: ${this.dados[idx].tipoSemana}`,
                  `Foco: ${this.dados[idx].foco}`
                ];
              }
            }
          }
        }
      }
    });
  }
  
  /**
   * Renderiza o gráfico de comparação entre semanas
   * @param {Array} semanasSelecionadas - Índices das semanas a comparar
   */
  renderizarGraficoComparativo(semanasSelecionadas) {
    if (!this.dados || !semanasSelecionadas || semanasSelecionadas.length === 0) return;
    
    const ctx = document.getElementById('grafico-comparativo').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (this.graficoComparativo) {
      this.graficoComparativo.destroy();
    }
    
    // Filtrar apenas as semanas selecionadas
    const dadosFiltrados = semanasSelecionadas.map(idx => this.dados[idx]);
    
    // Preparar dados para o gráfico
    const labels = ['Volume', 'Intensidade', 'RIR', 'Tonelagem'];
    const datasets = dadosFiltrados.map((semana, idx) => {
      // Calcular tonelagem
      const tonelagem = parseFloat((semana.volume * semana.intensidade / 100 * 10).toFixed(1));
      
      return {
        label: `Semana ${semana.semana} (${semana.tipoSemana})`,
        data: [
          semana.volume,
          semana.intensidade,
          semana.rir,
          tonelagem
        ],
        backgroundColor: `rgba(${75 + idx * 50}, ${192 - idx * 30}, ${192 - idx * 30}, 0.6)`,
        borderColor: `rgba(${75 + idx * 50}, ${192 - idx * 30}, ${192 - idx * 30}, 1)`,
        borderWidth: 1
      };
    });
    
    // Criar novo gráfico
    this.graficoComparativo = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: false
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      }
    });
  }
  
  /**
   * Exporta o gráfico atual como imagem
   * @returns {string} - URL da imagem
   */
  exportarGraficoComoImagem() {
    if (!this.graficoAtual) return null;
    
    return this.graficoAtual.toBase64Image();
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.graficosTreino = new GraficosTreino();
  window.graficosTreino.inicializar();
  
  // Adicionar listener para o botão de gerar plano
  const gerarPlanoBtn = document.getElementById('gerarPlano');
  if (gerarPlanoBtn) {
    gerarPlanoBtn.addEventListener('click', () => {
      const nivel = document.getElementById('nivel').value;
      const objetivo = document.getElementById('objetivo').value;
      const semanas = parseInt(document.getElementById('semanas').value);
      
      // Gerar progressão automática
      if (window.periodizacao) {
        const progressao = window.periodizacao.gerarProgressaoAutomatica(nivel, objetivo, semanas);
        
        // Exibir tabela de progressão
        window.periodizacao.exibirTabelaProgressao(progressao);
        
        // Atualizar gráficos
        if (window.graficosTreino) {
          window.graficosTreino.atualizarDados(progressao);
        }
      }
    });
  }
});
