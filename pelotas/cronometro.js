let horas = 0;

let minutos = 0;

let segundos = 0;

let cronometro;

window.onload = function() {
    cronometro = document.getElementById('cronometro');

    document.getElementById('jugar').addEventListener('click',cronometrar);
    document.getElementById('jugar').addEventListener('click',juego);    
    document.getElementById('eliminar1').addEventListener('click',cambiarColorBoton);
    document.getElementById('eliminar2').addEventListener('click',cambiarColorBoton);

}
function juego() {
    let hijo = document.getElementById("#menu");
    let padre = //por qauí
}

function cambiarColorBoton() {
    this.classList.remove("seleccionado");
    this.classList.add("seleccionado");
    if(this.id == "eliminar1") {
        document.getElementById('eliminar2').classList.remove("seleccionado");
    }else {
        document.getElementById('eliminar1').classList.remove("seleccionado");
    }
}

/**********************CRONOMETRO***************************/

//Comienza a cronometrar


function cronometrar(){

    crearReloj();

    intervalo = setInterval(crearReloj,1000);

}

function crearReloj(){

    let hAux, mAux, sAux;

    segundos++;

    if (segundos>59) {

        minutos++;

        segundos=0;

    }

    if (minutos>59) {

        horas++;

        minutos=0;

    }

    if (horas>24) horas=0;

    if (segundos<10) sAux="0"+segundos;

    else sAux=segundos;

    if (minutos<10) mAux="0"+minutos;

    else mAux=minutos;

    if (horas<10) hAux="0"+horas;

    else hAux=horas;

    cronometro.innerText = hAux + ":" + mAux + ":" + sAux;

}

//Detiene el cronometro

function parar(){

    clearInterval(intervalo);

}