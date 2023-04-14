function render(){
    loadpkm();
}


async function loadpkm(){
    for (let i = 1; i < 10; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch (url);
        let responseAsJson = await response.json();
        console.log('API answers:', responseAsJson['forms']['0']['name']);
        let pkmSprites= responseAsJson['sprites']['front_default'];
        let pkmNames= responseAsJson['forms']['0']['name'];
        document.getElementById('all-Pokemon').innerHTML += generatePokemonHTML(pkmSprites, pkmNames, i);
    }
    }


function generatePokemonHTML(pkmSprites, pkmNames, i) {
        return `
          <div class="single-Pokemon flex-center flex-column" id="single-Pokemon${i}" onclick="infoPkm(${i})">
            <img src="${pkmSprites}" alt="">
            <div class="flex-around">
              <span>${pkmNames}</span>
              <span class="margin-Left10">#${i}</span>
            </div>
          </div>
        `;
      }

function infoPkm(singlePkM){
    console.log (singlePkM)
}

