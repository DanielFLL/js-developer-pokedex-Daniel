import { Pokemon } from './pokemon-model.js'
import { pokeApi } from './poke-api.js'

const urlParams = new URLSearchParams(window.location.search);
const parametro = urlParams.get('parametro');

const detailsSection1 = document.getElementById('detailsSection1')
const detailsAbout = document.getElementById('detailsAbout')
const detailsStats = document.getElementById('detailsStats')
const likeBtnClicked = document.getElementById('likeBtnClicked')
const btnAbout = document.getElementById('btnAbout')
const btnBaseStats = document.getElementById('btnBaseStats')
const btnEvolution = document.getElementById('btnEvolution')
const btnMoves = document.getElementById('btnMoves')

const pokemonName = parametro

let qtdZero
let hpColor, attackColor, defenceColor, spAtkColor, spDefColor, speedColor, totalColor


function convertgetPokeDetailsToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.baseEx = pokeDetail.base_experience
    pokemon.height = pokeDetail.height * 10
    pokemon.weight = pokeDetail.weight / 10

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat)

    pokemon.abilities = abilities
    pokemon.hp = stats[0]
    pokemon.attack = stats[1]
    pokemon.defence = stats[2]
    pokemon.spAtk = stats[3]
    pokemon.spDef = stats[4]
    pokemon.speed = stats[5]
    pokemon.total = stats[0] + stats[1] + stats[2] + stats[3] + stats[4] + stats[5]

    return pokemon
}

function convertPokemonToDetails1(pokemon) {
    if (pokemon.number < 10) {
        qtdZero = '00'
    } else if (pokemon.number >= 10 && pokemon.number < 100) {
        qtdZero = '0'
    } else {
        qtdZero = ''
    }

    const cardContent1 = `
        <div class="bkgColor ${pokemon.type}"></div>
        <div class="identification">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${qtdZero}${pokemon.number}</span>
        </div>
        <ul class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ul>
        <picture class="pokeImg">
            <img src="${pokemon.photo}" alt="${pokemon.name}" class="photo">
        </picture>
    `

    return cardContent1
}
function convertPokemonToDetailsAbout(pokemon) {

    const cardContentAbout = `
        <div id="cardAbout" class="cardDetail">
            <div class="cardDetail__index">
                <p>Base Experience</p>
                <p>Height</p>
                <p>Weight</p>
                <p>Abilities</p>
            </div>
            <div class="cardDetail__values">
                <p>${pokemon.baseEx}</p>
                <p>${pokemon.height} cm</p>
                <p>${pokemon.weight} kg</p>
                <div class="abilities">
                    ${pokemon.abilities.map((ability) => `<p>${ability}</p>`).join(', ')}
                </div>
            </div>
        </div>
    `
    return cardContentAbout
}
function convertPokemonTodetailsStats(pokemon) {

    if (pokemon.hp < 50) {
        hpColor = "meterRed"
    } else if (pokemon.hp < 100) {
        hpColor = "meterYellow"
    } else {
        hpColor = "meterGreen"
    }

    if (pokemon.attack < 50) {
        attackColor = "meterRed"
    } else if (pokemon.attack < 100) {
        attackColor = "meterYellow"
    } else {
        attackColor = "meterGreen"
    }

    if (pokemon.defence < 50) {
        defenceColor = "meterRed"
    } else if (pokemon.defence < 100) {
        defenceColor = "meterYellow"
    } else {
        defenceColor = "meterGreen"
    }

    if (pokemon.spAtk < 50) {
        spAtkColor = "meterRed"
    } else if (pokemon.spAtk < 100) {
        spAtkColor = "meterYellow"
    } else {
        spAtkColor = "meterGreen"
    }

    if (pokemon.spDef < 50) {
        spDefColor = "meterRed"
    } else if (pokemon.spDef < 100) {
        spDefColor = "meterYellow"
    } else {
        spDefColor = "meterGreen"
    }

    if (pokemon.speed < 50) {
        speedColor = "meterRed"
    } else if (pokemon.speed < 100) {
        speedColor = "meterYellow"
    } else {
        speedColor = "meterGreen"
    }

    if (pokemon.total < 200) {
        totalColor = "meterRed"
    } else if (pokemon.total < 400) {
        totalColor = "meterYellow"
    } else {
        totalColor = "meterGreen"
    }

    const cardContentStats = `
        <div id="cardBaseStats" class="cardDetail">
            <div class="cardDetail__index">
                <p>HP</p>
                <p>Attack</p>
                <p>Defense</p>
                <p>Sp. Atk</p>
                <p>Sp. Def</p>
                <p>Speed</p>
                <p>Total</p>
            </div>
            <div class="cardDetail__values">
                <p>${pokemon.hp}</p>
                <p>${pokemon.attack}</p>
                <p>${pokemon.defence}</p>
                <p>${pokemon.spAtk}</p>
                <p>${pokemon.spDef}</p>
                <p>${pokemon.speed}</p>
                <p>${pokemon.total}</p>
            </div>
            <div class="cardDetail__bar">
                <meter class=${hpColor} max="160" value=${pokemon.hp}></meter>
                <meter class=${attackColor} max="160" value=${pokemon.attack}></meter>
                <meter class=${defenceColor} max="160" value=${pokemon.defence}></meter>
                <meter class=${spAtkColor} max="160" value=${pokemon.spAtk}></meter>
                <meter class=${spDefColor} max="160" value=${pokemon.spDef}></meter>
                <meter class=${speedColor} max="160" value=${pokemon.speed}></meter>
                <meter class=${totalColor} max="700" value=${pokemon.total}></meter>
            </div>
        </div>
    `
    return cardContentStats
}

pokeApi.getPokeDetails = function (pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

    return fetch(url)
        .then((response) => response.json())
        .then(convertgetPokeDetailsToPokemon)
}

function loadPokemonDetails(pokemonName) {
    pokeApi.getPokeDetails(pokemonName)
        .then((pokemon) => {
            if (detailsStats == null) {
                detailsSection1.innerHTML = convertPokemonToDetails1(pokemon)
                detailsAbout.innerHTML = convertPokemonToDetailsAbout(pokemon)
            } else {
                detailsSection1.innerHTML = convertPokemonToDetails1(pokemon)
                detailsStats.innerHTML = convertPokemonTodetailsStats(pokemon)
            }
        })
}

loadPokemonDetails(pokemonName)

likeBtnClicked.addEventListener('click', () => {
    if (likeBtnClicked.style.opacity == 0) {
        likeBtnClicked.style.opacity = 1
    } else {
        likeBtnClicked.style.opacity = 0
    }
})

btnAbout.addEventListener('click', () => {
    window.location.href = `./about.html?parametro=${parametro}`
})

btnBaseStats.addEventListener('click', () => {
    window.location.href = `./stats.html?parametro=${parametro}`
})
