const freqSelect = document.getElementById("frequencia");
const objSelect = document.getElementById("objetivo");
const divSelect = document.getElementById("divisao");
const nivelSelect = document.getElementById("nivel");
const semanasSelect = document.getElementById("semanas");
const nomePlanoInput = document.getElementById("planoNome");
const resultadoDiv = document.getElementById("resultado");
const gerarPlanoBtn = document.getElementById("gerarPlano");
const salvarPlanoBtn = document.getElementById("salvarPlano");
const carregarPlanoBtn = document.getElementById("carregarPlano");
const excluirPlanoBtn = document.getElementById("excluirPlano");
const exportarPlanoBtn = document.getElementById("exportarPlano");
const importarPlanoBtn = document.getElementById("importarPlano");
const listaHistorico = document.getElementById("listaHistorico");
const progressaoContainer = document.getElementById("progressao-container");
const graficosContainer = document.getElementById("graficos-container");
const volumeContainer = document.getElementById("volume-container");

let divisoes = [];
let progressao = [];

function atualizarFrequenciasDisponiveis() {
  const nivel = nivelSelect.value;
  const freqSet = new Set();

  divisoes.forEach((item) => {
    if (item.nivel === nivel) {
      freqSet.add(item.frequencia);
    }
  });

  freqSelect.innerHTML = "";
  [...freqSet]
    .sort((a, b) => a - b)
    .forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f;
      opt.text = `${f}x por semana`;
      freqSelect.appendChild(opt);
    });

  if (freqSelect.options.length > 0) {
    freqSelect.selectedIndex = 0;
    atualizarDivisoes();
  }
}

fetch("data/dados.json?cachebuster=" + new Date().getTime())
  .then((response) => response.json())
  .then((data) => {
    divisoes = data;
    atualizarFrequenciasDisponiveis();
    atualizarDivisoes();
    atualizarHistorico();
  });

nivelSelect.addEventListener("change", () => {
  atualizarFrequenciasDisponiveis();
});

function atualizarHistorico() {
  listaHistorico.innerHTML =
    '<option value="">-- Selecione um plano salvo --</option>';
  let possuiPlanos = false;
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("plano_")) {
      possuiPlanos = true;
      const nome = key.replace("plano_", "");
      const opt = document.createElement("option");
      opt.value = nome;
      opt.text = nome;
      listaHistorico.appendChild(opt);
    }
  });
  carregarPlanoBtn.style.display = possuiPlanos ? "inline-block" : "none";
  excluirPlanoBtn.style.display = possuiPlanos ? "inline-block" : "none";
}

function atualizarDivisoes() {
  const nivel = nivelSelect.value;
  const freq = parseInt(freqSelect.value);
  const obj = objSelect.value;
  resultadoDiv.innerHTML = "";

  divSelect.innerHTML = `<option value="">-- Selecione --</option>`;

  const resultados = divisoes.filter(
    (item) =>
      item.nivel === nivel && item.frequencia === freq && item.objetivo === obj
  );

  if (resultados.length > 0) {
    resultados.forEach((entry) => {
      entry.divisoes.forEach((div) => {
        const opt = document.createElement("option");
        opt.value = div;
        opt.text = div;
        divSelect.appendChild(opt);
      });
    });
  } else {
    const opt = document.createElement("option");
    opt.text = "Sem divisões disponíveis";
    divSelect.appendChild(opt);
  }
}

// Função para renderizar gráfico de ondulação diária
function renderizarGraficoOndulatoriaDiaria(progressao) {
  console.log("antes progressao");
  console.log(progressao);
  console.log("oi");
  if (!Array.isArray(progressao) || progressao.length === 0) return;

  const todosOsDias = [];

  progressao.forEach((semana) => {
    if (semana.diasVariacao && Array.isArray(semana.diasVariacao)) {
      semana.diasVariacao.forEach((dia) => {
        todosOsDias.push({
          label: `Semana ${semana.semana} - Dia ${dia.dia}`,
          volume: dia.volume,
          intensidade: dia.intensidade,
        });
      });
    }
  });

  const labels = todosOsDias.map((d) => d.label);
  const volumes = todosOsDias.map((d) => d.volume);
  const intensidades = todosOsDias.map((d) => d.intensidade);

  console.log("✅ Labels:", labels);
  console.log("✅ Volumes:", volumes);
  console.log("✅ Intensidades:", intensidades);
  console.log("✅ Total de dias gerados:", todosOsDias.length);

  const ctx = document.getElementById("ondulacao-chart").getContext("2d");

  if (window.ondulacaoChart) {
    window.ondulacaoChart.destroy();
  }

  window.ondulacaoChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Volume (séries)",
          data: volumes,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          yAxisID: "y",
          tension: 0.1,
        },
        {
          label: "Intensidade (%1RM)",
          data: intensidades,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          yAxisID: "y1",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Volume (séries)",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Intensidade (%1RM)",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  });

  return todosOsDias;
}

gerarPlanoBtn.addEventListener("click", () => {
  const nivel = nivelSelect.value;
  const freq = freqSelect.value;
  const obj = objSelect.value;
  const divisao = divSelect.value;
  const semanas = parseInt(semanasSelect.value);

  // Mostrar/ocultar elementos específicos de cada modelo
  document.getElementById("blocos-legenda").style.display =
    modeloAtual === "blocos_conjugados" ? "flex" : "none";

  document.getElementById("ondulacao-chart-container").style.display =
    modeloAtual === "ondulatoria_diaria" ? "block" : "none";

  // Verificação dos inputs
  if (!nivel || !freq || !obj || !divisao) {
    resultadoDiv.innerHTML =
      "<p>Por favor, selecione todas as opções antes de gerar o plano.</p>";
    return;
  }

  // Mostrar loader
  document.getElementById("loader").style.display = "block";

  if (window.modeloAtual === "linear" && window.periodizacao) {
    progressao = window.periodizacao.gerarProgressaoAutomatica(
      nivel,
      obj,
      semanas
    );
    window.periodizacao.exibirTabelaProgressao(progressao);
  } else if (
    window.modeloAtual === "ondulatoria_diaria" &&
    window.periodizacaoAvancada
  ) {
    progressao = window.periodizacaoAvancada.gerarProgressaoOndulatoriaDiaria(
      nivel,
      obj,
      semanas
    );
    window.periodizacaoAvancada.exibirTabelaProgressaoOndulatoria(progressao);

    // Renderizar gráfico de ondulação diária se houver dados
    if (progressao.length > 0) {
      renderizarGraficoOndulatoriaDiaria(progressao);
    }
  } else if (
    window.modeloAtual === "blocos_conjugados" &&
    window.periodizacaoAvancada
  ) {
    progressao = window.periodizacaoAvancada.gerarProgressaoBlocosConjugados(
      nivel,
      obj,
      semanas
    );
    window.periodizacaoAvancada.exibirTabelaProgressaoBlocos(progressao);
  }

  // Mostrar containers
  progressaoContainer.style.display = "block";
  graficosContainer.style.display = "block";
  volumeContainer.style.display = "block";

  const dias = divisao.split(",").map((item) => item.trim());

  let html = `<h2>Plano de Treino (${semanas} Semanas)</h2>`;

  for (let semana = 1; semana <= semanas; semana++) {
    // Obter dados de progressão para a semana
    const dadosProgressao = progressao[semana - 1] || {};
    const tipoSemana = dadosProgressao.tipoSemana || "";
    const volume = dadosProgressao.volume || "";
    const intensidade = dadosProgressao.intensidade || "";
    const rir = dadosProgressao.rir || "";
    const descricao = dadosProgressao.descricao || "";

    console.log(`Semana ${semana}`, {
      volume,
      intensidade,
      rir,
      tipoSemana,
      descricao,
    });

    html += `
    <div class="semana-container" data-semana="${semana}">
      <div class="semana-header">
        <h3>Semana ${semana} ${tipoSemana ? `- ${tipoSemana}` : ""}</h3>
        <input class="bloco-editavel" placeholder="Título da semana" 
               value="${
                 tipoSemana === "Deload"
                   ? "Semana de Recuperação"
                   : tipoSemana === "Pico"
                   ? "Semana de Pico"
                   : tipoSemana === "Acumulação"
                   ? "Semana de Acumulação"
                   : tipoSemana === "Intensificação"
                   ? "Semana de Intensificação"
                   : `Semana ${semana}`
               }"/>
        <div class="parametros-semana">
          ${
            volume
              ? `<span class="badge volume">Volume: ${volume} séries/grupo</span>`
              : ""
          }
          ${
            intensidade
              ? `<span class="badge intensidade">Intensidade: ${intensidade}% 1RM</span>`
              : ""
          }
          ${
            rir !== undefined
              ? `<span class="badge rir">RIR: ${rir}</span>`
              : ""
          }
        </div>
        <textarea class="semana-descricao" placeholder="Notas ou descrição da semana ${semana}">${descricao}</textarea>
      </div>
      <table>
        <thead><tr><th>Dia</th><th>Divisão</th><th>Exercícios</th></tr></thead>
        <tbody>
    `;
    dias.forEach((divisao, index) => {
      html += `
        <tr>
          <td>Dia ${index + 1}</td>
          <td>${divisao}</td>
          <td>
            <div class="exercicios-container">
              <select class="exercicio-selector" multiple data-divisao="${divisao}">
                <!-- Preenchido via JavaScript -->
              </select>
              <button class="adicionar-exercicio">+</button>
              <div class="exercicios-selecionados">
                <!-- Lista de exercícios selecionados -->
              </div>
            </div>
          </td>
        </tr>
      `;
    });
    html += `</tbody></table></div><br/>`;
  }

  resultadoDiv.innerHTML = html;
  salvarPlanoBtn.style.display = "inline-block";
  exportarPlanoBtn.style.display = "inline-block";

  gerarAnaliseTecnica(nivel, parseInt(freq), obj, divisao);

  // Preencher seletores de exercícios após renderizar o HTML
  setTimeout(() => {
    if (window.bancoExercicios) {
      document.querySelectorAll(".exercicio-selector").forEach((selector) => {
        const divisao = selector.dataset.divisao;
        window.bancoExercicios.preencherSeletorExercicios(selector, divisao);
      });
    }

    // Ocultar loader
    document.getElementById("loader").style.display = "none";
  }, 500);
});

salvarPlanoBtn.addEventListener("click", () => {
  const nomePlano = nomePlanoInput.value.trim();
  if (!nomePlano || resultadoDiv.innerHTML.trim() === "") {
    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.mostrarNotificacao(
        "Dê um nome ao plano e gere o plano antes de salvar.",
        "error"
      );
    } else {
      alert("Dê um nome ao plano e gere o plano antes de salvar.");
    }
    return;
  }

  const clone = resultadoDiv.cloneNode(true);
  const textareas = clone.querySelectorAll("textarea");
  textareas.forEach((ta) => {
    const value = ta.value;
    const newTa = document.createElement("textarea");
    newTa.textContent = value;
    ta.replaceWith(newTa);
  });

  const inputs = clone.querySelectorAll("input.bloco-editavel");
  inputs.forEach((input) => {
    const val = input.value;
    const newInput = document.createElement("input");
    newInput.setAttribute("class", "bloco-editavel");
    newInput.setAttribute("value", val);
    input.replaceWith(newInput);
  });

  localStorage.setItem(`plano_${nomePlano}`, clone.innerHTML);

  if (window.gerenciadorPlanos) {
    window.gerenciadorPlanos.mostrarNotificacao(
      "Plano salvo com sucesso!",
      "success"
    );
  } else {
    alert("Plano salvo com sucesso.");
  }

  atualizarHistorico();
});

carregarPlanoBtn.addEventListener("click", () => {
  const nomePlano = nomePlanoInput.value.trim();
  if (!nomePlano) {
    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.mostrarNotificacao(
        "Informe o nome do plano que deseja carregar.",
        "error"
      );
    } else {
      alert("Informe o nome do plano que deseja carregar.");
    }
    return;
  }
  const planoSalvo = localStorage.getItem(`plano_${nomePlano}`);
  if (planoSalvo) {
    resultadoDiv.innerHTML = planoSalvo;

    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.mostrarNotificacao(
        "Plano carregado com sucesso!",
        "success"
      );
    } else {
      alert("Plano carregado com sucesso.");
    }

    salvarPlanoBtn.style.display = "inline-block";
    exportarPlanoBtn.style.display = "inline-block";

    // Mostrar containers
    progressaoContainer.style.display = "block";
    graficosContainer.style.display = "block";
    volumeContainer.style.display = "block";

    // Preencher seletores de exercícios após carregar o plano
    setTimeout(() => {
      if (window.bancoExercicios) {
        document.querySelectorAll(".exercicio-selector").forEach((selector) => {
          const divisao = selector.dataset.divisao;
          window.bancoExercicios.preencherSeletorExercicios(selector, divisao);
        });
      }
    }, 500);
  } else {
    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.mostrarNotificacao(
        "Nenhum plano encontrado com esse nome.",
        "error"
      );
    } else {
      alert("Nenhum plano encontrado com esse nome.");
    }
  }
});

excluirPlanoBtn.addEventListener("click", () => {
  const nomePlano = nomePlanoInput.value.trim();
  if (!nomePlano) {
    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.mostrarNotificacao(
        "Informe o nome do plano que deseja excluir.",
        "error"
      );
    } else {
      alert("Informe o nome do plano que deseja excluir.");
    }
    return;
  }
  if (confirm(`Deseja realmente excluir o plano "${nomePlano}"?`)) {
    localStorage.removeItem(`plano_${nomePlano}`);
    resultadoDiv.innerHTML = "";
    salvarPlanoBtn.style.display = "none";
    exportarPlanoBtn.style.display = "none";
    nomePlanoInput.value = "";
    atualizarHistorico();

    // Ocultar containers
    progressaoContainer.style.display = "none";
    graficosContainer.style.display = "none";
    volumeContainer.style.display = "none";

    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.mostrarNotificacao(
        "Plano excluído com sucesso!",
        "success"
      );
    } else {
      alert("Plano excluído com sucesso.");
    }
  }
});

listaHistorico.addEventListener("change", () => {
  const nomeSelecionado = listaHistorico.value;
  if (nomeSelecionado) {
    nomePlanoInput.value = nomeSelecionado;
    const planoSalvo = localStorage.getItem(`plano_${nomeSelecionado}`);
    if (planoSalvo) {
      resultadoDiv.innerHTML = planoSalvo;
      salvarPlanoBtn.style.display = "inline-block";
      exportarPlanoBtn.style.display = "inline-block";

      // Mostrar containers
      progressaoContainer.style.display = "block";
      graficosContainer.style.display = "block";
      volumeContainer.style.display = "block";

      // Preencher seletores de exercícios após carregar o plano
      setTimeout(() => {
        if (window.bancoExercicios) {
          document
            .querySelectorAll(".exercicio-selector")
            .forEach((selector) => {
              const divisao = selector.dataset.divisao;
              window.bancoExercicios.preencherSeletorExercicios(
                selector,
                divisao
              );
            });
        }
      }, 500);
    }
  }
});

// Exportar plano
if (exportarPlanoBtn) {
  exportarPlanoBtn.addEventListener("click", () => {
    const nomePlano = nomePlanoInput.value.trim();
    if (!nomePlano || resultadoDiv.innerHTML.trim() === "") {
      if (window.gerenciadorPlanos) {
        window.gerenciadorPlanos.mostrarNotificacao(
          "Gere um plano antes de exportar.",
          "error"
        );
      } else {
        alert("Gere um plano antes de exportar.");
      }
      return;
    }

    // Criar objeto com dados do plano
    const dadosPlano = {
      nivel: nivelSelect.value,
      frequencia: parseInt(freqSelect.value),
      objetivo: objSelect.value,
      divisao: divSelect.value,
      semanas: parseInt(semanasSelect.value),
      conteudo: resultadoDiv.innerHTML,
      progressao: progressao,
    };

    // Exportar plano
    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.exportarPlano(nomePlano, dadosPlano);
    }
  });
}

// Importar plano
if (importarPlanoBtn) {
  importarPlanoBtn.addEventListener("click", () => {
    if (window.gerenciadorPlanos) {
      window.gerenciadorPlanos.importarPlano((planoData) => {
        // Preencher campos do formulário
        nomePlanoInput.value = planoData.nome;
        if (planoData.nivel) nivelSelect.value = planoData.nivel;
        if (planoData.objetivo) objSelect.value = planoData.objetivo;

        // Atualizar divisões disponíveis
        atualizarFrequenciasDisponiveis();

        // Definir frequência após atualizar as opções disponíveis
        setTimeout(() => {
          if (planoData.frequencia) {
            const freqOpt = Array.from(freqSelect.options).find(
              (opt) => parseInt(opt.value) === planoData.frequencia
            );
            if (freqOpt) freqSelect.value = freqOpt.value;
          }

          atualizarDivisoes();

          // Definir divisão após atualizar as opções disponíveis
          setTimeout(() => {
            if (planoData.divisao) {
              const divOpt = Array.from(divSelect.options).find(
                (opt) => opt.value === planoData.divisao
              );
              if (divOpt) divSelect.value = divOpt.value;
            }

            if (planoData.semanas) semanasSelect.value = planoData.semanas;

            // Carregar conteúdo do plano
            resultadoDiv.innerHTML = planoData.conteudo;
            salvarPlanoBtn.style.display = "inline-block";
            exportarPlanoBtn.style.display = "inline-block";

            // Carregar progressão
            if (planoData.progressao) {
              progressao = planoData.progressao;

              // Exibir tabela de progressão
              if (window.periodizacao) {
                window.periodizacao.exibirTabelaProgressao(progressao);
              }

              // Atualizar gráficos
              if (window.graficosTreino) {
                window.graficosTreino.atualizarDados(progressao);
              }
            }

            // Mostrar containers
            progressaoContainer.style.display = "block";
            graficosContainer.style.display = "block";
            volumeContainer.style.display = "block";

            // Preencher seletores de exercícios após carregar o plano
            setTimeout(() => {
              if (window.bancoExercicios) {
                document
                  .querySelectorAll(".exercicio-selector")
                  .forEach((selector) => {
                    const divisao = selector.dataset.divisao;
                    window.bancoExercicios.preencherSeletorExercicios(
                      selector,
                      divisao
                    );
                  });
              }
            }, 500);
          }, 100);
        }, 100);
      });
    }
  });
}

function gerarAnaliseTecnica(nivel, frequencia, objetivo, divisao) {
  const analiseDiv = document.getElementById("analiseTecnica");
  if (!analiseDiv) return;

  let texto = "";

  if (objetivo === "hipertrofia") {
    const hasFB = divisao.includes("Full Body");
    const hasUpper = divisao.includes("Upper");
    const hasLower = divisao.includes("Lower");
    const hasPush = divisao.includes("Push");
    const hasPull = divisao.includes("Pull");
    const hasLegs = divisao.includes("Legs");

    if (hasFB && !hasUpper && !hasPush) {
      texto = `
        <h3>🔍 Análise Técnica da Divisão</h3>
        <p><strong>Divisão Full Body:</strong> estimula o corpo inteiro em cada sessão, ideal para iniciantes e para alta frequência semanal com recuperação gerenciável.</p>
        <p>Favorece a prática de movimentos compostos, melhora a coordenação intermuscular e maximiza o volume semanal por grupo muscular.</p>
        <p><strong>Referência:</strong> Schoenfeld, 2010; Helms et al., 2016.</p>
      `;
    } else if (hasUpper && hasLower && !hasFB) {
      texto = `
        <h3>🔍 Análise Técnica da Divisão</h3>
        <p><strong>Divisão Upper/Lower:</strong> permite alternância entre segmentos, favorecendo a recuperação local e boa densidade de treino.</p>
        <p>É uma escolha robusta para intermediários com 3 a 5 dias de treino, possibilitando manipulação de volume entre partes superiores e inferiores.</p>
      `;
    } else if (hasLegs && hasPush && hasPull && !hasFB) {
      texto = `
        <h3>🔍 Análise Técnica da Divisão</h3>
        <p><strong>Divisão Legs/Push/Pull:</strong> estrutura avançada que separa padrões motores e facilita alta especificidade de estímulo.</p>
        <p>Favorece melhor distribuição do volume por grupo muscular e reduz overlap mecânico (evita treinar o mesmo músculo indiretamente em dias seguidos).</p>
      `;
    } else if (hasFB && (hasUpper || hasPush || hasLegs)) {
      texto = `
        <h3>🔍 Análise Técnica da Divisão</h3>
        <p><strong>Divisão Mista com Full Body:</strong> combina sessões de enfoque regional (como Upper/Lower ou Push/Pull) com dias de estímulo global (Full Body).</p>
        <p>Essa abordagem é eficaz para aumentar o volume semanal total, manter frequência elevada e garantir cobertura ampla dos grupos musculares.</p>
        <p><strong>Indicação:</strong> ideal para intermediários e avançados com 4 a 6 treinos/semana.</p>
      `;
    }
  }

  if (objetivo === "forca") {
    if (
      divisao.includes("S") &&
      divisao.includes("B") &&
      divisao.includes("D")
    ) {
      texto = `
        <h3>🔍 Análise Técnica da Divisão</h3>
        <p><strong>Divisão S/B/D:</strong> foca nos três principais levantamentos (Squat, Bench, Deadlift), com variações possíveis em frequência (2-6x por semana).</p>
        <p>Esta abordagem maximiza a proficiência técnica, volume específico e manipulação de carga para picos de força.</p>
        <p><strong>Referência:</strong> Rippetoe, Starting Strength; Greg Nuckols, Stronger By Science.</p>
      `;
    }
  }

  if (!texto) {
    texto = `
      <h3>🔍 Análise Técnica da Divisão</h3>
      <p>Divisão personalizada. Consulte um especialista para verificar a coerência entre volume, densidade e foco muscular.</p>
    `;
  }

  analiseDiv.innerHTML = texto;
}
