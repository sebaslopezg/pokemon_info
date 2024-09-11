const btnBuscarPokemon = document.getElementById('btnBuscarPokemon')
const txtBuscarPokemon = document.getElementById('txtBuscarPokemon')
const dataZone = document.getElementById('dataZone')
let countCards = 1

btnBuscarPokemon.addEventListener('click', ()=> {
    let valor = txtBuscarPokemon.value
    buscarPokemon(valor)
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
    console.log(data)
    let tipos = "";
    for(let element in data.types){
        tipos += `<span class="pkm-type ${data.types[element].type.name}"> ${capitalizeFirstLetter(data.types[element].type.name)}</span>`
    }

    dataZone.innerHTML = `
        <div class="row">
            <div class="col s3">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img class="activator" src="${data.sprites.front_default}">
                    </div>
                    <div class="card-content">
                      <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">expand_more</i></span>
                    </div>
                    <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
                      <p>Número: ${data.id}</p>
                      <p>Típos:</p>
                      <p id="type${data.id}">
                      ${tipos}
                      </p>
                      <p>Generación: ${data.version_group.name}</p>
                    </div>
                </div>
            </div>
        </div>
    `
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