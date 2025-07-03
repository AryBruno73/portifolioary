// VARIAVEIS GLOBAIS
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

//  CAPTURAR AS INFORMACOES DA POKEAPI
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        
       
        const data = await APIResponse.json();
    
        return data

    } else {
        console.log("erro de conexão com a API");
        
    };

};

// RENDERIZAR POKEMON
const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = "😐";
    pokemonName.innerHTML = "Loading...";
    pokemonImage.src = "https://cdn.pixabay.com/animation/2022/12/26/19/45/19-45-56-484__480.png";

    setTimeout(() => 4000);

    const data = await fetchPokemon(pokemon);


    // CONDIÇAO SE TIVER ALGO EM DATA

    if (data) {
        console.log("conectado com a API");

        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        pokemonImage.src = data.sprites.versions
        ["generation-v"]['black-white'].animated.front_default;
        input_value ="";
        searchPokemon = data.id;
        
        console.log(data);
    } else {
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Not found";
        pokemonImage.src = 'https://cdn-icons-png.flaticon.com/512/755/755014.png'
    }

};

//ACHAR POKEMON PELO INPUT
form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderPokemon(input.value);
});

//EVENTO DOS BOTÕES
let searchPokemon = 1;

buttonNext.addEventListener("click", () => {
 
    searchPokemon++;
    
    renderPokemon(searchPokemon);
    
});

buttonPrev.addEventListener("click", () => {
    
    if (searchPokemon > 1) {
    
        searchPokemon--;
    
        renderPokemon(searchPokemon);
    }

});


renderPokemon(1);