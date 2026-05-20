async function fetchData() {
    try {
        const displayName = document.getElementById('displayName');
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
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
    }
}

document.querySelectorAll('.pokemon-item').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('pokemonName').value = item.textContent;
        fetchData();
    });
});
