function render() {
    loadPokemon();
  }
  

async function getPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await response.json();
    return pokemonData;
  }


  async function getPokemonSpecies(id) {
    const response = await fetch(`  https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const pokemonSpecies = await response.json();
    return pokemonSpecies;
  }


    async function loadPokemon() {
        const allPokemonElement = document.getElementById('all-Pokemon');
        for (let i = 1; i <= 50; i++) {
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
    loadSprite(id)
    loadName(id)
    loadSpecies(id);
    loadTypes(id);
    loadHT(id);
    loadWT(id);
  }


  async function loadName(id) {
    const pokemonData = await getPokemonData(id);
    const pkmNames = pokemonData.forms[0].name;
    document.getElementById('pkm-Names').innerHTML = `${pkmNames}`;
    document.getElementById('pkm-id').innerHTML = `#${id}`;
  }


  async function loadSprite(id) {
    const pokemonData = await getPokemonData(id);
    const pkmSprites = pokemonData.sprites.front_default;
    document.getElementById('pkm-img-big').style.backgroundImage = `url(${pkmSprites})`;
  }


  async function loadSpecies(id){
    const getPokemonDataSpecies = await getPokemonSpecies(id);
    const pkmSpecies = getPokemonDataSpecies.flavor_text_entries[0].flavor_text;
    document.getElementById('info-Text').innerHTML = `${pkmSpecies}`;
  }


  async function loadTypes(id) {
    const pokemonData = await getPokemonData(id);
    const pkmType1 = pokemonData.types[0].type.name;
    const pkmType2 = pokemonData.types[1] ? pokemonData.types[1].type.name : null;
  
    const typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC"
    };
  
    if (pokemonData.types.length > 0) {
      document.getElementById('type').innerHTML = `<div class="info-Type flex type-Name flex-center" style="background-color: ${typeColors[pkmType1]}">${pkmType1}</div>`;
      if (pkmType2) {
        document.getElementById('type2').innerHTML = `<div class="info-Type flex type-Name flex-center" style="background-color: ${typeColors[pkmType2]}">${pkmType2}</div>`;
      }else{
        document.getElementById('type2').innerHTML =``;
      }
    }
  }
  
  


  async function loadWT(id){
    const pokemonData = await getPokemonData(id);
    const WT = pokemonData.height;
    document.getElementById('WT').innerHTML = `${WT}`;
  }


  async function loadHT(id){
    const pokemonData = await getPokemonData(id);
    const HT = pokemonData.weight;
    document.getElementById('HT').innerHTML = `${HT}`;
  }


  


  
