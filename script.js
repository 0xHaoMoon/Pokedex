function render() {
    loadPokemon();
  }
  
async function getPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await response.json();
    return pokemonData;
  }

    async function loadPokemon() {
        const allPokemonElement = document.getElementById('all-Pokemon');
        for (let i = 1; i <= 9; i++) {
          const pokemonData = await getPokemonData(i);
          const pokemonHTML = generatePokemonHTML(pokemonData, i);
          allPokemonElement.innerHTML += pokemonHTML;
        }
      }
  
  function generatePokemonHTML(pokemonData, id) {
    const pkmSprites = pokemonData.sprites.front_default;
    const pkmNames = pokemonData.forms[0].name;
    return `
      <div class="single-Pokemon flex-center flex-column" id="single-Pokemon${id}" onclick="infoPkm(${id})">
        <img src="${pkmSprites}" alt="">
        <div class="flex-around">
          <span>${pkmNames}</span>
          <span class="margin-Left10">#${id}</span>
        </div>
      </div>
    `;
  }
  

  async function infoPkm(id) {
    const pokemonData = await getPokemonData(id);
    const pkmSprites = pokemonData.sprites.front_default;
    document.getElementById('pkm-img-big').style.backgroundImage = `url(${pkmSprites})`;

    const pkmNames = pokemonData.forms[0].name;
    document.getElementById('pkm-Names').innerHTML = `#${id} ${pkmNames}`

  }
  


  
