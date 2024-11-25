document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('celda')) {
            console.log(`Clicked on cell at position: ${evento.target.dataset.position}`);
        }
    });


    const pantalla = document.getElementById('pantalla');
    const tablero = [];
    const rows = 13;
    const cols = 21;

    function createGrid() {
        for (let i = 0; i < rows; i++) {

            const fila = [];

            for (let j = 0; j < cols; j++) {

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

    createGrid();
    // Now you can access any celda using tablero[fila][col]
});
