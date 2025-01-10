let peticion;
let datos;
let descripcion;
let correcto = false;
let num = 1;
let statsJugador = [];
let statsMachine = [];

document.addEventListener('DOMContentLoaded', async () => {  
    
    statsJugador[0] = await buscarApi(9);
    statsJugador[1] = await buscarApi(num + 1);
    statsJugador[2] = await buscarApi(num + 2);
    statsJugador[3] = await buscarApi(num + 3);
    statsJugador[4] = await buscarApi(num + 4);

    statsMachine[0] = await buscarApi(6);
    statsMachine[1] = await buscarApi(num + 6);
    statsMachine[2] = await buscarApi(num + 7);
    statsMachine[3] = await buscarApi(num + 8);
    statsMachine[4] = await buscarApi(num + 9);
    
    console.table(statsJugador);

    jugadaPlayer.innerHTML = `
        <img src="${statsJugador[0][1]}" alt="${statsJugador[0][2]}">
        `;
    pokemon1.innerHTML = `
        <img src="${statsJugador[0][0]}" alt="${statsJugador[0][2]}">
        `;
    jugadaMachine.innerHTML = `
        <img src="${statsMachine[0][0]}" alt="${statsMachine[0][2]}">
        `;
    

});

async function buscarApi(num) {

    let pokemonArray = [];
    let url = `https://pokeapi.co/api/v2/pokemon/${num}/`;

    await fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

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

        pokemonArray[0] = imagen;
        pokemonArray[1] = imagenDetras;        
        pokemonArray[2] = numero;
        pokemonArray[3] = nombre;        
        pokemonArray[4] = hp;
        pokemonArray[5] = ataque;
        pokemonArray[6] = defensa;
        pokemonArray[7] = ataqueEspecial;
        pokemonArray[8] = defensaEspecial;
        pokemonArray[9] = velocidad;
        
        console.log(pokemonArray);
        console.log(datos);

    });
    return pokemonArray;
}