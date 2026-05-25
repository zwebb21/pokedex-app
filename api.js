




// fetch data from pokeapi and display it on the page
async function fetchData(selectedPokemonName) {
    const displayName = document.getElementById('displayName');

    try {
        const pokemonName = (selectedPokemonName || document.getElementById("pokemonName").value).trim().toLowerCase();

        if (!pokemonName) {
            displayName.textContent = "Enter a Pokemon name.";
            return;
        }

        // 👇 ADD IT RIGHT HERE
        displayName.textContent = "Loading...";
        document.getElementById('displayWeight').textContent = "";
        document.getElementById('displayType').textContent = "";
        document.getElementById('displayAbilities').textContent = "";

        // 👇 THEN FETCH
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error('Could not fetch resource');
        }
        // pulling html elements
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById('pokemonSprite');
        const displayWeight = document.getElementById('displayWeight');
        const displayType = document.getElementById('displayType');
        const displayAbilities = document.getElementById('displayAbilities');


        // Set data
        displayName.textContent = `Name: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
        displayWeight.textContent = `How Heavy: ${data.weight}`;
        displayType.textContent = `Type: ${data.types.map(t => t.type.name).join(", ")}`;
        displayAbilities.textContent = `Abilities: ${data.abilities.map(a => a.ability.name).join(", ")}`;
        imgElement.src = data.sprites.front_default;
        imgElement.style.display = "";




        // error handling
    } catch (error) {
        console.error(error);
        displayName.textContent = "Pokemon not found.";
    }
}

const popularPokemonBatches = [
    ["Bulbasaur", "Ivysaur", "Charmander", "Charizard", "Squirtle"],
    ["Pikachu", "Raichu", "Meowth", "Geodude", "Gengar"],
    ["Eevee", "Snorlax", "Mewtwo", "Mew", "Dragonite"],
    ["Lucario", "Greninja", "Gardevoir", "Garchomp", "Arcanine"],
    ["Jigglypuff", "Psyduck", "Machamp", "Lapras", "Vaporeon"],
    ["Cyndaquil", "Totodile", "Chikorita", "Umbreon", "Espeon"],
    ["Blastoise", "Venusaur", "Butterfree", "Beedrill", "Pidgeot"],
    ["Rattata", "Fearow", "Arbok", "Sandslash", "Ninetales"],
    ["Wigglytuff", "Golbat", "Vileplume", "Parasect", "Dugtrio"],
    ["Persian", "Golduck", "Primeape", "Poliwrath", "Alakazam"],
    ["Victreebel", "Tentacruel", "Golem", "Rapidash", "Slowbro"],
    ["Magneton", "Dodrio", "Dewgong", "Muk", "Cloyster"],
    ["Hypno", "Kingler", "Electrode", "Marowak", "Hitmonlee"],
    ["Lickitung", "Weezing", "Rhydon", "Chansey", "Kangaskhan"],
    ["Seadra", "Starmie", "Scyther", "Jynx", "Electabuzz"],
    ["Mewtwo", "Mew", "Lugia", "Ho-Oh", "Celebi"],

  ["Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys"],

  ["Dialga", "Palkia", "Giratina", "Darkrai", "Arceus"],

  ["Reshiram", "Zekrom", "Kyurem", "Victini", "Keldeo"],

  ["Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa"],

  ["Solgaleo", "Lunala", "Necrozma", "Zeraora", "Meltan"],
    ["Magmar", "Pinsir", "Tauros", "Gyarados", "Ditto"]
];

let popularPokemonBatchIndex = 0;
const popularPokemonList = document.getElementById("popularPokemonList");

function renderPopularPokemon() {
    if (!popularPokemonList) return;

    popularPokemonList.innerHTML = "";

    popularPokemonBatches[popularPokemonBatchIndex].forEach((pokemonName) => {
        const pokemonItem = document.createElement("button");
        pokemonItem.type = "button";
        pokemonItem.className = "pokemon-item";
        pokemonItem.textContent = pokemonName;
        pokemonItem.dataset.pokemonName = pokemonName;
        popularPokemonList.appendChild(pokemonItem);
    });

    popularPokemonBatchIndex = (popularPokemonBatchIndex + 1) % popularPokemonBatches.length;
}

function selectPopularPokemon(pokemonName) {
    document.getElementById("pokemonName").value = pokemonName;
    fetchData(pokemonName);
}

if (popularPokemonList) {
    popularPokemonList.addEventListener("click", (event) => {
        const pokemonItem = event.target.closest(".pokemon-item");

        if (pokemonItem) {
            selectPopularPokemon(pokemonItem.dataset.pokemonName);
        }
    });

    renderPopularPokemon();
    setInterval(renderPopularPokemon, 5000);
}
