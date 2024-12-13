let peticion;
let modelos;
let descripcion;
let correcto = false;

document.addEventListener('DOMContentLoaded', () => {
    cargarEventos();
});

function cargarEventos() {
    document.getElementById('boton').addEventListener('click', (event) => {
        event.preventDefault();
        ajax();
    });
}

function ajax() {  
    let pokemonNumber = document.getElementById('pokemonNumber').value;
    let pokemonName = document.getElementById('pokemonName').value;
    let url = pokemonNumber ? `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}` : `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    console.log(pokemonName);
    console.log(pokemonNumber);

    peticion = new XMLHttpRequest();
    movidas('GET', url, true);
    peticion.onreadystatechange = mostrar;
}

function movidas (get, url, boolean) {
    console.log(url);
    peticion.open(get, url, boolean);
    peticion.send();    
}

function mostrar () {
    if (peticion.readyState === 4 && peticion.status === 200) {
        modelos = peticion.responseText.querySelector('Results');
        procesar();
        console.log(modelos);
    }
}

function procesar () {
    let modelo = document.getElementById('ModelsForMake');

    let tabla = document.createElement('table');

    tabla.appendChild
    
    let marca = document.getElementById('marca');
    
    let descripcion = document.getElementById('descripcion');
    let imagen = document.getElementById('imagen');
    let url = document.getElementById('url');

    marca.textContent = marca;
    modelo.textContent = modelo;
    descripcion.textContent = descripcion;
    imagen.src = imagen;
    url.href = url;
}