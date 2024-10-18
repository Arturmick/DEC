window.onload = empezar;
let pantalla = "";
let simboloCalculo = false;
let regex = /[+\-x%=*\/]$/;
let regexTeclado = /[123456789.,+\-x%=*\/]/;
let regexNumeros = /[1234567890]$/;

function empezar() {

    pantalla =  document.querySelector('.pantalla input');

   

    let botones = document.querySelectorAll(".boton");

    botones.forEach(element => {
        element.addEventListener("mousedown", anyadirSombra);
        element.addEventListener("mouseup", quitarSombra);
        element.addEventListener("click",escribirPantalla);
        element.addEventListener("keydown",escribirPantalla);
    });
    
}

function anyadirSombra() {
   
    this.classList.remove("sombra");
    this.classList.add("sombra");
}
function quitarSombra() {
    
    this.classList.remove("sombra");    
}

function escribirPantalla() {

    let texto = this.innerText;  
    let tamañoPantalla = 11;
           
    
    if(texto == "C"){
        
        pantalla.value = 0; 
    }
    
    if(((!regex.test(pantalla.value) || texto.search(regex) === -1) && texto != "C")) {

        if(pantalla.value.search(regex) !== -1){
            simboloCalculo = true;
        }
        if(pantalla.value == 0 && !regex.test(texto)) {

            pantalla.value = "";

        }
        if(texto == "\u00AB"){

            pantalla.value = pantalla.value.slice(0,-1);

        }else if(texto == "="){
            
            let resultado = eval(pantalla.value.replace("x","*"));

            if(resultado.toString().length > tamañoPantalla){
                resultado = "Too much";
            }

            pantalla.value = resultado;

        }else if (texto == "." || texto == ","){
                    
            if (pantalla.value.includes(".")){

                if(simboloCalculo == true && pantalla.value.search(regexNumeros) !== -1){
                    pantalla.value += this.innerText;
                    simboloCalculo = false;
                }
                
            }else if(pantalla.value == "") {

            }else {
                pantalla.value += ".";
            }
            
            //que solo se pueda meter el punto una vez en todo el texto
        }else if (texto == "()"){
            
            pantalla.value = "(" + pantalla.value + ")";

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





