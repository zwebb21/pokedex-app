// Control center for page logic.
import { pokemonTypes, popularPokemonBatches } from "./data.js";
import { fetchPokemon, fetchPokemonByType } from "./api.js";

let popularPokemonBatchIndex = 0;
let selectedType = "all";
let typePokemonNames = [];

const popularPokemonList = document.getElementById("popularPokemonList");
const typeFilter = document.getElementById("typeFilter");//the filter selection 
const pokemonNameInput = document.getElementById("pokemonName");//the input for name
const searchButton = document.getElementById("searchPokemonButton");//search btn 

//pokemon attributes and data 
const displayName = document.getElementById("displayName"); //pokemon name
const displayWeight = document.getElementById("displayWeight");//display the weight 
const displayType = document.getElementById("displayType"); //display the type 
const displayAbilities = document.getElementById("displayAbilities"); //display the abilities. 
const imgElement = document.getElementById("pokemonSprite"); //display a sprite img of pokemon
 //end 

 
function clearPokemonDisplay() {
  displayWeight.textContent = "";
  displayType.textContent = "";
  displayAbilities.textContent = "";
  imgElement.removeAttribute("src");
  imgElement.style.display = "none";
}

function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function normalizePokemonName(name) {
  return name.toLowerCase();
}

function getPopularPokemonNames() {
  return popularPokemonBatches.flat();
}
//filter names 
function getPokemonNamesForCurrentFilter() {
  if (selectedType === "all") {
    return getPopularPokemonNames();
  }

  const typeNameSet = new Set(typePokemonNames);
  return getPopularPokemonNames().filter((pokemonName) => {
    return typeNameSet.has(normalizePokemonName(pokemonName));
  });
}

async function fetchData(selectedPokemonName) {
  try {
    const pokemonName = (selectedPokemonName || pokemonNameInput.value).trim().toLowerCase();

    if (!pokemonName) {
      displayName.textContent = "Enter a Pokemon name.";
      clearPokemonDisplay();
      return;
    }

    displayName.textContent = "Loading...";
    clearPokemonDisplay();

    const pokemon = await fetchPokemon(pokemonName);

    displayName.textContent = `Name: ${formatPokemonName(pokemon.name)}`;
    displayWeight.textContent = `How Heavy: ${pokemon.weight}`;
    displayType.textContent = `Type: ${pokemon.types.map((type) => type.type.name).join(", ")}`;
    displayAbilities.textContent = `Abilities: ${pokemon.abilities.map((ability) => ability.ability.name).join(", ")}`;
    imgElement.src = pokemon.sprites.front_default;
    imgElement.style.display = "";
  } catch (error) {
    console.error(error);
    displayName.textContent = "Pokemon not found.";
    clearPokemonDisplay();
  }
}

function renderTypeFilter() {
  if (!typeFilter) return;

  pokemonTypes.forEach((typeName) => {
    const typeOption = document.createElement("option");
    typeOption.value = typeName;
    typeOption.textContent = formatPokemonName(typeName);
    typeFilter.appendChild(typeOption);
  });
}

function renderPopularPokemon() {
  if (!popularPokemonList) return;

  popularPokemonList.innerHTML = "";

  const pokemonNames = getPokemonNamesForCurrentFilter();

  if (pokemonNames.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "type-filter-message";
    emptyMessage.textContent = "No popular Pokemon found for this type.";
    popularPokemonList.appendChild(emptyMessage);
    return;
  }

  const currentBatch = pokemonNames.slice(popularPokemonBatchIndex, popularPokemonBatchIndex + 5);

  currentBatch.forEach((pokemonName) => {
    const pokemonItem = document.createElement("button");
    pokemonItem.type = "button";
    pokemonItem.className = "pokemon-item";
    pokemonItem.textContent = pokemonName;
    pokemonItem.dataset.pokemonName = pokemonName;
    popularPokemonList.appendChild(pokemonItem);
  });

  popularPokemonBatchIndex += 5;

  if (popularPokemonBatchIndex >= pokemonNames.length) {
    popularPokemonBatchIndex = 0;
  }
}

function selectPopularPokemon(pokemonName) {
  pokemonNameInput.value = pokemonName;
  fetchData(pokemonName);
}

searchButton.addEventListener("click", () => {
  fetchData();
});

typeFilter.addEventListener("change", async () => {
  selectedType = typeFilter.value;
  popularPokemonBatchIndex = 0;

  if (selectedType === "all") {
    typePokemonNames = [];
    renderPopularPokemon();
    return;
  }

  try {
    popularPokemonList.innerHTML = '<p class="type-filter-message">Loading type...</p>';
    typePokemonNames = await fetchPokemonByType(selectedType);
    renderPopularPokemon();
  } catch (error) {
    console.error(error);
    popularPokemonList.innerHTML = '<p class="type-filter-message">Could not load this type.</p>';
  }
});

pokemonNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchData();
  }
});

if (popularPokemonList) {
  popularPokemonList.addEventListener("click", (event) => {
    const pokemonItem = event.target.closest(".pokemon-item");

    if (pokemonItem) {
      selectPopularPokemon(pokemonItem.dataset.pokemonName);
    }
  });

  renderTypeFilter();
  renderPopularPokemon();
  setInterval(renderPopularPokemon, 5000);
}
