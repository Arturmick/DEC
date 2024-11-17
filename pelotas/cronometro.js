let numeroBolasVar = 10;
let circulos;
let juegoVar;
let menuColor = document.createElement('div');
let colorPelotas;


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

    document.getElementById('jugar').addEventListener('click',menus);    
    
    document.getElementById('eliminarTodo').addEventListener('click',cambiarColorBoton);
    document.getElementById('eliminarColor').addEventListener('click',cambiarColorBoton);
            
}
function menus(){
    bolas();

    if(eliminarTodo.classList.contains("seleccionado")) {
        juegoVar = 1;
    } else {
        juegoVar = 2;
    }

    menu.remove();
    elegirColor();
}
function juego() { 

    cronometrar();
    
    creaCirculos();

    for (let i = 0; i < circulos.length; i++) {
        circulos[i].addEventListener('dblclick', eliminarBola);
        circulos[i].addEventListener('dblclick', jugando);
    }
    
}
/********************** FUNCIONALIDAD JUEGOS **********************/

function jugando(){
    
    if(juegoVar == 1) {
        juegoEliminarTodo();
    }else {
        juegoEliminarColor(this);
    }    
}

function juegoEliminarTodo() {
    
    if(circulos.length == 0) {
        parar();
        alert("¡Felicidades! Has ganado en " + cronometro.innerText + ".");
    }
      
}   

function juegoEliminarColor(boton) {

    if (boton.classList.contains('puntuable')) {
        marcadorRojo.innerText = parseInt(marcadorRojo.innerText) + 1;
    }

    let puntuable = document.getElementsByClassName('puntuable');

    if(puntuable.length == 0) {
        parar();
        alert("¡Felicidades! Has ganado en " + cronometro.innerText + ".");
    }
}

/********************** FUNCIONALIDAD BOTONES ******************/

function cambiarColorBoton() {
    this.classList.remove("seleccionado");
    this.classList.add("seleccionado");
    if(this.id == "eliminarTodo") {
        document.getElementById('eliminarColor').classList.remove("seleccionado");
    }else {
        document.getElementById('eliminarTodo').classList.remove("seleccionado");
    }
}   

/******************** CREA PELOTAS **************************/

function bolas(){
    numeroBolasVar = numeroBolas.value;
} 

function elegirColor() {
    
    menuColor.innerHTML = "<div class='cartel'>ELIGE UN COLOR: </div><div id='botonRojo'>Rojo</div>" +
                      "<div id='botonAzul'>Azul</div>";
    menuColor.classList.add('menuColor');
    areaJuego.appendChild(menuColor);
    
    document.getElementById('botonRojo').addEventListener('click', () => colorPelotas = 1);
    document.getElementById('botonRojo').addEventListener('click', juego);
    document.getElementById('botonAzul').addEventListener('click', () => colorPelotas = 2);
    document.getElementById('botonAzul').addEventListener('click', juego);
   
}
function creaCirculos(){

    for (let i = 0; i < numeroBolasVar; i++) {
        
        let circulo = document.createElement('div');
        
        circulo.classList.add('circulo');

        let x = parseInt(Math.random() * (areaJuego.clientWidth - 70));
        let y = parseInt(Math.random() * (areaJuego.clientHeight - 70));
        
        alto = ancho = parseInt(Math.random() * 45) + 30;

        circulo.style.left = `${x}px`;
            circulo.style.top = `${y}px`;
            circulo.style.width = `${alto}px`;
            circulo.style.height = `${ancho}px`;
         
        if(juegoVar == 2 && colorPelotas == 1) {

            let randomColor = Math.random() < 0.2 ? 'red' : "rgb(0, "+ (Math.random()*255) +", "+ (Math.random()*255) +")";
            circulo.style.backgroundColor = randomColor;

            
            if (randomColor === 'red') {
            circulo.classList.add('puntuable');
            }

        } else if(juegoVar == 2 && colorPelotas == 2) {
            let randomColor = Math.random() < 0.2 ? 'blue' : "rgb("+ (Math.random()*255) +", "+ (Math.random()*255) +", 0)";
            circulo.style.backgroundColor = randomColor;

            if (randomColor === 'blue') {
                circulo.classList.add('puntuable');
            }
        }
        areaJuego.appendChild(circulo);  
    }      
}

/********************** ELIMINA PELOTAS **********************/

function eliminarBola(){
    this.remove();
}

/********************** CRONOMETRO***************************/

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