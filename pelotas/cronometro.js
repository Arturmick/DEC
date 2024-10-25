let numeroBolas = 10;
let circulos;

let horas = 0;
let minutos = 0;
let segundos = 0;
let cronometro;

window.onload = function() {
    circulos = document.getElementsByClassName('circulo');    
    cronometro = document.getElementById('cronometro'); 

    cargarEventos();
}

function cargarEventos() {

    document.getElementById('jugar').addEventListener('click',juego);    
    document.getElementById('eliminar1').addEventListener('click',cambiarColorBoton);
    document.getElementById('eliminar2').addEventListener('click',cambiarColorBoton);
    document.getElementById('numeroBolas').addEventListener('change',bolas);
    for (let i = 0; i < circulos.length; i++) {
        circulos[i].addEventListener('dblclick', eliminarBola);
    }    
}

function juego() {
    cronometrar();
    menu.remove();
    creaCirculos();    
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

/********************CREA PELOTAS **************************/

function bolas(){
    numeroBolas = parseInt(numeroBolas.value);
} 

function creaCirculos(){
    
    for (let i = 0; i < numeroBolas; i++) {
        console.log("entra");
        let circulo = document.createElement('div');
        
        circulo.classList.add('circulo');

        let x = parseInt(Math.random() * (areaJuego.clientWidth - 50));
        let y = parseInt(Math.random() * (areaJuego.clientHeight - 50));

       //alto = ancho = parseInt(Math.random(10,50));

        circulo.style.left = `${x}px`;
        circulo.style.top = `${y}px`;
        //circulo.style.width = `${alto}px`;
        //circulo.style.height = `${ancho}px`;

        areaJuego.appendChild(circulo); 
    }  
}

/**********************ELIMINA PELOTAS **********************/

function eliminarBola(){
    this.remove();
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