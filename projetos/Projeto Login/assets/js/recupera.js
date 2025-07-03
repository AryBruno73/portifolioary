const formRecupera = document.getElementById("recover-form");
const emailField = document.getElementById("email-field");
const emailInput = document.getElementById("recover-email");
const sendCodeButton = document.getElementById("send-code-button");
const codeEntrySection = document.getElementById("code-entry-section");
const verificationCodeInput = document.getElementById("verification-code");
const newPasswordInput = document.getElementById("login-pass");
const confirmNewPasswordInput = document.getElementById("login-pass-confirm");
const verifyCodeButton = document.getElementById("verify-code-button");

let generateCode = "";


//Função para gerar um código aleatório de 6 digítos númericos
function generateRandomCode() {
    return Math.floor(Math.random() * 1000000).toString();

}

//Ouvinte de evento para o botão sendCodeButton
sendCodeButton.addEventListener("click", (event) => {

    event.preventDefault();

    const emailRecover = emailInput.value;

    if (!emailRecover) {
        alert("Por favor, digite seu e-mail para continuar.");
        return;
    }

    const emailCadastrado = localStorage.getItem("email_cadastro");

    if (emailCadastrado === emailRecover.toLowerCase()) {

        generateCode = generateRandomCode();
        alert(`Foi enviado o Código ${generateCode} para o e-mail ${emailRecover}.`);

        emailField.style.display = "none";
        sendCodeButton.style.display = "none";
        codeEntrySection.style.display = "block";

        localStorage.setItem("codigoGerado", generateCode);


    } else {
        alert(`Foi enviado um Código para o e-mail ${emailRecover}.`);
        formRecupera.reset();
    }

});

//ouvinte de evento para o botão redefinir senha
verifyCodeButton.addEventListener("click", (event) => {

    event.preventDefault();

    const enteredCode = verificationCodeInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    const codigoGeradoLs = localStorage.getItem("codigoGerado");

if (!enteredCode || !newPassword || !confirmNewPassword) {

    alert("Por favor, preencha todos os campos: código de verificação. Nova senha e confirmar Nova Senha!");
}

//validar Nova Senha e confirmar se senhas são iguais
if (newPassword !== confirmNewPassword) {
    alert("As senhas não coincidem. Tente novamente.");

    newPasswordInput.value = "";
    confirmNewPasswordInput.value = "";
    return;
}
 
//verifica se o codigo é igual
if (enteredCode === codigoGeradoLs) {

    localStorage.setItem("senha_cadastro", newPassword);
    localStorage.removeItem("codigoGerado");
    window.location.href = "../index.html";

    alert("Senha redefinida com sucesso! Você já pode fazer o login com sua nova senha.");

} else {
    alert("Código de verificação Inválido. Tente novamente")
}

});

