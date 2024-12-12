let peticion;
let datos;

document.addEventListener('DOMContentLoaded', () => {
    ajax();
    cargarEventos();
});

function ajax() {  
    let pokemonNumber = document.getElementById('pokemonNumber').value;
    let pokemonName = document.getElementById('pokemonName').value;
    let url = pokemonNumber ? `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}` : `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    peticion = new XMLHttpRequest();
    peticion.open('GET', url, true);
    peticion.send();
    peticion.onreadystatechange = mostrar;
}

function mostrar () {
    if (peticion.readyState === 4 && peticion.status === 200) {
        datos = peticion.responseXML;
        procesar();
        console.log(datos);
    }
}
function procesar() {
    //window.body.innerHTML = xml;
}
function procesar() {
    datos = JSON.parse(peticion.responseText);
    let nombree = datos.name;
    let numeroo = datos.id;
    let habilidades = datos.abilities.map(habilidad => habilidad.ability.name).join(', ');
    let sprite = datos.sprites.other['official-artwork'].front_default;
    let ataques = datos.moves.map(ataque => ataque.move.name).join(', ');
   
       

    //<p>Habilidades: ${habilidades}</p>

    nombre.innerHTML = `
        <h1>${nombree}</h1>
        
    `;
    numero.innerHTML = `
        <h1>${numeroo}</h1>
    `;
    foto.innerHTML = `
        <img src="${sprite}" alt="${nombree}">
    `;
    informacion.innerHTML = `
        <p>Habilidades: ${habilidades}</p>
        <p>Descripción: ${descripcion}</p>
    `;
}