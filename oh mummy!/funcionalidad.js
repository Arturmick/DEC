const tablero = [];
const filas = 13;
const columnas = 21;
let inicio = true;
let pasoDerecho = true;
let posicionPersonaje = { fila: 0, columna: 10 }; // Posición inicial de personaje1
let posicionMomia = "";
let tiempoMomia = 1000;

document.addEventListener('DOMContentLoaded', () => {
    cargarEventos(); 
    crearTablero();
    posicionMomia = obtenerPosicionAleatoriaPasillo();

    tablero[12][20].classList.add('momia1');
    tablero[12][20].style.transform = 'scaleX(-1)'; 
      
    tablero[posicionMomia.fila][posicionMomia.columna].classList.add('momia1');
    tablero[posicionMomia.fila][posicionMomia.columna].style.transform = 'scaleX(-1)';

    
});

function cargarEventos() {
    document.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('celda')) {
            console.log(`Clicked on cell at position: ${evento.target.dataset.position}`);
        }
    });
    
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'ArrowDown' && inicio) {
            const imagenSalida = document.querySelector('#salida img');
            salida.style.backgroundColor = 'rgb(228, 228, 2)';
            imagenSalida.remove(); 
            tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje1');            
            iniciarMovimientoMomia();
            inicio = false;
        }
        if (evento.key === 'ArrowDown'){
            if (posicionPersonaje.fila < 12 && posicionPersonaje.columna % 4 === 0) {
                quitarClases();
                posicionPersonaje.fila += 1;
                if(pasoDerecho){
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje3');
                }else {
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje3r');
                }
                pasoDerecho = !pasoDerecho;
                tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('entrarPorArriba');
            }
        }
        if (evento.key === 'ArrowUp'){
            if (posicionPersonaje.fila > 0 && posicionPersonaje.columna % 4 === 0) {
                quitarClases();
                posicionPersonaje.fila -= 1;
                if(pasoDerecho){
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje4');
                }else {
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje4r');
                }
                pasoDerecho = !pasoDerecho;
                tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('entrarPorAbajo');
            }            
        }
        if (evento.key === 'ArrowLeft'){
            if (posicionPersonaje.columna > 0 && posicionPersonaje.fila % 3 === 0) {
                quitarClases();
                posicionPersonaje.columna -= 1;
                if(pasoDerecho){
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje1r');
                }else {
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje2r');
                }
                pasoDerecho = !pasoDerecho;
                tablero[posicionPersonaje.fila][posicionPersonaje.columna].style.transform = 'scaleX(-1)';
                tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('entrarPorDerecha');
            }
        }
        if (evento.key === 'ArrowRight'){
            if (posicionPersonaje.columna < 20 && posicionPersonaje.fila % 3 === 0) {
                quitarClases();
                posicionPersonaje.columna += 1;
                if(pasoDerecho){
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje1');
                }else {
                    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('personaje2');
                }
                pasoDerecho = !pasoDerecho;
                tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.add('entrarPorIzquierda');
            }
        }
    });
}

function quitarClases() {
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

    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia1');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia2');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia3');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia4');

    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia1r');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia2r');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia3r');
    tablero[posicionPersonaje.fila][posicionPersonaje.columna].classList.remove('momia4r');
}

function crearTablero() {
    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.dataset.position = `${i} ${j}`;
            if (j % 4 === 0 || i % 3 === 0) {
                celda.classList.add('pasillo');
            }
            pantalla.appendChild(celda);
            fila.push(celda);
        }
        tablero.push(fila);
    }
}

function obtenerPosicionAleatoriaPasillo() {
    let fila, columna;
    do {
        fila = Math.floor(Math.random() * filas);
        columna = Math.floor(Math.random() * columnas);
    } while (!tablero[fila][columna].classList.contains('pasillo'));
    return { fila, columna };
}

function iniciarMovimientoMomia() {
    setInterval(() => {
        moverMomia();
    }, tiempoMomia); 
}

function moverMomia() {
    const direcciones = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    let direccion;
    let nuevaFila = posicionMomia.fila;
    let nuevaColumna = posicionMomia.columna;

    if ((posicionMomia.fila % 3 === 0 && posicionMomia.columna % 4 === 0)){
        direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    }else if((posicionMomia.fila % 3 === 0 && posicionMomia.columna % 4 !== 0) && inicio) {
        direccion = direcciones.filter(dir => dir === 'ArrowLeft' || dir === 'ArrowRight')[Math.floor(Math.random() * 2)];
    }else if ((posicionMomia.fila % 3 !== 0 && posicionMomia.columna % 4 === 0) && inicio) {
        direccion = direcciones.filter(dir => dir === 'ArrowUp' || dir === 'ArrowDown')[Math.floor(Math.random() * 2)];
    }
    do {        
        nuevaFila = posicionMomia.fila;
        nuevaColumna = posicionMomia.columna;

        if (direccion === 'ArrowUp' && posicionMomia.fila > 0) {
            nuevaFila = posicionMomia.fila - 1;
        } else if (direccion === 'ArrowDown' && posicionMomia.fila < filas - 1) {
            nuevaFila = posicionMomia.fila + 1;
        } else if (direccion === 'ArrowLeft' && posicionMomia.columna > 0) {
            nuevaColumna = posicionMomia.columna - 1;
        } else if (direccion === 'ArrowRight' && posicionMomia.columna < columnas - 1) {
            nuevaColumna = posicionMomia.columna + 1;
        }
    } while (!tablero[nuevaFila][nuevaColumna] || !tablero[nuevaFila][nuevaColumna].classList.contains('pasillo'));

    tablero[posicionMomia.fila][posicionMomia.columna].classList.remove('momia1');
    posicionMomia.fila = nuevaFila;
    posicionMomia.columna = nuevaColumna;
    tablero[posicionMomia.fila][posicionMomia.columna].classList.add('momia1');
}
