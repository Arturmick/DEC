window.onload = empezar;
let pantalla = "";
let simboloCalculo = false;
let regex = /[+\-x%=*\/]$/;

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

    let texto = this.innerText;       
    
    if(texto == "C"){
        
        pantalla.value = 0; 
        simboloCalculo = false;  
             
    }
    
    if(((!regex.test(pantalla.value) || texto.search(regex) === -1) && texto != "C")) {

        if(pantalla.value == 0) {

            pantalla.value = "";

        }
        if(texto == "\u00AB"){

            pantalla.value = pantalla.value.slice(0,-1);

        }else if(texto == "="){

            let resultado = eval(pantalla.value.replace("x","*"));
            pantalla.value = resultado;

        }else {

            pantalla.value += this.innerText;

        }
        if(pantalla.value == ""){

            pantalla.value = 0;
            
        }
        
    }
        
}



