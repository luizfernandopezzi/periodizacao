/**
 * Classe para gerenciar a visualização gráfica das variáveis de treinamento
 */
class GraficosTreino {
  constructor() {
    this.graficoAtual = null;
    this.dados = null;
    this.tipoAtual = "volume";
    this.cores = {
      volume: "rgba(75, 192, 192, 0.8)",
      intensidade: "rgba(255, 99, 132, 0.8)",
      tonelagem: "rgba(153, 102, 255, 0.8)",
      rir: "rgba(255, 159, 64, 0.8)",
    };
  }

  /**
   * Inicializa os listeners para as abas de gráficos
   */
  inicializar() {
    // Configurar listeners para as abas
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.tipoAtual = btn.dataset.tab;
        this.renderizarGrafico(this.tipoAtual);
      });
    });

    // Adicionar explicação sobre valores decimais na tabela de progressão
    const progressaoContainer = document.getElementById("progressao-container");
    if (progressaoContainer) {
      let explicacao = progressaoContainer.querySelector(
        ".progressao-explicacao"
      );
      if (!explicacao) {
        explicacao = document.createElement("div");
        explicacao.className = "progressao-explicacao";
        explicacao.innerHTML = `
          <p class="info-text">
            <i class="info-icon">ℹ️</i>
            <strong>Nota sobre valores na tabela:</strong> Os valores decimais na tabela de progressão representam 
            o volume teórico médio por grupo muscular calculado pelo algoritmo de periodização. 
            No plano prático, estes valores são arredondados para números inteiros para facilitar a execução.
            <a href="#" class="toggle-formula">Ver fórmula de cálculo</a>
          </p>
          <div class="formula-container" style="display: none;">
            <p>Fórmula para cálculo do volume teórico:</p>
            <pre>V<sub>teórico</sub> = (V<sub>principal</sub> + V<sub>secundário</sub>) / 2 × F<sub>ajuste</sub></pre>
            <p>Onde:</p>
            <ul>
              <li>V<sub>principal</sub> = Volume do componente principal do bloco</li>
              <li>V<sub>secundário</sub> = Volume do componente secundário do bloco</li>
              <li>F<sub>ajuste</sub> = Fator de ajuste baseado na progressão dentro do bloco (1 - progressãoNoBloco × 0.1)</li>
            </ul>
            <p>Referência: Issurin, V. B. (2008). "Block periodization versus traditional training theory: a review." Journal of Sports Medicine and Physical Fitness, 48(1), 65-75.</p>
          </div>
        `;

        // Inserir após a tabela de progressão
        const tabela = progressaoContainer.querySelector("#tabela-progressao");
        if (tabela) {
          tabela.parentNode.insertBefore(explicacao, tabela.nextSibling);
        } else {
          progressaoContainer.appendChild(explicacao);
        }

        // Adicionar listener para mostrar/ocultar fórmula
        const toggleFormula = explicacao.querySelector(".toggle-formula");
        const formulaContainer = explicacao.querySelector(".formula-container");

        if (toggleFormula && formulaContainer) {
          toggleFormula.addEventListener("click", (e) => {
            e.preventDefault();
            const isVisible = formulaContainer.style.display !== "none";
            formulaContainer.style.display = isVisible ? "none" : "block";
            toggleFormula.textContent = isVisible
              ? "Ver fórmula de cálculo"
              : "Ocultar fórmula";
          });
        }
      }
    }
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

    const ctx = document.getElementById("grafico-treino").getContext("2d");

    // Destruir gráfico anterior se existir
    if (this.graficoAtual) {
      this.graficoAtual.destroy();
    }

    // Preparar dados para o gráfico
    const labels = this.dados.map((d) => `Semana ${d.semana}`);
    let dados, titulo, cor;

    switch (tipo) {
      case "volume":
        dados = this.dados.map((d) => d.volume);
        titulo = "Volume (séries por grupo muscular)";
        cor = this.cores.volume;
        break;
      case "intensidade":
        dados = this.dados.map((d) => d.intensidade);
        titulo = "Intensidade (%1RM)";
        cor = this.cores.intensidade;
        break;
      case "tonelagem":
        // Cálculo estimado de tonelagem (volume x intensidade)
        dados = this.dados.map((d) =>
          parseFloat((((d.volume * d.intensidade) / 100) * 10).toFixed(1))
        );
        titulo = "Tonelagem Estimada (u.a.)";
        cor = this.cores.tonelagem;
        break;
      case "rir":
        dados = this.dados.map((d) => d.rir);
        titulo = "Repetições em Reserva (RIR)";
        cor = this.cores.rir;
        break;
      default:
        dados = this.dados.map((d) => d.volume);
        titulo = "Volume (séries por grupo muscular)";
        cor = this.cores.volume;
    }

    // Criar novo gráfico
    this.graficoAtual = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: titulo,
            data: dados,
            backgroundColor: this.dados.map((d) => {
              if (d.isDeload) return "rgba(255, 206, 86, 0.8)"; // Amarelo para deload
              if (d.isPico) return "rgba(255, 99, 132, 0.8)"; // Vermelho para pico
              return cor;
            }),
            borderColor: this.dados.map((d) => {
              if (d.isDeload) return "rgba(255, 206, 86, 1)";
              if (d.isPico) return "rgba(255, 99, 132, 1)";
              return cor.replace("0.8", "1");
            }),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: tipo === "rir", // Começar do zero apenas para RIR
            beginAtZero: tipo === "volume", // Começar do zero apenas para RIR
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              afterLabel: (context) => {
                const idx = context.dataIndex;
                return [
                  `Tipo: ${this.dados[idx].tipoSemana}`,
                  `Foco: ${this.dados[idx].foco}`,
                ];
              },
            },
          },
        },
      },
    });

    // Adicionar explicação sobre os valores teóricos vs. práticos
    const container = document.querySelector(".graficos-content");
    if (container && tipo === "volume") {
      let explicacao = container.querySelector(".volume-teoria-pratica");
      if (!explicacao) {
        explicacao = document.createElement("div");
        explicacao.className = "volume-teoria-pratica";
        explicacao.innerHTML = `
          <p class="info-text">
            <i class="info-icon">ℹ️</i>
            <strong>Nota:</strong> O gráfico mostra valores teóricos de volume calculados pelo algoritmo de periodização.
            Estes valores podem diferir do volume real programado nos exercícios específicos.
            Para visualizar o volume real por grupo muscular, use a seção "Volume por Grupo Muscular" abaixo.
          </p>
        `;

        // Inserir após o gráfico
        const canvasContainer = container.querySelector(".canvas-container");
        if (canvasContainer) {
          canvasContainer.parentNode.insertBefore(
            explicacao,
            canvasContainer.nextSibling
          );
        } else {
          container.appendChild(explicacao);
        }
      } else {
        explicacao.style.display = "block";
      }
    } else if (container) {
      const explicacao = container.querySelector(".volume-teoria-pratica");
      if (explicacao) {
        explicacao.style.display = "none";
      }
    }
  }

  /**
   * Renderiza o gráfico de comparação entre semanas
   * @param {Array} semanasSelecionadas - Índices das semanas a comparar
   */
  renderizarGraficoComparativo(semanasSelecionadas) {
    if (!this.dados || !semanasSelecionadas || semanasSelecionadas.length === 0)
      return;

    const ctx = document.getElementById("grafico-comparativo").getContext("2d");

    // Destruir gráfico anterior se existir
    if (this.graficoComparativo) {
      this.graficoComparativo.destroy();
    }

    // Filtrar apenas as semanas selecionadas
    const dadosFiltrados = semanasSelecionadas.map((idx) => this.dados[idx]);

    // Preparar dados para o gráfico
    const labels = ["Volume", "Intensidade", "RIR", "Tonelagem"];
    const datasets = dadosFiltrados.map((semana, idx) => {
      // Calcular tonelagem
      const tonelagem = parseFloat(
        (((semana.volume * semana.intensidade) / 100) * 10).toFixed(1)
      );

      return {
        label: `Semana ${semana.semana} (${semana.tipoSemana})`,
        data: [semana.volume, semana.intensidade, semana.rir, tonelagem],
        backgroundColor: `rgba(${75 + idx * 50}, ${192 - idx * 30}, ${
          192 - idx * 30
        }, 0.6)`,
        borderColor: `rgba(${75 + idx * 50}, ${192 - idx * 30}, ${
          192 - idx * 30
        }, 1)`,
        borderWidth: 1,
      };
    });

    // Criar novo gráfico
    this.graficoComparativo = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: false,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
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
document.addEventListener("DOMContentLoaded", () => {
  window.graficosTreino = new GraficosTreino();
  window.graficosTreino.inicializar();

  // Adicionar listener para o botão de gerar plano
  const gerarPlanoBtn = document.getElementById("gerarPlano");
  if (gerarPlanoBtn) {
    const gerarPlanoOriginal = gerarPlanoBtn.onclick;

    gerarPlanoBtn.onclick = function () {
      const nivel = document.getElementById("nivel").value;
      const objetivo = document.getElementById("objetivo").value;
      const semanas = parseInt(document.getElementById("semanas").value);
      const modeloPeriodizacao =
        document.querySelector(".modelo-btn.active")?.dataset.modelo ||
        "linear";

      // Gerar progressão conforme modelo selecionado
      let progressao = [];

      if (modeloPeriodizacao === "linear" && window.periodizacao) {
        progressao = window.periodizacao.gerarProgressaoAutomatica(
          nivel,
          objetivo,
          semanas
        );
      } else if (
        modeloPeriodizacao === "ondulatoria_diaria" &&
        window.periodizacaoAvancada
      ) {
        progressao =
          window.periodizacaoAvancada.gerarProgressaoOndulatoriaDiaria(
            nivel,
            objetivo,
            semanas
          );
      } else if (
        modeloPeriodizacao === "blocos_conjugados" &&
        window.periodizacaoAvancada
      ) {
        progressao =
          window.periodizacaoAvancada.gerarProgressaoBlocosConjugados(
            nivel,
            objetivo,
            semanas
          );
      }

      // Atualizar gráficos
      if (window.graficosTreino && progressao.length > 0) {
        window.graficosTreino.atualizarDados(progressao);
      }

      // Executar função original se existir
      if (typeof gerarPlanoOriginal === "function") {
        gerarPlanoOriginal.call(this);
      }

      // Garantir que o volume por grupo muscular seja atualizado
      setTimeout(() => {
        if (window.bancoExercicios) {
          window.bancoExercicios.atualizarSeletoresSemana();
          atualizarVolumeGruposMuscularesUI();
        }
      }, 500);
    };
  }

  // Adicionar listener para o botão de exportar gráfico
  const exportarGraficoBtn = document.querySelector(".exportar-grafico");
  if (exportarGraficoBtn) {
    exportarGraficoBtn.addEventListener("click", () => {
      if (window.graficosTreino) {
        const imgUrl = window.graficosTreino.exportarGraficoComoImagem();
        if (imgUrl) {
          const link = document.createElement("a");
          link.href = imgUrl;
          link.download = `grafico_${window.graficosTreino.tipoAtual}.png`;
          link.click();
        }
      }
    });
  }
});
