import { pokeApi } from './poke-api.js'

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 20
let offset = 0
let qtdZero
let idDoBotao


function convertPokemonToLi(pokemon) {
    if (pokemon.number < 10) {
        qtdZero = '00'
    } else if (pokemon.number >= 10 && pokemon.number < 100) {
        qtdZero = '0'
    } else {
        qtdZero = ''
    }
    
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${qtdZero}${pokemon.number}</span>
            <span class="name"><button id="${pokemon.name}" class="btnPokeName">${pokemon.name}</button></span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        
        const buttons = document.querySelectorAll('.btnPokeName')
        buttons.forEach(attachClickEvent)
    })
    
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit
    
    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function attachClickEvent(button) {
    button.addEventListener('click', () => {
        if (button.id) {
            obterIdDoBotao(button)
        }
    })
}

function obterIdDoBotao(botao) {
    idDoBotao = botao.id
    window.location.href = `./about.html?parametro=${idDoBotao}`
}

