let peticion;
let datos;
let descripcion;
let correcto = false;
let num = 1;
let statsJugador = [[],[],[],[],[]];
let statsMachine = [[],[],[],[],[]];

document.addEventListener('DOMContentLoaded', () => {  
    
    statsJugador[0] = buscarApi(num);
    
});

function buscarApi(num) {

    let pokemonArray = [];
    let url = `https://pokeapi.co/api/v2/pokemon/${num}/`;
    let promesa = fetch(url);
    let promesa2 = promesa.then(respuesta => respuesta.json());
    promesa2.then(datos => {

        let nombre = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
        let numero = datos.id;
        let imagen = datos.sprites.other['official-artwork'].front_default;
        let imagenDetras = datos.sprites.back_default;
        let hp = datos.stats['0'].base_stat;
        let ataque = datos.stats['1'].base_stat;
        let defensa = datos.stats['2'].base_stat;
        let ataqueEspecial = datos.stats['3'].base_stat;
        let defensaEspecial = datos.stats['4'].base_stat;
        let velocidad = datos.stats['5'].base_stat;

        pokemonArray = [imagen,imagenDetras,nombre,numero,hp,ataque,defensa,ataqueEspecial,defensaEspecial,velocidad];
        
        console.log(pokemonArray);
        console.log(datos);
    });
    return pokemonArray;
}