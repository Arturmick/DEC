const tablero = [];
const verificacionCasilla = [];
const filas = 13;
const columnas = 21;
const premios = {
    llave: true,
    cofre: true,
    potion: true,
    sarcofago: true,
    momiaPremio: true
};

let intervaloMomia;
let imagenSalida;
let vidas = 5;
let inicio = true;
let pasoDerechoPersonaje = true;
let pasoDerechoMomia = true;
let posicionPersonaje = { fila: 0, columna: 10 }; 
let posicionMomia = "";
let tiempoMomia = 500;
let direccion;
let bloquesTesoros = [20]; bloquesTesoros.fill(false);    
let potion = false;
let llave = false;
let sarcofago = false;
let puntuacion = 0;

document.addEventListener('DOMContentLoaded', () => {
      
    crearTablero();
    cargarEventos(); 
    pelea();
    posicionMomia = obtenerPosicionAleatoriaPasillo(); 
    tablero[posicionMomia.fila][posicionMomia.columna].classList.add('momia1'); 
});

function cargarEventos() {
    document.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('celda')) {
            console.log(`Clicked on cell at position: ${evento.target.dataset.position}`);
            console.log(verificacionCasilla[evento.target.dataset.position.split(' ')[0]][evento.target.dataset.position.split(' ')[1]]);
        
        }
    });
    
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'ArrowDown' && inicio) {            
            salida.style.backgroundColor = 'rgb(228, 228, 2)';
            document.getElementById('salida').querySelector('img').remove();            
            tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje1'); 
            verificacionCasilla[posicionPersonaje.fila][posicionPersonaje.columna] = true;           
            iniciarMovimientoMomia();
            inicio = false;
        }
        if (evento.key === 'ArrowDown' && !inicio) {
            if (posicionPersonaje.fila < 12 && posicionPersonaje.columna % 4 === 0) {
                anadirPasos('pasos3');
                quitarClasesPersonaje();                
                posicionPersonaje.fila += 1;
                verificarCasilla();
                cambiarSpritePersonaje('personaje3', 'entrarPorArriba');
            }
        }
        if (evento.key === 'ArrowUp'  && !inicio){
            if (posicionPersonaje.fila > 0 && posicionPersonaje.columna % 4 === 0) {
                anadirPasos('pasos4');
                quitarClasesPersonaje();                
                posicionPersonaje.fila -= 1;
                verificarCasilla();
                cambiarSpritePersonaje('personaje4', 'entrarPorAbajo');                
            }            
        }
        if (evento.key === 'ArrowLeft' && !inicio){
            if (posicionPersonaje.columna > 0 && posicionPersonaje.fila % 3 === 0) {
                anadirPasos('pasos2');
                quitarClasesPersonaje();                
                posicionPersonaje.columna -= 1;
                verificarCasilla();
                cambiarSpritePersonaje('personaje2', 'entrarPorDerecha');
            }
        }
        if (evento.key === 'ArrowRight' && !inicio){
            if (posicionPersonaje.columna < 20 && posicionPersonaje.fila % 3 === 0) {
                anadirPasos('pasos1');
                quitarClasesPersonaje();                
                posicionPersonaje.columna += 1;
                verificarCasilla();
                cambiarSpritePersonaje('personaje1', 'entrarPorIzquierda');
            }
        }
        pelea();
    });
}


function crearTablero() {
    const elementos = [
        { tipo: 'llave', cantidad: 1 },
        { tipo: 'cofre', cantidad: 11 },
        { tipo: 'potion', cantidad: 1 },
        { tipo: 'sarcofago', cantidad: 1 },
        { tipo: 'momiaPremio', cantidad: 1 },
        { tipo: '', cantidad: 5 } 
    ];

    for (let i = 0; i < filas; i++) {
        const fila = [];
        const filaVerificacion = [];
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.dataset.position = `${i} ${j}`;
            if (j % 4 === 0 || i % 3 === 0) {
                celda.classList.add('pasillo');
            }
            pantalla.appendChild(celda);
            fila.push(celda);
            filaVerificacion.push(false);
        }
        tablero.push(fila);
        verificacionCasilla.push(filaVerificacion);
    }

    for (let i = 1; i <= 10; i += 3) {
        for (let j = 2; j <= 18; j += 4) {
            if (elementos.length > 0) {
                const index = Math.floor(Math.random() * elementos.length);
                const elemento = elementos[index];
                if (elemento.tipo !== '') {
                    tablero[i][j-1].classList.add(elemento.tipo + '11', 'oculto');
                    tablero[i][j].classList.add(elemento.tipo + '12', 'oculto');
                    tablero[i][j+1].classList.add(elemento.tipo + '13', 'oculto');
                    tablero[i+1][j-1].classList.add(elemento.tipo + '21', 'oculto');
                    tablero[i+1][j].classList.add(elemento.tipo + '22', 'oculto');
                    tablero[i+1][j+1].classList.add(elemento.tipo + '23', 'oculto');
                }
                elemento.cantidad--;
                if (elemento.cantidad === 0) {
                    elementos.splice(index, 1);
                }
            }
        }
    }
}

function obtenerPosicionAleatoriaPasillo() {
    let fila, columna;
    do {
        fila = Math.floor(Math.random() * filas);
        columna = Math.floor(Math.random() * columnas);
    } while (!tablero[fila][columna].classList.contains('pasillo') || fila % 3 !== 0 || columna % 4 !== 0);
    return { fila, columna };
}

function iniciarMovimientoMomia() {
    intervaloMomia = setInterval(() => {        
        moverMomia(); 
        pelea();      
    }, tiempoMomia); 
}

function verificarCasilla() {
    verificacionCasilla[posicionPersonaje.fila][posicionPersonaje.columna] = true;
    
    comprobarCeldasRodeadas();
}

function comprobarCeldasRodeadas() {
    const bloques = [
        { fila: 0, col: 0, index: 0 },
        { fila: 0, col: 4, index: 1 },
        { fila: 3, col: 0, index: 5 },
        { fila: 3, col: 4, index: 6 },

        { fila: 6, col: 0, index: 10 },
        { fila: 6, col: 4, index: 11 },
        { fila: 9, col: 0, index: 15 },
        { fila: 9, col: 4, index: 16 },

        { fila: 0, col: 8, index: 2 },
        { fila: 0, col: 12, index: 3 },
        { fila: 3, col: 8, index: 7 },
        { fila: 3, col: 12, index: 8 },

        { fila: 6, col: 8, index: 12 },
        { fila: 6, col: 12, index: 13 },
        { fila: 9, col: 8, index: 17 },
        { fila: 9, col: 12, index: 18 },

        { fila: 0, col: 16, index: 4 },        
        { fila: 3, col: 16, index: 9 },
        
        { fila: 6, col: 16, index: 14 },        
        { fila: 9, col: 16, index: 19 }        
    ];

    bloques.forEach(bloque => {
        if (verificacionCasilla[3][4] == true && verificacionCasilla[bloque.fila][bloque.col] == true && !bloquesTesoros[bloque.index]) {
            if (comprobarBloques(bloque.fila, bloque.col)) {
                bloquesTesoros[bloque.index] = true;
                console.log(`Rodeado${bloque.index}`);
                quitarOculto(bloque.fila, bloque.col); 
                comprobarPremio(bloque.fila, bloque.col);
                console.log(tablero[bloque.fila+1][bloque.col+1].classList.contains('llave11'));
                              
            }
        }
        if (verificacionCasilla[9][4] == true && verificacionCasilla[bloque.fila][bloque.col] == true && !bloquesTesoros[bloque.index]) {
            if (comprobarBloques(bloque.fila, bloque.col)) {
                bloquesTesoros[bloque.index] = true;
                console.log(`Rodeado${bloque.index}`);
                quitarOculto(bloque.fila, bloque.col); 
                comprobarPremio(bloque.fila, bloque.col);
                console.log(tablero[bloque.fila+1][bloque.col+1].classList.contains('llave11'));               
            }
        }
        if (verificacionCasilla[3][12] == true && verificacionCasilla[bloque.fila][bloque.col] == true && !bloquesTesoros[bloque.index]) {
            if (comprobarBloques(bloque.fila, bloque.col)) {
                bloquesTesoros[bloque.index] = true;
                console.log(`Rodeado${bloque.index}`);
                quitarOculto(bloque.fila, bloque.col); 
                comprobarPremio(bloque.fila, bloque.col);
                console.log(tablero[bloque.fila+1][bloque.col+1].classList.contains('llave11'));               
            }
        }
        if (verificacionCasilla[9][12] == true && verificacionCasilla[bloque.fila][bloque.col] == true && !bloquesTesoros[bloque.index]) {
            if (comprobarBloques(bloque.fila, bloque.col)) {
                bloquesTesoros[bloque.index] = true;
                console.log(`Rodeado${bloque.index}`);
                quitarOculto(bloque.fila, bloque.col); 
                comprobarPremio(bloque.fila, bloque.col);
                console.log(tablero[bloque.fila+1][bloque.col+1].classList.contains('llave11'));               
            }
        }
        if (verificacionCasilla[3][20] == true && verificacionCasilla[bloque.fila][bloque.col] == true && !bloquesTesoros[bloque.index]) {
            if (comprobarBloques(bloque.fila, bloque.col)) {
                bloquesTesoros[bloque.index] = true;
                console.log(`Rodeado${bloque.index}`);
                quitarOculto(bloque.fila, bloque.col); 
                comprobarPremio(bloque.fila, bloque.col);
                console.log(tablero[bloque.fila+1][bloque.col+1].classList.contains('llave11'));               
            }
        }
        if (verificacionCasilla[9][20] == true && verificacionCasilla[bloque.fila][bloque.col] == true && !bloquesTesoros[bloque.index]) {
            if (comprobarBloques(bloque.fila, bloque.col)) {
                bloquesTesoros[bloque.index] = true;
                console.log(`Rodeado${bloque.index}`);
                quitarOculto(bloque.fila, bloque.col); 
                comprobarPremio(bloque.fila, bloque.col); 
                console.log(tablero[bloque.fila+1][bloque.col+1].classList.contains('llave11'));              
            }
        }
    });
}
function comprobarBloques(num1,num2) {
   
    if (verificacionCasilla[num1][num2 + 1] == true &&
        verificacionCasilla[num1][num2 + 2] == true &&
        verificacionCasilla[num1][num2 + 3] == true &&
        verificacionCasilla[num1][num2 + 4] == true &&
        verificacionCasilla[num1 + 1][num2] == true &&
        verificacionCasilla[num1 + 1][num2 + 4] == true &&
        verificacionCasilla[num1 + 2][num2] == true &&
        verificacionCasilla[num1 + 2][num2 + 4] == true &&
        verificacionCasilla[num1 + 3][num2] == true &&
        verificacionCasilla[num1 + 3][num2 + 1] == true &&
        verificacionCasilla[num1 + 3][num2 + 2] == true &&
        verificacionCasilla[num1 + 3][num2 + 3] == true &&
        verificacionCasilla[num1 + 3][num2 + 4] == true) {
        
        return true;
    }    
    return false;
}


function moverMomia() {  
    let nuevaFila = posicionMomia.fila;
    let nuevaColumna = posicionMomia.columna;

    calculoDireccion(); // Calculate direction for the mummy

    if (direccion === 'ArrowUp') {
        nuevaFila -= 1;
    } else if (direccion === 'ArrowDown') {
        nuevaFila += 1;
    } else if (direccion === 'ArrowLeft') {
        nuevaColumna -= 1;
    } else if (direccion === 'ArrowRight') {
        nuevaColumna += 1;
    }

    if (tablero[nuevaFila] && tablero[nuevaFila][nuevaColumna] && tablero[nuevaFila][nuevaColumna].classList.contains('pasillo')) {
        quitarClasesMomia();        
        posicionMomia = { fila: nuevaFila, columna: nuevaColumna }; // Update the mummy's position
        cambiarSpriteMomia(`momia${direccion === 'ArrowUp' ? 4 : direccion === 'ArrowDown' ? 3 : direccion === 'ArrowLeft' ? 2 : 1}`, `entrarPor${direccion === 'ArrowUp' ? 'Abajo' : direccion === 'ArrowDown' ? 'Arriba' : direccion === 'ArrowLeft' ? 'Derecha' : 'Izquierda'}`, nuevaFila, nuevaColumna);
    }
}

function cambiarSpritePersonaje (sprite, animacion) {

    if(pasoDerechoPersonaje){
        tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add(sprite);
    }else {
        tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add(sprite + 'r');
    }    
    pasoDerechoPersonaje = !pasoDerechoPersonaje;

    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add(animacion);
}

function cambiarSpriteMomia (sprite, animacion, fila, columna) {
    if (pasoDerechoMomia) {
        tablero[fila][columna].classList.add(sprite);
    } else {
        tablero[fila][columna].classList.add(sprite + 'r');
    }
    pasoDerechoMomia = !pasoDerechoMomia;
    tablero[fila][columna].classList.add(animacion);
}

function calculoDireccion() {
    const direcciones = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];    

    if (posicionMomia.fila === 0 && posicionMomia.columna === 0) {
        direccion = direcciones.filter(d => d !== 'ArrowUp' && d !== 'ArrowLeft')[Math.floor(Math.random() * 2)];
    } else if (posicionMomia.fila === 12 && posicionMomia.columna === 0) {
        direccion = direcciones.filter(d => d !== 'ArrowDown' && d !== 'ArrowLeft')[Math.floor(Math.random() * 2)];
    } else if (posicionMomia.fila === 12 && posicionMomia.columna === 20) {
        direccion = direcciones.filter(d => d !== 'ArrowDown' && d !== 'ArrowRight')[Math.floor(Math.random() * 2)];
    } else if (posicionMomia.fila === 0 && posicionMomia.columna === 20) {
        direccion = direcciones.filter(d => d !== 'ArrowUp' && d !== 'ArrowRight')[Math.floor(Math.random() * 2)];
    } else if (posicionMomia.fila === 0 && posicionMomia.columna % 4 === 0) {
        direccion = direcciones.filter(d => d !== 'ArrowUp')[Math.floor(Math.random() * (direcciones.length - 1))];
    } else if (posicionMomia.fila === 12 && posicionMomia.columna % 4 === 0) {
        direccion = direcciones.filter(d => d !== 'ArrowDown')[Math.floor(Math.random() * (direcciones.length - 1))];
    } else if (posicionMomia.fila % 3 === 0 && posicionMomia.columna === 0) {
        direccion = direcciones.filter(d => d !== 'ArrowLeft')[Math.floor(Math.random() * (direcciones.length - 1))];
    } else if (posicionMomia.fila % 3 === 0 && posicionMomia.columna === 20) {
        direccion = direcciones.filter(d => d !== 'ArrowRight')[Math.floor(Math.random() * (direcciones.length - 1))];
    } else if (posicionMomia.fila % 3 === 0 && posicionMomia.columna % 4 === 0) {
        direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    }

    return direccion;
}

function comprobarPremio(fila, columna) {

    if (tablero[fila + 1][columna + 1].classList.contains('llave11')) {
        llave = true;
        console.log('llave');
    } else if (tablero[fila + 1][columna + 1].classList.contains('cofre11')) {
        puntuacion += 100;
        marcador1.innerHTML = puntuacion.toString().padStart(8, '0');
        console.log('cofre');
    } else if (tablero[fila + 1][columna + 1].classList.contains('potion11')) {
        potion = true;
        console.log('potion');
    } else if (tablero[fila + 1][columna + 1].classList.contains('sarcofago11')) {
        sarcofago = true;
        console.log('sarcofago');
    }else if (tablero[fila + 1][columna + 1].classList.contains('momiaPremio11')) {
        console.log('momiaPremio');
        
    }
}

function quitarClasesPersonaje() {
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje4');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje1');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje2');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje3');

    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje4r');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje1r');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje2r');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('personaje3r');

    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('entrarPorArriba');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('entrarPorAbajo');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('entrarPorDerecha');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('entrarPorIzquierda');    
}
function quitarClasesMomia() {
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia1');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia2');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia3');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia4');

    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia1r');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia2r');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia3r');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia4r');

    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('entrarPorArriba');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('entrarPorAbajo');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('entrarPorDerecha');
    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('entrarPorIzquierda');
}
function anadirPasos(pasos) {
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('pasos1');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('pasos2');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('pasos3');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('pasos4');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add(pasos);
    
}
function quitarOculto(fila, columna) {
    tablero[fila + 1][columna + 1].classList.remove('oculto');
    tablero[fila + 1][columna + 2].classList.remove('oculto');
    tablero[fila + 1][columna + 3].classList.remove('oculto');
    tablero[fila + 2][columna + 1].classList.remove('oculto');
    tablero[fila + 2][columna + 2].classList.remove('oculto');
    tablero[fila + 2][columna + 3].classList.remove('oculto');
}
function pelea(){

    setInterval(() => {
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const celda = tablero[i][j];
                if (/momia\d/.test(celda.className) && /personaje\d/.test(celda.className)) {
                    console.log(`Colisión detectada en la celda: ${i}, ${j}`); 
                    console.log('Pocion', potion);
                    if(potion) {
                        celda.classList.remove('momia1', 'momia2', 'momia3', 'momia4', 'momia1r', 'momia2r', 'momia3r', 'momia4r');
                            console.log('Muerte a la momia');  
                            clearInterval(intervaloMomia); // Stop the mummy's movement
                            posicionMomia = null; // Remove the mummy from the board
                    }else {
                        vidas--;
                        marcador2.querySelector('img').remove();
                        celda.classList.remove('personaje1', 'personaje2', 'personaje3', 'personaje4', 'personaje1r', 'personaje2r', 'personaje3r', 'personaje4r');
                        casillaSalida();
                    }  
                }
            }
        }
    }, 500);        
}
function casillaSalida() {
    const img = document.createElement('img');

    salida.classList.remove('oculto');
    salida.style.backgroundColor = 'black';
    inicio = true;
    posicionPersonaje = { fila: 0, columna: 10 }; 
    
    img.src = 'Fotos/personaje/personaje3.png';     
    document.getElementById('salida').appendChild(img);   
}
