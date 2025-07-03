//GUARDANDO O FORM
const formLogin = document.querySelector(".login__form");

let tentativas = 0

//Colocar um escutador de eventos no formLogin
formLogin.addEventListener("submit",(event) => {

    event.preventDefault();

    //guardar o valor do campo input do email em uma const chamada emailLogin
    const emailLogin = document.getElementById("login-email").value.toLowerCase();

    //guardar o valor do campo input do password em uma const chamada passwordLogin
    const passwordLogin = document.getElementById("login-pass").value;


    //recuperando dados do localstorage
    const emailCadastro = localStorage.getItem("email_cadastro");
    const passwordCadastro = localStorage.getItem("senha_cadastro");

    //Fazer validação das senhas
    if ( (emailLogin === emailCadastro) && (passwordLogin === passwordCadastro) ) {

        alert("Login realizado com sucesso!");
        window.location.href = "pages/logada.html";
    } else {

        if(emailLogin !== emailCadastro) {
            alert("Email incorreto!");
        
        }

        if(passwordLogin !== passwordCadastro) {
            alert("senha incorreta!");
        }

        tentativas++

        alert(`tentativa ${tentativas}/3`);

        if (tentativas === 3) {
            alert("Senha Bloqueada por excesso de tentativas!");
            window.location.href = "pages/recupera.html"
        }
    }
});