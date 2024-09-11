const btnBuscarPokemon = document.getElementById('btnBuscarPokemon')
const txtBuscarPokemon = document.getElementById('txtBuscarPokemon')
const dataZone = document.getElementById('dataZone')
const btnPokemonRandom = document.getElementById('btnPokemonRandom')
const displayMessage = document.getElementById('displayMessage')
let randomActivated = false

btnBuscarPokemon.addEventListener('click', ()=> {
    if (randomActivated) {
        dataZone.innerHTML = ""
        randomActivated = false
    }
    let valor = txtBuscarPokemon.value
    buscarPokemon(valor)
    mensaje('Desplegando resultados')
})

btnPokemonRandom.addEventListener('click', ()=>{
    printCards(txtBuscarPokemon.value)
})

window.addEventListener('keydown', (e)=>{
    if(document.activeElement == txtBuscarPokemon && e.key == "Enter"){
        if (randomActivated) {
            dataZone.innerHTML = ""
            randomActivated = false
        }
        let valor = txtBuscarPokemon.value
        buscarPokemon(valor)
        mensaje('Desplegando resultados')
    }
})

function buscarPokemon(valor) {

    let ruta = `https://pokeapi.co/api/v2/pokemon-form/${valor}/`

    fetch(ruta)
    .then(response => response.json())
    .then(json => printData(json))
    .catch(err => mensaje('Pokemon no encontrado :(')); 
    
}

function printData(data){
    let tipos = ""
    let deFrente = ""
    let atras = ""
    let deFrenteShiny = ""
    let atrasShiny = ""
    let esMacho = ""

    let deFrenteFemenino = ""
    let atrasFemenino = ""
    let deFrenteShinyFemenino = ""
    let atrasShinyFemenino = ""

    for(let element in data.types){
        tipos += `<span class="pkm-type ${data.types[element].type.name}"> <b>${capitalizeFirstLetter(replacer(data.types[element].type.name))}</b></span>`
    }

        //femeninos
        if (data.sprites.front_female != null) {
            esMacho = "(Macho)"
            deFrenteFemenino = `
            <p>De frente (Hembra)</p>
            <img class="activator" src="${data.sprites.front_female}">
        `
        }
    
        if (data.sprites.back_female != null) {
            esMacho = "(Macho)"
            atrasFemenino = `
            <p>Atrás (Hembra)</p>
            <img class="activator" src="${data.sprites.back_female}">
        `
        }
    
        if (data.sprites.front_shiny_female != null) {
            esMacho = "(Macho)"
            deFrenteShinyFemenino = `
            <p>De frente shiny (hembra)</p>
            <img class="activator" src="${data.sprites.front_shiny_female}">
        `
        }
    
        if (data.sprites.back_shiny_female != null) {
            esMacho = "(Macho)"
            atrasShinyFemenino = `
            <p>Atrás shiny (hembra)</p>
            <img class="activator" src="${data.sprites.back_shiny_female}">
        `
        }

        //machos

    if (data.sprites.front_default != null) {
        deFrente = `
            <p>De frente ${esMacho}</p>
            <img class="activator" src="${data.sprites.front_default}">
        `
    }

    if (data.sprites.back_default != null) {
        atras = `
            <p>Atrás ${esMacho}</p>
            <img class="activator" src="${data.sprites.back_default}">
        `
    }

    if (data.sprites.front_shiny != null) {
        deFrenteShiny = `
            <p>De frente shiny ${esMacho}</p>
            <img class="activator" src="${data.sprites.front_shiny}">
        `
    }

    if (data.sprites.back_shiny != null) {
        atrasShinyFemenino = `
            <p>Atrás shiny ${esMacho}</p>
            <img class="activator" src="${data.sprites.back_shiny}">
        `
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
                      <span class="card-title grey-text text-darken-4">${capitalizeFirstLetter(data.name)}<i class="material-icons right">close</i></span>
                      <p>Número: ${data.id}</p>
                      <p>Típos:</p>
                      <p id="type${data.id}">
                      ${tipos}
                      </p>
                      <p>Generación: ${data.version_group.name}</p>
                      <p><b>Imagenes</b></p>
                        ${deFrente}
                        ${atras}
                        ${deFrenteShiny}
                        ${atrasShiny}
                        ${deFrenteFemenino}
                        ${atrasFemenino}
                        ${deFrenteShinyFemenino}
                        ${atrasShinyFemenino}
                    </div>
                </div>
            </div>
        <!--</div>-->
    `
}

function printCards(cantidad = null){
    randomActivated = true
    dataZone.innerHTML = ""
    let cantidadCartas = 0
    try {
        cantidad = parseInt(cantidad)
    } catch (error) {
        
    }
    if (cantidad != null && Number.isInteger(cantidad)) {
        if (cantidad > 200) {
            cantidadCartas = 50
            mensaje('Desplegando 200 resultados')
        }else{
            cantidadCartas = cantidad
            mensaje('Desplegando '+cantidad+' resultados')
        }
    }else{
        cantidadCartas = random(5, 50)
        mensaje('Desplegando '+cantidadCartas+' resultados')
    }
    
    for (let i = 0; i < cantidadCartas; i++) {
        let valor = random(1, 1025)
        buscarPokemon(valor)
    }
}

function printType(id, text){
    window.addEventListener('DOMContentLoaded', ()=>{
        let tipos = document.getElementById('type'+id)
        tipos.innerHTML += text
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function mensaje(mensaje){
    displayMessage.innerHTML = mensaje
}

function replacer(text){
    let respuesta = text 
    switch (text) {
        case "normal":
            respuesta = text.replace("normal", "normal")
            break;
        case "fire":
            respuesta = text.replace("fire", "fuego")
            break;
        case "water":
            respuesta = text.replace("water", "agua")
            break;
        case "electric":
            respuesta = text.replace("electric", "eléctrico")
            break;
        case "grass":
            respuesta = text.replace("grass", "planta")
            break;
        case "ice":
            respuesta = text.replace("ice", "hielo")
            break;
        case "fighting":
            respuesta = text.replace("fighting", "lucha")
            break;
        case "poison":
            respuesta = text.replace("poison", "veneno")
            break;
        case "ground":
            respuesta = text.replace("ground", "tierra")
            break;
        case "flying":
            respuesta = text.replace("flying", "volador")
            break;
        case "psychic":
            respuesta = text.replace("psychic", "psíquico")
            break;
        case "bug":
            respuesta = text.replace("bug", "bicho")
            break;
        case "rock":
            respuesta = text.replace("rock", "piedra")
            break;
        case "ghost":
            respuesta = text.replace("ghost", "fantasma")
            break;
        case "dragon":
            respuesta = text.replace("dragon", "dragón")
            break;
        case "dark":
            respuesta = text.replace("dark", "siniestro")
            break;
        case "steel":
            respuesta = text.replace("steel", "acero")
            break;
        case "fairy":
            respuesta = text.replace("fairy", "hada")
            break;
    
        default:
            text
            break;
    } 

    return respuesta
}


//getting the names




document.addEventListener('DOMContentLoaded', function() {
    let data = {}
    getAllNames()
    Object.keys(data).forEach(function(key) {

    })
    let element = document.getElementById('txtBuscarPokemon')
    let instance = M.Autocomplete.init(element)
    instance.updateData(data)

    function getAllNames(){
        for (let i = 1; i <= 1025; i++) {
            setDataNames(i)
        }
    }
    
    function setDataNames(valor){
        let ruta = `https://pokeapi.co/api/v2/pokemon-form/${valor}/`
    
        fetch(ruta)
        .then(response => response.json())
        .then(json => storeNames(json))
    }
    
    function storeNames(theData){
        //data.push(theData.name)
        data[theData.name] = null
    }

});

