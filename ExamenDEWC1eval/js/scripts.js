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
        crearContenedorEnemigo(puntosEnemigo);
        crearContenedorJugador(puntosJugador);  
    }    
}
function ganador() {
    if(puntosJugador > puntosEnemigo) {
        solucion.innerHTML = "Has ganado!";
    }else {
        solucion.innerHTML = "Has perdido!";
    }
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
function empezarJuego(imagen) {
    let enemigo = accionEnemiga();
    
    /*setTimeout(deliverar,500);
    deliveracion.classList.add("invisible");*/
    
    mensaje.classList.remove("invisible");
    pelea(imagen, enemigo);
}
function deliverar() {
    deliveracion.classList.remove("invisible");
    setTimeout(accionEnemiga,2000);
}
function cambiarContenerdor(ev) {
    let imagen = document.getElementById(ev.target.id);
    seleccionado.appendChild(imagen);
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
    img.src = `img/${enemigo[random]}.png`;    
    return enemigo[random];    
}
function pelea(imagen, enemigo) {

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
        tijera = true;
    }else if(enemigo == "lagarto") {
        lagarto = true;
    }else if(enemigo == "spock") {
        spock = true;
    }
    if(tijeras && papel) {
        solucion.innerHTML = "Tijeras cortan papel";
        if(imagen.id == "tijera"){
           sumaPuntosJugardor(3);
        }else {
            sumaPuntosEnemigo(3);
        }
    } else if(tijeras && lagarto) {
        solucion.innerHTML = "Tijeras decapitan lagarto";	
        if(imagen.id == "tijera"){
            sumaPuntosJugardor(3);
         }else {
             sumaPuntosEnemigo(3);
         }
    } else if(papel && piedra) {
        solucion.innerHTML = "Papel tapa piedra";
        if(imagen.id == "papel"){
            sumaPuntosJugardor(2);
         }else {
             sumaPuntosEnemigo(2);
         }
    } else if(papel && spock) {
        solucion.innerHTML = "Papel desautoriza a Spock";
        if(imagen.id == "papel"){
            sumaPuntosJugardor(2);
         }else {
             sumaPuntosEnemigo(2);
         }
    } else if(piedra && lagarto) {
        solucion.innerHTML = "Piedra aplasta lagarto";
        if(imagen.id == "piedra"){
            sumaPuntosJugardor(1);
         }else {
             sumaPuntosEnemigo(1);
         }
    } else if(piedra && tijeras) {
        solucion.innerHTML = "Piedra aplasta tijeras";
        if(imagen.id == "piedra"){
            sumaPuntosJugardor(1);
         }else {
             sumaPuntosEnemigo(1);
         }
    } else if(lagarto && spock) {
        solucion.innerHTML = "Lagarto envenena a Spock";
        if(imagen.id == "lagarto"){
            sumaPuntosJugardor(4);
         }else {
             sumaPuntosEnemigo(4);
         }
    } else if(lagarto && papel) {
        solucion.innerHTML = "Lagarto se come papel";
        if(imagen.id == "lagarto"){
            sumaPuntosJugardor(4);
         }else {
             sumaPuntosEnemigo(4);
         }
    } else if(spock && tijeras) {
        solucion.innerHTML = "Spock destroza tijeras";
        if(imagen.id == "spock"){
            sumaPuntosJugardor(5);
         }else {
             sumaPuntosEnemigo(5);
         }
    } else if(spock && piedra) {
        solucion.innerHTML = "Spock vaporiza piedra";
        if(imagen.id == "spock"){
            sumaPuntosJugardor(5);
         }else {
             sumaPuntosEnemigo(5);
         }
    } else {
        solucion.innerHTML = "Empate!";
    }
}
function sumaPuntosJugardor(num) {
    puntosJugador += num;
    
    for (let i = 0; i < num; i++) {
        let nuevoContenedor = document.createElement("div");
        nuevoContenedor.classList.add("punto");
        nuevoContenedor.classList.add("mio");
        yo.appendChild(nuevoContenedor);
    }    
}
function sumaPuntosEnemigo(num) {
    puntosEnemigo += num;

    for (let i = 0; i < num; i++) {
        let nuevoContenedor = document.createElement("div");
        nuevoContenedor.classList.add("punto");
        nuevoContenedor.classList.add("suyo");
        el.appendChild(nuevoContenedor);
    }    
}
function crearContenedorJugador(num) {
    for (let i = 0; i < num; i++) {
        let nuevoContenedor = document.createElement("div");
        nuevoContenedor.classList.add("punto");
        nuevoContenedor.classList.add("mio");
        yo.appendChild(nuevoContenedor);
    } 
}
function crearContenedorEnemigo(num) {

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