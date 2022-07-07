let pokemonNames = document.querySelector("#lista")

function showDetailPokemon(urlDetalle, nombrePokemon) {
    fetch(urlDetalle)
        .then(response => response.json())
        .then(function (response) {
            let altura = response.height
            let peso = response.weight
            let imagen = response.sprites.other.dream_world.front_default
            let $altura = document.querySelector("#altura")
            let $peso = document.querySelector("#peso")
            let $imagen = document.querySelector("#imagen")
            let $nombre = document.querySelector("#nombre")
            $nombre.innerHTML = nombrePokemon
            $altura.innerHTML = altura
            $peso.innerHTML = peso
            $imagen.style.backgroundImage = "url(" + imagen + ")";
            let tipos = response.types
            let $tipos = document.querySelector("#tipos")
            $tipos.innerHTML = ""
            for (let i = 0; i < tipos.length; i++) {
                let nombreTipo = tipos[i].type.name
                let li = document.createElement("li")
                li.innerHTML = nombreTipo
                $tipos.appendChild(li)
                li.classList.add("tipo")
                li.classList.add(nombreTipo)
            }
        })
}

let $searchPokemonBtn = document.querySelector("#searchPokemonBtn")
let $searchPokemonInput = document.querySelector("#searchPokemonInput")

$searchPokemonBtn.onclick = function () {
    showDetailPokemon("https://pokeapi.co/api/v2/pokemon/" + $searchPokemonInput.value, $searchPokemonInput.value)
}


function loadPokemonList(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (response) {
            var showMoreBtn = document.querySelector("#showMoreBtn")
            showMoreBtn.onclick = function () {
                loadPokemonList(response.next)
            }
            for (let i = 0; i < response.results.length; i++) {
                let nombrePokemon = response.results[i].name
                let urlDetalle = response.results[i].url
                let li = document.createElement("li")
                li.innerHTML = nombrePokemon
                pokemonNames.appendChild(li)
                li.onclick = showDetailPokemon.bind(null, urlDetalle, nombrePokemon)
            }
        })
}

loadPokemonList("https://pokeapi.co/api/v2/pokemon/")

