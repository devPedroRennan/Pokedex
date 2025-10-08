const url = "https://pokeapi.co/api/v2/pokemon/";

let pokeName = document.querySelector("#pokeName");
let pokeNumber = document.querySelector("#pokeNumber");

let search = document.querySelector("#pokename");
let pokeImg = document.querySelector("#pokeimg");
let form = document.querySelector(".form");
let pokeability = document.querySelector("#ability");
let shiny = document.querySelector("#shiny");

const pokestats = {
    "attack": document.querySelector("#atk"),
    "special-attack": document.querySelector("#spatk"),
    "defense": document.querySelector("#defs"),
    "special-defense": document.querySelector("#spdefs"),
    "speed": document.querySelector("#spd"),
    "hp": document.querySelector("#hp")
}

let butAnt = document.querySelector("#anterior");
let butProx = document.querySelector("#proximo");

let idPoke = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${url}${pokemon}`);
        if (response.status === 200) {
            const dados = await response.json();  
            return dados;
        }
        return null;
    }
    catch (error) {
        console.log("Erro...", error)
        return null;
    }
}

const pokeRender = async (pokemon) => {
    const dados = await fetchPokemon(pokemon);

    if (dados) {
        pokeImg.style.display = 'block';
        pokeName.innerText = dados.name;
        pokeNumber.innerText = dados.id;
        shiny.addEventListener("click", () => {
            pokeImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']; 
        })
        pokeImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
        search.value = ""; 
        idPoke = dados.id;
        pokeability.innerText = `Habilidade: ${dados.abilities[0].ability.name}`;
        for (const element in pokestats) {
            pokestats[element].innerText = '';
            const statusPoke = dados.stats.find( (item) => item.stat.name === element);
            console.log(statusPoke);

            pokestats[element].innerText = statusPoke.base_stat;

        }
    }
    else {
        pokeName.innerText = "Nao encontrado :c";
        pokeImg.src = "";
        pokeImg.alt = ":c";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    pokeRender(search.value.toLowerCase()); 
});



pokeRender(idPoke); 
