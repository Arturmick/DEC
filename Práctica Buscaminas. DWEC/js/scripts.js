// He buscado una forma de poder acceder a las constantes desde cualquier función
// y he metido todo dentro de un evento "DOMContentLoaded", no se si es correcto, porque he 
// visto que esto me asegura poder acceder al DOM sin que haya elementos que no se hayan cargado
// pero tiene el inconveniente de que no puedo acceder a nada desde otros scripts si el programa
// se hiciese más grande.

document.addEventListener("DOMContentLoaded", () => {

    // Referencias del DOM
    const btnEmpezar = document.getElementById("empezar");
    const numMinasInput = document.getElementById("numMinas");
    const tablero = document.getElementById("tablero");
    const errorDiv = document.getElementById("error");
    const puntosDiv = document.getElementById("puntos");
    const protector = document.getElementById("protector");
    const mensajeFinal = document.getElementById("mensajeFinal");

    let numMinas = 0;
    let puntuacion = 0;
    let casillasDestapadas = 0;
    let minasPosiciones = [];
    const TOTAL_CASILLAS = 100;

    // Asociar eventos al botón "Empezar"
    btnEmpezar.addEventListener("click", iniciarJuego);
    
    // Función para inicializar el juego
    function iniciarJuego() {
        numMinas = parseInt(numMinasInput.value);

        if (isNaN(numMinas) || numMinas < 5 || numMinas > 50) {

            errorDiv.textContent = "Tiene que ser un valor entre 5 y 50";
            return;
        }

        // Limpio el tablero
        errorDiv.textContent = "";
        tablero.innerHTML = "";        
       
        crearTablero();
    }

    // Función para crear el tablero, he añadido la clase "oculto" a las casillas y he añadido un índice
    function crearTablero() {
        minasPosiciones = generarMinas(numMinas, TOTAL_CASILLAS);

        for (let i = 0; i < TOTAL_CASILLAS; i++) {

            const casilla = document.createElement("div");
            casilla.classList.add("casilla", "oculto");
            casilla.dataset.index = i;
           
            casilla.addEventListener("click", () => destaparCasilla(casilla));
        
            tablero.appendChild(casilla);
        }
    }

    // Función para generar posiciones de minas únicas, he utilizado Set mirando los apuntes de java
    // del año pasado, recordaba que había un array que no permitía duplicados

    function generarMinas(num, total) {

        const posiciones = new Set();

        while (posiciones.size < num) {

            posiciones.add(Math.floor(Math.random() * total));
        }
        return Array.from(posiciones);
    }

    // Función para destapar una casilla, si tiene la clase "oculto" la quito y muestro el contenido
    // si es una mina pongo la clase "mina" y finalizo el juego, si no es una mina muestro el número de minas
    function destaparCasilla(casilla) {

        const index = parseInt(casilla.dataset.index);

        if (!casilla.classList.contains("oculto")) return;

        casilla.classList.remove("oculto");

        if (minasPosiciones.includes(index)) {

            casilla.classList.add("mina");

            finalizarJuego(false);

        } else {

            const minasAdyacentes = contarMinasAdyacentes(index);
            
            // Después de ver la casilla y saber el número de minas adyacentes, le añado el texto que devulve el conteo de minas
            // y añado la clase correspondiente

            if (minasAdyacentes > 0) {

                casilla.textContent = minasAdyacentes;
                let descripcion;

                switch (minasAdyacentes) {
                    case 1:
                        descripcion = "poco";
                        break;
                    case 2:
                        descripcion = "medio";
                        break;
                    default:
                        descripcion = "mucho";
                        break;
                }
                casilla.classList.add(descripcion);
            }

            puntuacion += (minasAdyacentes + 1) * numMinas;

            puntosDiv.textContent = `${puntuacion} puntos`;

            casillasDestapadas++;

            if (casillasDestapadas === TOTAL_CASILLAS - numMinas) {

                finalizarJuego(true);
            }
        }
    }

    // Función para contar minas adyacentes a una casilla
    function contarMinasAdyacentes(index) {

        const filas = 10;        
        const columnas = 10;

        const posicionesAdyacentes = [

            // Posiciones arriba izq, arriba centro, arriba derecha
            index - columnas - 1, index - columnas, index - columnas + 1,

            // Posiciones izquierda, derecha
            index - 1, index + 1,

            // Posiciones abajo izq, abajo centro, abajo derecha
            index + columnas - 1, index + columnas, index + columnas + 1
        ];

        // Aquí filtro el array para devolver solo el número de posiciones que quedan despuñes de cumplir
        // estas condiciones: que la posición sea mayor o igual a 0, menor que el total de casillas, que la posición
        // esté en el array de minas y que no se cumpla que la casilla esté en el borde izquierdo y la mina en el borde derecho
        return posicionesAdyacentes.filter(pos =>
            pos >= 0 &&
            pos < TOTAL_CASILLAS &&
            minasPosiciones.includes(pos) &&
            !(index % columnas === 0 && pos % columnas === columnas - 1) &&
            !(index % columnas === columnas - 1 && pos % columnas === 0)
        ).length;
    }

    // Función para finalizar el juego
    function finalizarJuego(ganado) {

        // Muestro todas las bombas
        const casillas = document.querySelectorAll(".casilla");

        casillas.forEach(casilla => {

            const index = parseInt(casilla.dataset.index);

            if (minasPosiciones.includes(index)) {

                casilla.classList.remove("oculto");
                casilla.classList.add("mina");
            }
        });
        //Muestro mesaje de vistoria o derrota despues de añadir el protector
        protector.classList.remove("ocultar");
        mensajeFinal.classList.remove("ocultar");

        mensajeFinal.textContent = ganado ?
            `¡Has ganado con ${puntuacion} puntos!` :
            `Has perdido con ${puntuacion} puntos.`;

        // Creo botón "Volver a jugar"
        const btnVolverAJugar = document.createElement("button");
        btnVolverAJugar.textContent = "Volver a jugar";
        btnVolverAJugar.addEventListener("click", () => {
            location.reload();
        });        
        mensajeFinal.appendChild(btnVolverAJugar);       
    }
});