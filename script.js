function render() {
  loadPokemon(1,151);
}


async function getPokemonData(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = await response.json();
  return pokemonData;
}


async function getPokemonSpecies(id) {
  const response = await fetch(`  https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const pokemonSpecies = await response.json();
  return pokemonSpecies;
}

async function getPokemonWeakness(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${id}`);
  const pokemonWeakness = await response.json();
  return pokemonWeakness;
}

async function getPokemonEvolutionChain(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  const pokemonEC = await response.json();
  return pokemonEC;
}

async function  loadEC(id) {
  const pokemonData = await getPokemonEvolutionChain(id);
  const PokemonEC = pokemonData.evolves_to.length;
  console.log(PokemonEC);
}

async function loadWeakness(id) {
  const weakness = await getPokemonWeakness(id);
  console.log(weakness);
}

async function loadWT(id){
  const pokemonData = await getPokemonData(id);
  const WT = pokemonData.height;
  document.getElementById('WT').innerHTML = `${WT}`;
}

async function loadPokemon(start, end) {
  const allPokemon = document.getElementById('all-Pokemon');
  allPokemon.style.display = 'none';

  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';

  document.body.style.overflow = 'hidden';

  const loadingPercent = document.getElementById('loading-percent');
  const incrementPercent = 100 / (end - start + 1);
  let currentPercent = 0;

  for (let i = start; i <= end; i++) {
    const pokemonData = await getPokemonData(i);
    const pokemonHTML = generatePokemonHTML(pokemonData, i);
    document.getElementById('all-Pokemon').innerHTML += pokemonHTML;

    currentPercent += incrementPercent;
    loadingPercent.innerHTML = `${Math.floor(currentPercent)}%`;
  }

  loader.style.display = 'none';
  allPokemon.style.display = 'flex';
  document.body.style.overflow = '';
}


function generatePokemonHTML(pokemonData, id) {
  const pkmSprites = pokemonData.sprites.front_default;
  const pkmNames = pokemonData.forms[0].name;
  return `

    <div class="single-Pokemon flex-center flex-column" id="single-Pokemon${id}" onclick="infoPkm(${id})">
      <img src="${pkmSprites}" alt="">
      <div class="flex-center">
      <span class="number-span">#${id}</span>
    </div>
      <div class="flex-center">
        <span>${pkmNames}</span>
      </div>
    </div>
  `;
}


function deleteBox() {
  const allPokemonElement = document.getElementById('all-Pokemon');
  allPokemonElement.innerHTML = '';
}


async function loadRegion(region){
  deleteBox();
  if (region === 'Kanto') {
    await loadPokemon(1, 151);
  } else if (region === 'Johto') {
    await loadPokemon(152, 251);
  } else if (region === 'Hoenn') {
    await loadPokemon(252, 386);
  } else if (region === 'Sinnoh') {
    await loadPokemon(387, 494);
  } else if (region === 'Unova') {
    await loadPokemon(495, 649);
  } else if (region === 'Kalos') {
    await loadPokemon(650, 721);
  } else if (region === 'Alola') {
    await loadPokemon(722, 809);
  } else if (region === 'Galar') {
    await loadPokemon(810, 905);
  }else if (region === 'Paldea') {
  await loadPokemon(906, 1008);
}
}


async function infoPkm(id) {
  loadSprite(id)
  loadName(id)
  loadSpecies(id);
  loadTypes(id);
  loadHT(id);
  loadWT(id);
  loadStats(id);
  loadAbilitys(id);
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

async function loadTypes(id) {
  const pokemonData = await getPokemonData(id);
  const pkmType1 = pokemonData.types[0].type.name;
  const pkmType2 = pokemonData.types[1] ? pokemonData.types[1].type.name : null;

  if (pokemonData.types.length > 0) {
    document.getElementById('type').innerHTML = `<div class="info-Type flex type-Name flex-center" style="background-color: ${typeColors[pkmType1]}">${pkmType1}</div>`;
    if (pkmType2) {
      document.getElementById('type2').innerHTML = `<div class="info-Type flex type-Name flex-center" style="background-color: ${typeColors[pkmType2]}">${pkmType2}</div>`;
    }else{
      document.getElementById('type2').innerHTML =``;
    }
  }
}






async function loadHT(id){
  const pokemonData = await getPokemonData(id);
  const HT = pokemonData.weight;
  document.getElementById('HT').innerHTML = `${HT}`;
}

async function loadStats(id){
  for (let i = 0; i < 6; i++) {
    let pokemonData = await getPokemonData(id);
    const stats = pokemonData.stats[i].base_stat;
    const currentStats = document.getElementById(`stats-${i}`)
    currentStats.innerHTML = stats;
    valueID = id;
    adjustFillWidth(stats,i);
  }
}

function adjustFillWidth(value,i) {
  let fillElement = document.getElementById(`fill-${i}`);
  let width = Math.min(value, 170); // Maximalwert von 200
  maxWidth = document.querySelector(".bar").offsetWidth;
    fillElement.style.width = (width / 170) * maxWidth + "px";
}


let valueID;

function slideout() {
  var statsBox = document.getElementById('stats-box');
  statsBox.classList.toggle('hidden');
  loadStats(valueID);
}

async function loadAbilitys(id){
  const pokemonData = await getPokemonData(id);
  if (pokemonData.abilities.length>1) {
    for (let i = 0; i < 2; i++) {
      const abilitys = pokemonData.abilities[i].ability.name;
      const ability = document.getElementById(`ability-${i}`)
      ability.innerHTML = abilitys 
    }
  } else {
    const abilitys = pokemonData.abilities[0].ability.name;
    const ability = document.getElementById(`ability-${0}`)
  }

}




function searchPokemon() {

  const input = document.querySelector('input[type="text"]');
  const filter = input.value.toUpperCase();
  const pokemonDivs = document.querySelectorAll('.single-Pokemon');
  for (let i = 0; i < pokemonDivs.length; i++) {
    const name = pokemonDivs[i].querySelector('.flex-around span:first-child').innerHTML.toUpperCase();
    if (name.indexOf(filter) > -1) {
      pokemonDivs[i].style.display = '';
    } else {
      pokemonDivs[i].style.display = 'none';
    }
  }
}

var buttons = document.querySelectorAll('.buttonRegion');
var slidebar = document.querySelector('.info-region');
var startX, currentX, scrollLeft;

slidebar.addEventListener('mousedown', function(e) {
  startX = e.pageX - slidebar.offsetLeft;
  scrollLeft = slidebar.scrollLeft;
});

slidebar.addEventListener('mousemove', function(e) {
  if (!startX) {
    return;
  }
  e.preventDefault();
  currentX = e.pageX - slidebar.offsetLeft;
  const distance = (currentX - startX) * 1.5;
  slidebar.scrollLeft = scrollLeft - distance;
});

slidebar.addEventListener('mouseup', function(e) {
  startX = null;
});

slidebar.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX - slidebar.offsetLeft;
  scrollLeft = slidebar.scrollLeft;
});

slidebar.addEventListener('touchmove', function(e) {
  if (!startX) {
    return;
  }
  e.preventDefault();
  currentX = e.touches[0].clientX - slidebar.offsetLeft;
  const distance = (currentX - startX) * 1.5;
  slidebar.scrollLeft = scrollLeft - distance;
});

slidebar.addEventListener('touchend', function(e) {
  startX = null;
});

