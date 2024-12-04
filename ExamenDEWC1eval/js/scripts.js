let piedra = false;
let papel = false;
let tijeras = false;
let lagarto = false;
let spock = false;
let enemigo = ["piedra", "papel", "tijera", "lagarto", "spock"];
let puntosJugador = 0;
let puntosEnemigo = 0;

document.addEventListener("DOMContentLoaded", () => {
   cargarPartida();
   anadirImagenes();
    if(puntosJugador >= 10 || puntosEnemigo >= 10) {
        ganador();
    }else {
        cargarEventos();
    }
});
function cargarPartida() {
    if(localStorage.getItem("puntosJugador") != null) {
        puntosJugador = parseInt(localStorage.getItem("puntosJugador"));
        puntosEnemigo = parseInt(localStorage.getItem("puntosEnemigo"));
        console.log(puntosJugador);
        sumaPuntosEnemigo(puntosEnemigo);
        sumaPuntosJugardor(puntosJugador);  
    }    
}
function ganador() {
    if(puntosJugador > puntosEnemigo) {
        solucion.innerHTML = "Has ganado!";
    }else {
        solucion.innerHTML = "Has perdido!";
    }
    proteccion.classList.remove("invisible");
    mensaje.classList.remove("invisible");  
    
    continuar.addEventListener("click", () => {       
        localStorage.clear();
        window.location.reload();
    });
     
}
function guardarPartida() {
    localStorage.setItem("puntosJugador", puntosJugador);
    localStorage.setItem("puntosEnemigo", puntosEnemigo);
}
function cargarEventos() {
    let items = document.querySelectorAll('.item');
    let img = document.querySelectorAll('.item img'); 

    
    items.forEach(item => {
        item.addEventListener("dragover", allowDrop);
        item.addEventListener("drop", drop); 
        item.addEventListener("drop", () => {
            let imagen = document.getElementById(item.id);
            empezarJuego(imagen.childNodes[1]);           
    });       
    });   
    img.forEach(item => {
        item.addEventListener("dragstart", drag);
        item.addEventListener("dblclick", cambiarContenerdor);
        item.addEventListener("dblclick", () => {
            let imagen = document.getElementById(item.id);
            empezarJuego(imagen);
    });
    });
    continuar.addEventListener("click", () => {       
        guardarPartida();
        window.location.reload();
    });  
}
function cambiarContenerdor(ev) {
    let imagen = document.getElementById(ev.target.id);
    seleccionado.appendChild(imagen);
}
function empezarJuego(jugadorDecision) {
    
    setTimeout(() => {  
        deliveracion.classList.remove("invisible");   
        proteccion.classList.remove("invisible");   
        resolcuion(jugadorDecision);
    },500); 
}
function resolcuion(jugadorDecision) {
    let enemigoDecision = accionEnemiga();   
    
    setTimeout(() => {
        mensaje.classList.remove("invisible");
        pelea(jugadorDecision, enemigoDecision);
        },2000);
}

function anadirImagenes() {
    let items = document.querySelectorAll('.item');    
    
    items[0].innerHTML = `<img id="piedra" src="img/piedra.png" draggable>`;
    items[1].innerHTML = `<img id="papel" src="img/papel.png" draggable>`;
    items[2].innerHTML = `<img id="tijera" src="img/tijera.png" draggable>`;
    items[3].innerHTML = `<img id="lagarto" src="img/lagarto.png" draggable>`;
    items[4].innerHTML = `<img id="spock" src="img/spock.png" draggable>`;    
    
}
function accionEnemiga (){
    let random = Math.floor(Math.random() * enemigo.length);
    let img = document.querySelector('#enemigo img');
    setTimeout(() => {img.src = `img/${enemigo[random]}.png`;    
    },1000);      
    return enemigo[random];    
}
function pelea(imagen, enemigo) {
    let jugador = false;
    let puntos = 0;

    console.log(imagen);
    console.log(enemigo);

    if(imagen.id == "piedra"){
        piedra = true;
    }else if(imagen.id == "papel"){
        papel = true;
    }else if(imagen.id == "tijera"){
        tijeras = true;
    }else if(imagen.id == "lagarto"){
        lagarto = true;
    }else if(imagen.id == "spock"){
        spock = true;
    }
    if(enemigo == "piedra") {
        piedra = true;
    }else if(enemigo == "papel") {
        papel = true;
    }else if(enemigo == "tijera") {
        tijeras = true;
    }else if(enemigo == "lagarto") {
        lagarto = true;
    }else if(enemigo == "spock") {
        spock = true;
    }
    if(tijeras && papel) {
        solucion.innerHTML = "Tijeras cortan papel";
        puntos = 3;    
        if(imagen.id == "tijera"){
            jugador = true;                   
        }
    } else if(tijeras && lagarto) {
        solucion.innerHTML = "Tijeras decapitan lagarto";	
        puntos = 3; 
        if(imagen.id == "tijera"){
            jugador = true;              
         }
    } else if(papel && piedra) {
        solucion.innerHTML = "Papel tapa piedra";
        puntos = 2;  
        if(imagen.id == "papel"){
            jugador = true;             
         }
    } else if(papel && spock) {
        solucion.innerHTML = "Papel desautoriza a Spock";
        puntos = 2;   
        if(imagen.id == "papel"){
            jugador = true;            
         }
    } else if(piedra && lagarto) {
        solucion.innerHTML = "Piedra aplasta lagarto";
        puntos = 1; 
        if(imagen.id == "piedra"){
            jugador = true;             
         }
    } else if(piedra && tijeras) {
        solucion.innerHTML = "Piedra aplasta tijeras";
        puntos = 1; 
        if(imagen.id == "piedra"){
            jugador = true;              
         }
    } else if(lagarto && spock) {
        solucion.innerHTML = "Lagarto envenena a Spock";
        puntos = 4; 
        if(imagen.id == "lagarto"){
            jugador = true;              
         }
    } else if(lagarto && papel) {
        solucion.innerHTML = "Lagarto se come papel";
        puntos = 4;  
        if(imagen.id == "lagarto"){
            jugador = true;             
         }
    } else if(spock && tijeras) {
        solucion.innerHTML = "Spock destroza tijeras";
        puntos = 5;
        if(imagen.id == "spock"){
            jugador = true;               
         }
    } else if(spock && piedra) {
        solucion.innerHTML = "Spock vaporiza piedra";
        puntos = 5;
        if(imagen.id == "spock"){
            jugador = true;
            puntos = 5;   
         }
    } else {
        solucion.innerHTML = "Empate!";
    }
    if(jugador) {
        puntosJugador += puntos;
        sumaPuntosJugardor(puntos);        
    }else {
        puntosEnemigo += puntos;
        sumaPuntosEnemigo(puntos);
    }
}
function sumaPuntosJugardor(num) {    
    
    for (let i = 0; i < num; i++) {
        let nuevoContenedor = document.createElement("div");
        nuevoContenedor.classList.add("punto");
        nuevoContenedor.classList.add("mio");
        yo.appendChild(nuevoContenedor);
    }    
}
function sumaPuntosEnemigo(num) {    

    for (let i = 0; i < num; i++) {
        let nuevoContenedor = document.createElement("div");
        nuevoContenedor.classList.add("punto");
        nuevoContenedor.classList.add("suyo");
        el.appendChild(nuevoContenedor);
    }    
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
    ev.preventDefault();
}   
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");    
    ev.target.appendChild(document.getElementById(data));
    
}