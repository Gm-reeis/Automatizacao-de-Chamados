const baseConhecimento = [
  {
    titulo: "Erro ao gerar relatório",
    palavrasChave: ["relatório", "gerar", "erro"],
    solucao: "1. Verifique se os filtros estão corretamente preenchidos.\n2. Confirme se há dados disponíveis para o período selecionado.\n3. Tente gerar o relatório em outro navegador."
  },
  {
    titulo: "Impressora não responde",
    palavrasChave: ["impressora", "impressão", "não imprime"],
    solucao: "1. Certifique-se de que a impressora está ligada e conectada.\n2. Verifique se há papel e tinta disponíveis.\n3. Reinicie o serviço de spooler de impressão."
  },
  {
    titulo: "Erro de permissão ao acessar módulo",
    palavrasChave: ["acesso negado", "permissão", "módulo"],
    solucao: "1. Confirme se o usuário tem perfil de acesso ao módulo.\n2. Verifique se o módulo está habilitado para a empresa.\n3. Refaça o login e tente novamente."
  },
  {
    titulo: "Backup não está sendo realizado",
    palavrasChave: ["backup", "cópia de segurança", "falha"],
    solucao: "1. Verifique se há espaço suficiente no destino do backup.\n2. Confirme se o serviço de backup está ativo.\n3. Consulte os logs para identificar o erro."
  },
  {
    titulo: "Sistema fecha sozinho",
    palavrasChave: ["fechando", "crash", "encerrando"],
    solucao: "1. Solicite que atualize o sistema para a versão mais recente.\n2. Verifique se há conflitos com o antivírus.\n3. Analise os arquivos de log para encontrar a causa."
  },
  {
    titulo: "Erro ao emitir nota fiscal",
    palavrasChave: ["nota fiscal", "NFe", "erro emissão"],
    solucao: "1. Confirme os dados do cliente e da empresa.\n2. Verifique se a SEFAZ está fora do ar.\n3. Atualize o certificado digital se necessário."
  },
  {
    titulo: "Campo obrigatório não aceita preenchimento",
    palavrasChave: ["campo obrigatório", "erro ao preencher", "formulário"],
    solucao: "1. Verifique o formato exigido para o campo.\n2. Confirme se o navegador não está bloqueando scripts.\n3. Teste em outro navegador ou limpe o cache."
  },
  {
    titulo: "Erro 500 ao acessar sistema",
    palavrasChave: ["erro 500", "servidor", "acesso"],
    solucao: "1. Tente acessar novamente após alguns minutos.\n2. Verifique se o servidor está online.\n3. Consulte a equipe técnica se o erro persistir."
  },
  {
    titulo: "Usuário não consegue alterar senha",
    palavrasChave: ["senha", "alterar", "erro senha"],
    solucao: "1. Verifique se a senha atende aos critérios mínimos.\n2. Confirme se o usuário está logado corretamente.\n3. Tente a troca via outro dispositivo."
  },
  {
    titulo: "Integração com sistema externo falhou",
    palavrasChave: ["integração", "API", "falha externa"],
    solucao: "1. Verifique se o token de autenticação está válido.\n2. Confirme se o sistema externo está operacional.\n3. Consulte os logs de integração."
  },
  {
    titulo: "Erro ao carregar imagens no sistema",
    palavrasChave: ["imagens", "upload", "carregamento"],
    solucao: "1. Verifique o formato e tamanho do arquivo.\n2. Confirme a conexão com a internet.\n3. Tente realizar o upload em outro navegador."
  },
  {
    titulo: "Faturas não aparecem na tela de cobrança",
    palavrasChave: ["faturas", "cobrança", "não aparecem"],
    solucao: "1. Confirme se há faturas geradas para o período.\n2. Verifique se há filtros ativos na tela.\n3. Atualize a página e tente novamente."
  },
  {
    titulo: "Falha na atualização automática",
    palavrasChave: ["atualização", "update", "erro ao atualizar"],
    solucao: "1. Verifique a conexão com a internet.\n2. Execute o sistema como administrador.\n3. Realize a atualização manualmente se necessário."
  },
  {
    titulo: "Sistema não reconhece dispositivo USB",
    palavrasChave: ["usb", "dispositivo", "não reconhece"],
    solucao: "1. Conecte o dispositivo em outra porta USB.\n2. Verifique os drivers instalados.\n3. Reinicie o computador e tente novamente."
  },
    {
    titulo: "ERRO",
    palavrasChave: ["Erro"],
    solucao: "ERRO"
  },
  {
    titulo: "Erro de sincronização com banco de dados",
    palavrasChave: ["sincronização", "banco de dados", "erro sync"],
    solucao: "1. Confirme se o banco está acessível.\n2. Verifique se há bloqueios por firewall.\n3. Tente forçar a sincronização manualmente."
  }
];

const resultadosDiv = document.getElementById("resultados");

mostrarResultados(baseConhecimento);

document.getElementById("search").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  if (termo === "") {
    mostrarResultados(baseConhecimento);
  } else {
    const resultadosFiltrados = baseConhecimento.filter(item =>
      item.palavrasChave.some(p => termo.includes(p)) ||
      item.titulo.toLowerCase().includes(termo)
    );
    mostrarResultados(resultadosFiltrados);
  }
});

function mostrarResultados(lista) {
  resultadosDiv.innerHTML = "";

  if (lista.length === 0) {
    resultadosDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  lista.forEach(item => {
    const div = document.createElement("div");
    div.className = "resultado";
    div.innerHTML = `
    <strong>${item.titulo}</strong><pre>${item.solucao}</pre>`;
    resultadosDiv.appendChild(div);
  });
}