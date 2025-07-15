
  document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formChamado')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;

    const prioridades = ['Baixa', 'Media', 'Alta', 'Urgente'];
    const prioridadeSelecionada = prioridades.filter(p => document.getElementById(p).checked).join(', ');

    const chamado = { nome, email, tipo, descricao, prioridade: prioridadeSelecionada };

    await fetch('http://localhost:3000/api/chamados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chamado)
    });

    document.getElementById('confirmacao').style.display = 'block';
    this.reset();
    carregarChamados();
  });

  async function carregarChamados() {
    console.log("Chamados sendo carregados...");
    const res = await fetch('http://localhost:3000/api/chamados');
    const chamados = await res.json();

    const container = document.getElementById('listaChamados');
    container.innerHTML = '';

      chamados.forEach(chamado => {
      const card = document.createElement('div');
      card.style.border = '1px solid #ccc';
      card.style.borderRadius = '10px';
      card.style.padding = '15px';
      card.style.backgroundColor = '#f9f9f9';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      card.style.position = 'relative';

      card.setAttribute('data-prioridade', chamado.prioridade);
      card.setAttribute('data-problema', chamado.tipo);

      const etiqueta = document.createElement('div');
      etiqueta.style.position = 'absolute';
      etiqueta.style.bottom = '0px';
      etiqueta.style.right = '0px';
      etiqueta.style.width = '100%';
      etiqueta.style.height = '15px';
      etiqueta.style.borderRadius = '1px';

      switch (chamado.prioridade.toLowerCase()) {
        case 'urgente':
          etiqueta.style.backgroundColor = 'red';
          break;
        case 'alta':
          etiqueta.style.backgroundColor = 'orange';
          break;
        case 'media':
          etiqueta.style.backgroundColor = 'yellow';
          break;
        case 'baixa':
          etiqueta.style.backgroundColor = 'limegreen';
          break;
        default:
          etiqueta.style.backgroundColor = 'gray';
      }

      card.innerHTML = `
        <h3 style="margin: 0 0 10px;">${chamado.tipo}</h3>
        <img src="img/excluir.png" alt="Excluir chamado" class="btn-excluir" data-id="${chamado.id}" 
        style="max-width: 30px; position: absolute;top: 10px;right: 10px;cursor:pointer;">
        <p><strong>Nome:</strong> ${chamado.nome}</p>
        <p><strong>Email:</strong> ${chamado.email}</p>
        <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
        <p><strong>Descrição:</strong><br>${chamado.descricao}</p>
        <p style="font-size: 12px; color: #777;">${chamado.data || ''}</p>
      `;

      card.appendChild(etiqueta);
      container.appendChild(card);

      const botaoExcluir = card.querySelector('.btn-excluir');
      botaoExcluir.addEventListener('click', async () => {
        const confirmado = confirm("Tem certeza que deseja excluir este chamado?");
        if (!confirmado) return;

        const id = botaoExcluir.getAttribute('data-id');
        const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
          method: 'DELETE'
        });

        if (resposta.ok) {
          card.remove();
        } else {
          alert('Erro ao excluir chamado do banco.');
        }
      });
    });

    filtrarChamados();
  }
  document.getElementById('btnAtualizar')?.addEventListener('click', carregarChamados);
  document.getElementById("filtroPri").addEventListener("change", filtrarChamados);
  document.getElementById("filtroPro").addEventListener("change", filtrarChamados);

  function filtrarChamados() {
    const prioridadeSelecionada = document.getElementById("filtroPri").value;
    const problemaSelecionado = document.getElementById("filtroPro").value;

    const chamados = document.querySelectorAll("#listaChamados > div");

    chamados.forEach(chamado => {
      const prioridade = chamado.getAttribute("data-prioridade");
      const problema = chamado.getAttribute("data-problema");

      const matchPrioridade = (prioridadeSelecionada === "Todos" || prioridade === prioridadeSelecionada);
      const matchProblema = (problemaSelecionado === "Todos" || problema === problemaSelecionado);

      chamado.style.display = (matchPrioridade && matchProblema) ? "block" : "none";
    });
  }

  carregarChamados();
});

