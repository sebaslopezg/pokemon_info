const btnBuscarPokemon = document.getElementById('btnBuscarPokemon')
const txtBuscarPokemon = document.getElementById('txtBuscarPokemon')
const dataZone = document.getElementById('dataZone')
const btnPokemonRandom = document.getElementById('btnPokemonRandom')
let randomActivated = false

btnBuscarPokemon.addEventListener('click', ()=> {
    if (randomActivated) {
        dataZone.innerHTML = ""
        randomActivated = false
    }
    let valor = txtBuscarPokemon.value
    buscarPokemon(valor)
})

btnPokemonRandom.addEventListener('click', ()=>{
    printCards()
})

window.addEventListener('keydown', (e)=>{
    if(document.activeElement == txtBuscarPokemon && e.key == "Enter"){
        let valor = txtBuscarPokemon.value
        buscarPokemon(valor)
    }
})

function buscarPokemon(valor) {

    let ruta = `https://pokeapi.co/api/v2/pokemon-form/${valor}/`

    fetch(ruta)
    .then(response => response.json())
    .then(json => printData(json))
    .catch(err => console.log('Solicitud fallida', err)); 
    
}

function printData(data){
    //console.log(data)
    let tipos = ""
    for(let element in data.types){
        tipos += `<span class="pkm-type ${data.types[element].type.name}"> <b>${capitalizeFirstLetter(data.types[element].type.name)}</b></span>`
    }

    dataZone.innerHTML += `
       <!-- <div class="row"> -->
            <div class="col s3">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img class="activator" src="${data.sprites.front_default}">
                    </div>
                    <div class="card-content">
                      <span class="card-title activator grey-text text-darken-4">${capitalizeFirstLetter(data.name)}<i class="material-icons right">expand_more</i></span>
                    </div>
                    <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
                      <p>Número: ${data.id}</p>
                      <p>Típos:</p>
                      <p id="type${data.id}">
                      ${tipos}
                      </p>
                      <p>Generación: ${data.version_group.name}</p>
                      <p><b>Imagenes</b></p>
                      <p>de Frente</p>
                      <img class="activator" src="${data.sprites.front_default}">
                      <p>Atrás</p>
                      <img class="activator" src="${data.sprites.back_default}">
                      <p>de Frente Shiny</p>
                      <img class="activator" src="${data.sprites.front_shiny}">
                      <p>Atrás Shiny</p>
                      <img class="activator" src="${data.sprites.back_shiny}">
                    </div>
                </div>
            </div>
        <!--</div>-->
    `
}

function printCards(){
    randomActivated = true
    dataZone.innerHTML = ""
    let cantidadCartas = random(5, 100)

    for (let i = 0; i < cantidadCartas; i++) {
        let valor = random(1, 1025)
        buscarPokemon(valor)
    }
}

function printType(id, text){
    window.addEventListener('DOMContentLoaded', ()=>{
        let tipos = document.getElementById('type'+id)
        tipos.innerHTML += text
        console.log(text)
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}