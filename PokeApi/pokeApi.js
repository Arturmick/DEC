let peticion;
let datos;

document.addEventListener('DOMContentLoaded', () => {
    ajax();
});

function ajax() {   
    peticion = new XMLHttpRequest();

    peticion.open('GET', 'https://pokeapi.co/api/v2/pokemon/pikachu', true);

    peticion.send();

    //peticion.addEventListener('readystatechange', mostrar);

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