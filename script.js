//Diese Funktion holt die Daten für ein einzelnes Pokémon von der PokéAPI.
async function getPokemonData(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = await response.json();
  return pokemonData;
}


//Diese Funktion holt die Artendaten für ein einzelnes Pokémon von der PokéAPI.
async function getPokemonSpecies(id) {
  const response = await fetch(`  https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const pokemonSpecies = await response.json();
  return pokemonSpecies;
}


//Diese Funktion rendert die Anfangsseite, indem die ersten 10 Pokémon geladen werden.
function render() {
  loadPokemon(1, 33);
  infoPkm(1)
}

//Diese Funktion lädt die Pokémon-Daten für einen angegebenen Bereich von Pokémon-IDs.
async function loadPokemon(start, end) {
  const allPokemon = document.getElementById('all-Pokemon');
  allPokemon.style.display = 'none';

  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';

  document.body.style.overflow = 'hidden';

  const loadingPercent = document.getElementById('loading-percent');
  const incrementPercent = 100 / (end - start + 1);
  let currentPercent = 0;
  latestPkm = end;
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


let latestPkm;
//Diese Funktion lädt weitere Pokemon 
async function loadMorePkm() {
  let lastPkm = latestPkm + 32;
  let nextPkm = latestPkm ++;
  loadPokemon(nextPkm, lastPkm)

};


//Diese Funktion generiert das HTML für einen einzelnen Pokémon-Eintrag.
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


//Diese Funktion lädt die Pokémon-Daten für die angegebene Region.
async function loadRegion(region) {
  deleteBox();
  if (region === 'Kanto') {
    await loadPokemon(1, 33);
  } else if (region === 'Johto') {
    await loadPokemon(152, 184);
  } else if (region === 'Hoenn') {
    await loadPokemon(252, 284);
  } else if (region === 'Sinnoh') {
    await loadPokemon(387, 419);
  } else if (region === 'Unova') {
    await loadPokemon(495, 527);
  } else if (region === 'Kalos') {
    await loadPokemon(650, 682);
  } else if (region === 'Alola') {
    await loadPokemon(722, 754);
  } else if (region === 'Galar') {
    await loadPokemon(810, 842);
  } else if (region === 'Paldea') {
    await loadPokemon(906, 938);
  }
}


//Diese Funktion löscht den Inhalt des Elements all-Pokemon.
function deleteBox() {
  const allPokemonElement = document.getElementById('all-Pokemon');
  allPokemonElement.innerHTML = '';
}


//Diese Funktion lädt die detaillierten Informationen für ein einzelnes Pokémon.
async function infoPkm(id) {
  loadSprite(id)
  loadName(id)
  loadSpecies(id);
  loadTypes(id);
  loadHT(id);
  loadWT(id);
  loadStats(id);
  loadAbilitys(id);
  currentPkm = id;
}


//Diese Funktion lädt das Gewicht für ein einzelnes Pokémon von der PokéAPI.
async function loadWT(id) {
  const pokemonData = await getPokemonData(id);
  const WT = pokemonData.height;
  document.getElementById('WT').innerHTML = `${WT}`;
}


//Diese Funktion lädt die Größe für ein einzelnes Pokémon von der PokéAPI.
async function loadHT(id) {
  const pokemonData = await getPokemonData(id);
  const HT = pokemonData.weight;
  document.getElementById('HT').innerHTML = `${HT}`;
}


//Diese Funktion lädt den Namen für ein einzelnes Pokémon von der PokéAPI.
async function loadName(id) {
  const pokemonData = await getPokemonData(id);
  const pkmNames = pokemonData.forms[0].name;
  document.getElementById('pkm-Names').innerHTML = `${pkmNames}`;
  document.getElementById('pkm-id').innerHTML = `#${id}`;
}


//Diese Funktion lädt das Sprite für ein einzelnes Pokémon von der PokéAPI.
async function loadSprite(id) {
  const pokemonData = await getPokemonData(id);
  const pkmSprites = pokemonData.sprites.front_default;
  document.getElementById('pkm-img-big').style.backgroundImage = `url(${pkmSprites})`;
}

//Diese Funktion lädt die Artendaten für ein einzelnes Pokémon von der PokéAPI.
async function loadSpecies(id) {
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


//Diese Funktion lädt die Typen für ein einzelnes Pokémon von der PokéAPI.
async function loadTypes(id) {
  const pokemonData = await getPokemonData(id);
  const pkmType1 = pokemonData.types[0].type.name;
  const pkmType2 = pokemonData.types[1] ? pokemonData.types[1].type.name : null;

  if (pokemonData.types.length > 0) {
    document.getElementById('type').innerHTML = `<div class="info-Type flex type-Name flex-center" style="background-color: ${typeColors[pkmType1]}">${pkmType1}</div>`;
    if (pkmType2) {
      document.getElementById('type2').innerHTML = `<div class="info-Type flex type-Name flex-center" style="background-color: ${typeColors[pkmType2]}">${pkmType2}</div>`;
    } else {
      document.getElementById('type2').innerHTML = ``;
    }
  }
}


//Diese Funktion lädt die Statistiken für ein einzelnes Pokémon von der PokéAPI.
async function loadStats(id) {
  for (let i = 0; i < 6; i++) {
    let pokemonData = await getPokemonData(id);
    const stats = pokemonData.stats[i].base_stat;
    const currentStats = document.getElementById(`stats-${i}`)
    currentStats.innerHTML = stats;
    valueID = id;
    adjustFillWidth(stats, i);
  }
}


//Diese Funktion lädt die Fähigkeiten für ein einzelnes Pokémon von der PokéAPI.
async function loadAbilitys(id) {
  const pokemonData = await getPokemonData(id);
  if (pokemonData.abilities.length > 1) {
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

//akuelle geladene Pokemon()
let currentPkm;
function loadNextPkm() {
  currentPkm++
  infoPkm(currentPkm)
}

function loadLastPkm() {
  currentPkm--
  infoPkm(currentPkm)
}


//Diese Funktion passt die Breite des Füllelements für die angegebene Statistik an.
function adjustFillWidth(value, i) {
  let fillElement = document.getElementById(`fill-${i}`);
  let width = Math.min(value, 170); // Maximalwert von 200
  maxWidth = document.querySelector(".bar").offsetWidth;
  fillElement.style.width = (width / 170) * maxWidth + "px";
}

//überbrücken mit loadStats(id)
let valueID;
//Diese Funktion öffnet oder schließt die Statistikbox
function slideout() {
  let statsBox = document.getElementById('stats-box');
  let statsBoxpadding = document.getElementById('box1');
  let down = document.getElementById('arrowDown');
  statsBox.classList.toggle('hidden');
  statsBoxpadding.classList.toggle('padding');
  down.classList.toggle('rotate');
  loadStats(valueID);

}


//Diese Funktion filtert die Pokémon-Liste basierend auf der Sucheingabe.
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

slidebar.addEventListener('mousedown', function (e) {
  startX = e.pageX - slidebar.offsetLeft;
  scrollLeft = slidebar.scrollLeft;
});

slidebar.addEventListener('mousemove', function (e) {
  if (!startX) {
    return;
  }
  e.preventDefault();
  currentX = e.pageX - slidebar.offsetLeft;
  const distance = (currentX - startX) * 1.5;
  slidebar.scrollLeft = scrollLeft - distance;
});

slidebar.addEventListener('mouseup', function (e) {
  startX = null;
});

slidebar.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX - slidebar.offsetLeft;
  scrollLeft = slidebar.scrollLeft;
});

slidebar.addEventListener('touchmove', function (e) {
  if (!startX) {
    return;
  }
  e.preventDefault();
  currentX = e.touches[0].clientX - slidebar.offsetLeft;
  const distance = (currentX - startX) * 1.5;
  slidebar.scrollLeft = scrollLeft - distance;
});

slidebar.addEventListener('touchend', function (e) {
  startX = null;
});

