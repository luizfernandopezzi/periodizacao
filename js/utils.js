/**
 * Utilitários para o App de Divisão de Treino
 */

/**
 * Classe para gerenciar exportação e importação de planos
 */
class GerenciadorPlanos {
  /**
   * Exporta o plano atual para um arquivo JSON
   * @param {string} nomePlano - Nome do plano
   * @param {Object} dadosPlano - Dados do plano a serem exportados
   */
  exportarPlano(nomePlano, dadosPlano) {
    if (!nomePlano || !dadosPlano) {
      this.mostrarNotificacao('Erro ao exportar plano. Verifique os dados.', 'error');
      return;
    }
    
    try {
      // Criar objeto com todos os dados do plano
      const planoData = {
        nome: nomePlano,
        nivel: dadosPlano.nivel,
        frequencia: dadosPlano.frequencia,
        objetivo: dadosPlano.objetivo,
        divisao: dadosPlano.divisao,
        semanas: dadosPlano.semanas,
        conteudo: dadosPlano.conteudo,
        progressao: dadosPlano.progressao || [],
        dataCriacao: new Date().toISOString(),
        versao: "1.0"
      };
      
      // Converter para JSON e criar blob
      const blob = new Blob([JSON.stringify(planoData, null, 2)], {type: 'application/json'});
      
      // Criar link para download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `plano_${nomePlano.replace(/\s+/g, '_')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      this.mostrarNotificacao('Plano exportado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao exportar plano:', error);
      this.mostrarNotificacao('Erro ao exportar plano. Tente novamente.', 'error');
    }
  }
  
  /**
   * Importa um plano a partir de um arquivo JSON
   * @param {Function} callback - Função de callback para processar o plano importado
   */
  importarPlano(callback) {
    try {
      // Criar input file invisível
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      
      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = event => {
          try {
            const planoData = JSON.parse(event.target.result);
            
            // Verificar se é um arquivo de plano válido
            if (!planoData.nome || !planoData.conteudo) {
              this.mostrarNotificacao('Arquivo de plano inválido.', 'error');
              return;
            }
            
            // Chamar callback com os dados do plano
            if (callback && typeof callback === 'function') {
              callback(planoData);
            }
            
            this.mostrarNotificacao('Plano importado com sucesso!', 'success');
          } catch (error) {
            console.error("Erro ao importar plano:", error);
            this.mostrarNotificacao('Erro ao importar o arquivo. Verifique se é um arquivo de plano válido.', 'error');
          }
        };
        
        reader.readAsText(file);
      };
      
      input.click();
    } catch (error) {
      console.error('Erro ao importar plano:', error);
      this.mostrarNotificacao('Erro ao importar plano. Tente novamente.', 'error');
    }
  }
  
  /**
   * Mostra uma notificação na interface
   * @param {string} mensagem - Mensagem a ser exibida
   * @param {string} tipo - Tipo de notificação ('success', 'error')
   */
  mostrarNotificacao(mensagem, tipo = 'success') {
    // Verificar se já existe uma notificação
    let notificacao = document.querySelector('.notification');
    
    // Se não existir, criar uma nova
    if (!notificacao) {
      notificacao = document.createElement('div');
      notificacao.className = 'notification';
      document.body.appendChild(notificacao);
    }
    
    // Definir classe e mensagem
    notificacao.className = `notification ${tipo}`;
    notificacao.textContent = mensagem;
    
    // Mostrar notificação
    setTimeout(() => {
      notificacao.classList.add('show');
    }, 10);
    
    // Ocultar após 3 segundos
    setTimeout(() => {
      notificacao.classList.remove('show');
    }, 3000);
  }
}

/**
 * Classe para gerenciar funcionalidades de PWA
 */
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.installButton = null;
  }
  
  /**
   * Inicializa o gerenciador de PWA
   */
  init() {
    // Verificar se o botão de instalação existe
    this.installButton = document.getElementById('installPWA');
    
    if (!this.installButton) {
      // Criar botão de instalação
      this.installButton = document.createElement('button');
      this.installButton.id = 'installPWA';
      this.installButton.textContent = 'Instalar App';
      document.body.appendChild(this.installButton);
    }
    
    // Ocultar botão inicialmente
    this.installButton.style.display = 'none';
    
    // Adicionar listener para o evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevenir o comportamento padrão
      e.preventDefault();
      
      // Armazenar o evento para uso posterior
      this.deferredPrompt = e;
      
      // Mostrar o botão de instalação
      this.installButton.style.display = 'block';
    });
    
    // Adicionar listener para o botão de instalação
    this.installButton.addEventListener('click', () => {
      // Ocultar o botão
      this.installButton.style.display = 'none';
      
      // Mostrar o prompt de instalação
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        
        // Aguardar a resposta do usuário
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação do PWA');
          } else {
            console.log('Usuário recusou a instalação do PWA');
          }
          
          // Limpar a referência
          this.deferredPrompt = null;
        });
      }
    });
    
    // Adicionar listener para o evento appinstalled
    window.addEventListener('appinstalled', (evt) => {
      console.log('App instalado com sucesso!');
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar gerenciador de planos
  window.gerenciadorPlanos = new GerenciadorPlanos();
  
  // Inicializar gerenciador de PWA
  window.pwaManager = new PWAManager();
  window.pwaManager.init();
});
