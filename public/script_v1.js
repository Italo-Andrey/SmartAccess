// Espera o DOM carregar antes de rodar qualquer código
document.addEventListener("DOMContentLoaded", function () {
    
    // Verifica se a página é o cadastro de cliente (index.html)
    if (window.location.pathname.includes('index.html')) {
        // Página de cadastro de cliente
        const formCadastro = document.getElementById('formCadastro');

        formCadastro.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio do formulário

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

            // Redireciona para a página de cadastro da tag
            window.location.href = '/cadastro_tag.html';  // Caminho absoluto para evitar problemas
        });
    }
    
    // Se estivermos na página cadastro_tag.html
    if (window.location.pathname.includes('cadastro_tag.html')) {
        const formTag = document.getElementById('formTag');

        formTag.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio do formulário

            // Coleta os dados da tag
            const tagCliente = document.getElementById('tag_cliente').value;

            // Recupera os dados do cliente armazenados no localStorage
            const clientData = JSON.parse(localStorage.getItem('clientData'));
            
            if (!clientData) {
                alert("Dados do cliente não encontrados. Redirecionando para cadastro.");
                window.location.href = '/index.html'; // Caminho absoluto para redirecionamento
                return;
            }

            // Prepara os dados para a requisição
            const requestData = {
                sobrenome_cliente: clientData.sobrenome_cliente,
                nome_cliente: clientData.nome_cliente,
                cpf_cliente: clientData.cpf_cliente,
                id_tag: tagCliente
            };

            // Faz a requisição POST com os dados combinados
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(requestData);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:4000/create", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    alert("Tag cadastrada com sucesso!");
                    localStorage.removeItem('clientData'); // Limpa os dados do cliente após o envio
                    window.location.href = '/index.html';  // Redireciona de volta para o início
                })
                .catch(error => {
                    console.error("Erro ao cadastrar a tag:", error);
                    alert("Erro ao cadastrar a tag. Tente novamente.");
                });
        });
    }
});
