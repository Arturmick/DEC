let peticion;
let datos;
let descripcion;
let correcto = false;

document.addEventListener('DOMContentLoaded', () => {  
    
    let url = `https://pokeapi.co/api/v2/pokemon/`;
    let promesa = fetch(url);
    let promesa2 = promesa.then(respuesta => respuesta.json());
    promesa2.then(datos => {
        console.log(datos);
    });
});