// GUARDANDO O FORM
const formCadastro = document.querySelector(".login__form");

formCadastro.addEventListener("submit", (event) => {

    event.preventDefault();

    const emailCadastro = document.getElementById("login-email").value.toLowerCase();
    localStorage.setItem("email_cadastro", emailCadastro)
    
    const passwordCadastro = document.getElementById("login-pass").value
    
    const passwordCadastroConfirm = document.getElementById("login-pass-confirm").value
    
    
    if (passwordCadastro === passwordCadastroConfirm) {
        alert("Cadastro realizado com sucesso!");
        localStorage.setItem("password_cadastro", passwordCadastro)
        window.location.href = "../index.html";
        
   } else {
        alert("As senhas são diferentes!")
   }
});