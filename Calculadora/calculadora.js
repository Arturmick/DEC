window.onload = empezar;
let pantalla = "";

function empezar() {

    pantalla =  document.querySelector('.pantalla input');

    console.log("entra");

    let botones = document.querySelectorAll(".boton");

    botones.forEach(element => {
        element.addEventListener("mousedown", cambioSombra);
        element.addEventListener("mouseup", cambioSombra);
        element.addEventListener("click",escribirPantalla);
    });
    
}

function cambioSombra() {
    console.log("entra");
    this.classList.toggle("sombra");
}

function escribirPantalla() {
    if(pantalla.value == 0){
        pantalla.value = "";
    }
    
    pantalla.value += this.innerText;
}



