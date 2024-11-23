document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById('formCadastro');

    // Verifica se o formulário foi carregado corretamente
    if (formCadastro) {
        if(window.location.pathname.includes('/')) {

            formCadastro.addEventListener('submit', function (event) {
                event.preventDefault(); // Impede o envio do formulário e a recarga da página
    
                // Coleta os dados do formulário
                const sobrenome = document.getElementById('sobrenome_cliente').value;
                const nome = document.getElementById('nome_cliente').value;
                const cpf = document.getElementById('cpf_cliente').value;
    
                // Armazena os dados no localStorage
                const clientData = {
                    sobrenome_cliente: sobrenome,
                    nome_cliente: nome,
                    cpf_cliente: cpf
                };
                localStorage.setItem('clientData', JSON.stringify(clientData));
    
                // Redireciona para o endpoint de cadastro da tag
                window.location.href = '/cadastro-tag';  // Redireciona para o endpoint desejado
            });
        }
    }

    const formTag = document.getElementById('formTag');

    if (formTag) {
        // Verifica se estamos na página de cadastro de tag
        if (window.location.pathname.includes('cadastro-tag')) {
    
            // Quando o formulário de cadastro de tag for submetido
            formTag.addEventListener('submit', function (event) {
                event.preventDefault(); // Impede o envio do formulário
    
                // Recupera os dados do cliente armazenados no localStorage
                const clientData = JSON.parse(localStorage.getItem('clientData'));
    
                if (!clientData) {
                    alert("Dados do cliente não encontrados. Redirecionando para o cadastro.");
                    window.location.href = '/'; // Redireciona caso os dados não existam
                    return;
                }

                
                // Adiciona os dados da tag no objeto clientData
                clientData.id_tag =  document.getElementById('tag_cliente').value;
                
                // Armazena novamente os dados atualizados no localStorage
                localStorage.setItem('clientData', JSON.stringify(clientData));

                //Visualizar os dados do local storage
                console.log("Dados armazenados no localStorage:", clientData);

                //fluxo de cadastro no banco de dados com o endpoint /create
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(JSON.parse(localStorage.getItem('clientData'))), //DADOS DO LOCAL STORAGE
                    redirect: "follow"
                };

                fetch("http://localhost:4000/create", requestOptions)
                .then(response => {
                    // Verifica se o status da resposta é 202 (Accepted)
                    if (response.status === 202) {
                        return response.text(); // Se o status for 202, continua o fluxo e obtém a resposta como texto
                    } else {
                        // Se o status não for 202, tenta pegar o corpo da resposta (pode ser JSON ou texto)
                        return response.text().then(errorMessage => {
                            throw new Error(response.status + ' - ' + errorMessage);
                        });
                    }
                })
                .then(result => {
                    console.log(result);
                    alert("Cadastro feito com sucesso");
                    localStorage.removeItem('clientData'); // Limpa os dados do cliente após o envio
                    window.location.href = '/';  // Redireciona de volta para o início
                })
                .catch(error => {
                    console.error("Erro:", error);
                    // localStorage.removeItem('clientData'); // Limpa os dados do cliente após o envio
                    alert("Falha ao fazer o cadastro. Tente novamente.");
                });

            });
        }
    }

});
