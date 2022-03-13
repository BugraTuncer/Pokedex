// Pokemon API URL
const url = "https://pokeapi.co/api/v2/pokemon/"


// DOM ELEMENTS
const searchButton = document.getElementById("search");
const container = document.getElementById("container")
const searchInput = document.querySelector("input");


// BACKGROUND COLORS 

const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
};



// Search input action

searchInput.addEventListener("input", (e) => {
    const pokemons = document.querySelectorAll('.name');
    pokemons.forEach((pokemon) => {
        pokemon.parentElement.style.display = "block";
        if (!pokemon.innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
            pokemon.parentElement.style.display = "none";
        }
    })
})


// Fetch Pokemons


const initPokemons = async () => {
    for (let i = 1; i < 20; i++) {
        await pullPokemon(url + i);
    }
}

const pullPokemon = async (urlParam) => {
    const pokemon = await fetch(urlParam);
    const jsonParsedPokemon = await pokemon.json();
    listOfPokemons(jsonParsedPokemon);
}

const listOfPokemons = (data) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('card');
    pokemonDiv.style.backgroundColor = colors[data.types[0].type.name]
    const id = data.id.toString().padStart(3, "0");
    pokemonDiv.innerHTML = `
    <img class="img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt=${data.name}>
    <p class="name">${data.name}</p>
    <p class="id">#${id}</p>
    <p class="weight">${data.weight} Kg</p>
    <div class="typeBlock"><p>Tip : </p> <p class="type"> &nbsp;${data.types[0].type.name}</p> </div>
`
    container.appendChild(pokemonDiv)
}


initPokemons();