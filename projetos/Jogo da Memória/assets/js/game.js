const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const spanPoints = document.querySelector(".points");
const grid = document.querySelector(".grid");

// Elementos do Modal
const gameOverModal = document.getElementById("gameOverModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const closeButton = document.querySelector(".close-button");
const playAgainButton = document.getElementById("playAgainButton");
const backToHomeButton = document.getElementById("backToHomeButton");

// Elementos de Feedback das Cartas
const cardFeedback = document.getElementById("cardFeedback");
const feedbackText = document.getElementById("feedbackText");

// Elementos para a lista de recordes
const recordsList = document.getElementById("recordsList");

let currentTime = 0;
let pontos = 0;
let timerIntervalId; // Variável para armazenar o ID do setInterval

// Quando a janela for iniciada
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem("player");
    startTimer();
    loadGame();
    displayRecords(); // Exibe os recordes ao carregar a página
};

// Função para o tempo correr
const startTimer = () => {
    timerIntervalId = setInterval(() => { // Armazena o ID do intervalo
        spanPoints.innerHTML = pontos;
        currentTime++;
        timer.innerHTML = currentTime;
    }, 1000);
};

// Array dos personagens das cartas
const characters = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
];

// Dobrando o tamanho do array
const duplicateCharacters = [...characters, ...characters];

// Embaralhar as Cartas
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

// Função para criar os Elementos
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Criar as Cartas
const createCard = (character) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", revealCard);
    front.style.backgroundImage = `url("../assets/images/${character}.png")`;

    card.setAttribute("data-character", character);

    return card;
};

// Função iniciar o Jogo
const loadGame = () => {
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

// Função para revelar as Cartas
let firstCard = "";
let secondCard = "";

const revealCard = ({ target }) => {
    // Impede virar cartas já reveladas ou desabilitadas
    if (target.parentNode.className.includes("reavel-card") || target.parentNode.className.includes("disabled-card")) {
        return;
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reavel-card");
        firstCard = target.parentNode;
    } else if (secondCard === "") {
        target.parentNode.classList.add("reavel-card");
        secondCard = target.parentNode;
        checkCards();
    }
};

// Função para checar as cartas
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        // Quando as cartas forem iguais
        pontos += 10;
        showFeedback("Acertou!", "green"); // Mostra feedback de acerto

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

    } else {
        // Quando as cartas forem diferentes
        pontos -= 2;
        showFeedback("Errou!", "red"); // Mostra feedback de erro

        setTimeout(() => {
            firstCard.classList.remove("reavel-card");
            secondCard.classList.remove("reavel-card");
            firstCard = "";
            secondCard = "";
        }, 500);
    }
    checkEndGme();
};

// Função para mostrar o feedback "Acertou!" ou "Errou!"
const showFeedback = (message, color) => {
    feedbackText.textContent = message;
    cardFeedback.style.color = color;
    cardFeedback.classList.add("show"); // Adiciona classe para exibir

    setTimeout(() => {
        cardFeedback.classList.remove("show"); // Remove classe para esconder
    }, 800); // Exibe por 0.8 segundos
};

// Checar o fim do jogo
const checkEndGme = () => {
    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {
        clearInterval(timerIntervalId); // Para o timer corretamente

        // Salva e verifica o recorde
        saveRecord(spanPlayer.innerHTML, currentTime, pontos);

        // Exibe o modal de fim de jogo
        modalTitle.textContent = "Fim de Jogo!";
        modalMessage.innerHTML = `Parabéns ${spanPlayer.innerHTML}!<br>
                                  Tempo Total: ${currentTime} segundos.<br>
                                  Pontos: ${pontos}.`;
        gameOverModal.style.display = "flex"; // Usa flex para centralizar o modal

        // Reseta as variáveis do jogo para que um novo jogo comece do zero
        pontos = 0;
        currentTime = 0;
    }
};

// Função para salvar o recorde
const saveRecord = (player, time, score) => {
    // Tenta obter os recordes existentes do localStorage
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];

    // Adiciona o novo recorde
    records.push({ player, time, score });

    // Ordena os recordes: primeiro por menor tempo, depois por maior pontuação
    // Se o tempo for igual, o desempate é por quem fez mais pontos
    records.sort((a, b) => {
        if (a.time === b.time) {
            return b.score - a.score; // Maior pontuação primeiro
        }
        return a.time - b.time; // Menor tempo primeiro
    });

    // Mantém apenas os top 5 recordes (você pode ajustar este número)
    records = records.slice(0, 5);

    // Salva os recordes de volta no localStorage
    localStorage.setItem('gameRecords', JSON.stringify(records));

    // Atualiza a exibição dos recordes
    displayRecords();
};

// Função para exibir os recordes
const displayRecords = () => {
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];

    // Limpa a lista atual
    recordsList.innerHTML = '';

    if (records.length === 0) {
        recordsList.innerHTML = '<li>Nenhum recorde ainda!</li>';
    } else {
        records.forEach((record, index) => {
            const listItem = createElement('li', '');
            listItem.textContent = `#${index + 1} ${record.player} - Tempo: ${record.time}s - Pontos: ${record.score}`;
            recordsList.appendChild(listItem);
        });
    }
};

// Listeners de evento para os botões do modal
closeButton.addEventListener("click", () => {
    gameOverModal.style.display = "none";
});

playAgainButton.addEventListener("click", () => {
    gameOverModal.style.display = "none";
    window.location.reload(); // Recarrega a página para iniciar um novo jogo
});

backToHomeButton.addEventListener("click", () => {
    gameOverModal.style.display = "none";
    window.location.href = "../index.html"; // Volta para a página inicial
});

// Fecha o modal se clicar fora do conteúdo
window.addEventListener("click", (event) => {
    if (event.target == gameOverModal) {
        gameOverModal.style.display = "none";
    }
});