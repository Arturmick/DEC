function circulo (input) {
    
    input.classList.add("circulo");
}
function cuadrado (input) {
   
    input.classList.remove("circulo");
   
}
function sombra (input) {
    input.classList.toggle("sombra");
}
function final (input){
    input.classList.toggle("sombra");
    input.classList.toggle("final");
}
function eliminar (input, cuadrado){
    cuadrado.remove();
    input.remove();
}