const visor = document.getElementById("resultado");

function insert(numero) {
  visor.innerHTML += numero;
};

function clean() {
    visor.innerHTML = "";
}

function back() {
    let numerosVisor = visor.textContent;

    visor.innerHTML = numerosVisor.substring(0, numerosVisor.length -1);
}

function calcular() {
    let numerosVisor = visor.textContent;

    visor.innerHTML = eval(numerosVisor);

}