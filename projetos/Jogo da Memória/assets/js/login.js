const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");

//Função para acionar o botão jogar
const validateInput = () => {
    if (input.value.length > 2) {
        button.removeAttribute("disabled");
        return;
    }

    button.setAttribute("disabled","");
    
};

//Função ára acionar o botão jogar
const handleSubmit = (event) => {

    event.preventDefault();

    //Salva a chave player no localstorage
    localStorage.setItem("player", input.value);
    input.value = "";
    window.location.href = "pages/game.html";
    

}

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);