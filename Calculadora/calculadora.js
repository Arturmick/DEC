window.onload = empezar;
let pantalla = "";
let simboloCalculo = false;
let regexAcabaEnOperando = /[+\-x%=*\/]$/;
let regexOperando = /[-x%*]/;
let regexTeclado = /[123456789.,()+\-x%=*\/]/;
let regexAcabaEnNumero = /[1234567890]$/;

function empezar() {

    pantalla =  document.querySelector('.pantalla input');

    let botones = document.querySelectorAll(".boton");

    botones.forEach(element => {
        element.addEventListener("mousedown", anyadirSombra);
        element.addEventListener("mouseup", quitarSombra);
        element.addEventListener("click",procesarEntrada);        
    });

    document.addEventListener("keydown", function(event) {

        const key = event.key;
        const isShiftPressed = event.shiftKey;

        if (regexTeclado.test(key)) { 

            procesarEntrada.call({ innerText: key });

        } else if (key === 'Backspace') {
            
            procesarEntrada.call({ innerText: "\u00AB" });

        } else if (key === 'Enter') {
            
            procesarEntrada.call({ innerText: "=" });

        } else if (key === 'Escape') {
            
            procesarEntrada.call({ innerText: "C" });

        } else if (isShiftPressed) {
            switch (key) {
                case '8':
                    procesarEntrada.call({ innerText: "()" });
                    break;
                case '9':
                    procesarEntrada.call({ innerText: "()" });
                    break;
                case '0':
                    procesarEntrada.call({ innerText: "=" });
                    break;
                case '5':
                    procesarEntrada.call({ innerText: "%" });
                    break;
                case '7':
                    procesarEntrada.call({ innerText: "/" });
                    break;
                default:
                    break; 
            }
        }
    });
}

function procesarEntrada() {

    let texto = this.innerText;  
               
    if(texto == "C"){
        
        borrarPantalla();
    }
    
    if(analizarBoton(texto)) {

        if(pantalla.value.search(regexAcabaEnOperando) !== -1){
            
            simboloCalculo = true;

        }
        if(pantalla.value == 0 && !regexAcabaEnOperando.test(texto)) {

            pantalla.value = "";

        }
        if(texto == "\u00AB"){

            borrarCaracter();

        }else if(texto == "="){ 

            calcularResultado();           

        }else if (texto == "." || texto == ","){

            anyadirDecimal(this.innerText);                       
        
        }else if (texto == "()"){

            escribirParentesis();  

        }else {

            escribirEnPantalla(texto);   

        }
        if(pantalla.value == ""){

            borrarPantalla();            
        }        
    }        
}

function anyadirSombra() {
   
    this.classList.remove("sombra");
    this.classList.add("sombra");
}
function quitarSombra() {
    
    this.classList.remove("sombra");    
}
function analizarBoton(texto){

    if((!regexAcabaEnOperando.test(pantalla.value) || texto.search(regexAcabaEnOperando) === -1) && texto != "C"){
        return true;
    }else{
        return false;
    }
}
function borrarPantalla(){

    pantalla.value = 0; 
}
function borrarCaracter(){

    pantalla.value = pantalla.value.slice(0,-1);
}
function calcularResultado(){
    
    const tamañoPantalla = 11;
    let resultado = "";  

    if(pantalla.value.includes("%")){

        resultado = pantalla.value;

        resultado = resultado.replace(/(\d+(\.\d+)?)%(\d+(\.\d+)?)/g, function(match, p1, p2, p3) {
            return `(${p1} / 100) * ${p3}`;
        });

        resultado = eval(resultado.replace("x","*"));

    }else {

        resultado = eval(pantalla.value.replace("x","*"));
    }            

    if(resultado.toString().length > tamañoPantalla){
        resultado = "Too much";
    }

    pantalla.value = resultado;  
}
function anyadirDecimal(texto){
    
    if(pantalla.value == "") {
        return;
    }
            
    if (pantalla.value.includes(".")){

        if(simboloCalculo == true && pantalla.value.search(regexAcabaEnNumero) !== -1){

           escribirEnPantalla(texto);

            simboloCalculo = false;
        }                
    }else {

        escribirEnPantalla(".");
    } 
}
function escribirParentesis(){

    escribirEnPantalla("(" + pantalla.value + ")");    
}
function escribirEnPantalla(movida){

    pantalla.value += movida;
}





