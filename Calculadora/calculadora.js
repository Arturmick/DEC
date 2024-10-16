window.onload = empezar;
let pantalla = "";
let simboloCalculo = false;
let regex = /[+\-x%=*\/]$/;
let regexTeclado = /[123456789.,+\-x%=*\/]/;

function empezar() {

    pantalla =  document.querySelector('.pantalla input');

    console.log("entra");

    let botones = document.querySelectorAll(".boton");

    botones.forEach(element => {
        element.addEventListener("mousedown", anyadirSombra);
        element.addEventListener("mouseup", quitarSombra);
        element.addEventListener("click",escribirPantalla);
        element.addEventListener("keydown",escribirPantalla);
    });
    
}

function anyadirSombra() {
    console.log("entra");
    this.classList.remove("sombra");
    this.classList.add("sombra");
}
function quitarSombra() {
    console.log("entra");
    this.classList.remove("sombra");    
}

function escribirPantalla() {

    let texto = this.innerText;       
    
    if(texto == "C"){
        
        pantalla.value = 0; 
        simboloCalculo = false;  
             
    }
    
    if(((!regex.test(pantalla.value) || texto.search(regex) === -1) && texto != "C")) {

        if(pantalla.value == 0 && !regex.test(texto) ) {

            pantalla.value = "";

        }
        if(texto == "\u00AB"){

            pantalla.value = pantalla.value.slice(0,-1);

        }else if(texto == "="){

            let resultado = eval(pantalla.value.replace("x","*"));
            pantalla.value = resultado;

        }else if (texto == "."){
            //que solo se pueda meter el punto nua vez en todo el texto
        }else {
            pantalla.value += this.innerText;
        }
        if(pantalla.value == ""){

            pantalla.value = 0;
            
        }
        
    }
        
}

function analizarBoton() {

    
}

function borrarPantalla() {

}





