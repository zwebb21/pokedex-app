
export async function fetchPokemon(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

  if (!response.ok) {
    throw new Error("Could not fetch Pokemon");
  }

  return response.json();
}

export async function fetchPokemonByType(typeName) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);

  if (!response.ok) {
    throw new Error("Could not fetch Pokemon type");
  }

  const data = await response.json();
  return data.pokemon.map((pokemonSlot) => pokemonSlot.pokemon.name);
}
