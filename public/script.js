import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, doc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyA_CJCyRKFpSab4bybDNYgVGsCOtzJSXbk",
    authDomain: "smartaccess-88ec0.firebaseapp.com",
    databaseURL: "https://smartaccess-88ec0-default-rtdb.firebaseio.com",
    projectId: "smartaccess-88ec0",
    storageBucket: "smartaccess-88ec0.firebasestorage.app",
    messagingSenderId: "685539814365",
    appId: "1:685539814365:web:0df58c59485e03b210e434",
    measurementId: "G-8QQG3R6CRH"
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Acessando o Firestore
const db = getFirestore(firebaseApp);

// Função para salvar dados no Firestore
async function saveClientData(data) {
    try {
        // Salva os dados no Firestore
        const Client = collection(db,"Cliente");
        await setDoc(doc(Client, data.nome_cliente), data, { merge: true });

        // Após salvar, exibe uma mensagem de sucesso e redireciona
        console.log("Documento salvo com sucesso");
        return true;
    } catch (erro) {
        // Em caso de erro, exibe uma mensagem
        console.error("Erro ao salvar documento:", erro);
        return false;
    }
}


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
                window.location.href = 'cadastro_tag.html';  // Redireciona para o endpoint desejado
            });
        }
    }

    const formTag = document.getElementById('formTag');

    if (formTag) {
        // Verifica se estamos na página de cadastro de tag
        if (window.location.pathname.includes('cadastro_tag')) {
    
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
                const data = JSON.parse(localStorage.getItem('clientData'));
                if(saveClientData(data)){
                    alert("Cadastro feito com sucesso!");
                }
                else{
                    alert("Cadastro não finalizado!");
                }

            });
        }
    }

});



