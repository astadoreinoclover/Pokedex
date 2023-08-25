const pokemonName = document.querySelector('.pokemon_name');
const pokemoNumber = document.querySelector('.pokemon_number');
const pokemonFoto = document.querySelector('.pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let sPokemon = 1;

const featchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(ApiResponse.status === 200) {
        const data = await ApiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML ='Loading ...';

    const data = await featchPokemon(pokemon);

    if(data) {
        pokemonName.innerHTML = data.name;
        pokemoNumber.innerHTML = data.id;
        pokemonFoto.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = ''; 
        sPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemoNumber.innerHTML = '';
        pokemonFoto.src = '';
        input.value = ''; 
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', (event)=>{
    if(sPokemon > 1) {
        sPokemon = sPokemon - 1;
        renderPokemon(sPokemon)
    }
    
})

buttonNext.addEventListener('click', (event)=>{
    sPokemon = sPokemon + 1;
    renderPokemon(sPokemon)
})

renderPokemon(sPokemon);