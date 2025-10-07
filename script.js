const url = "https://pokeapi.co/api/v2/pokemon/";

let pokeName = document.querySelector("#pokeName");
let pokeNumber = document.querySelector("#pokeNumber");

let search = document.querySelector("#pokename");
let pokeImg = document.querySelector("#pokeimg");
let form = document.querySelector(".form");

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
        pokeImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
        search.value = ""; 
        idPoke = dados.id;
        console.log(idPoke);
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
