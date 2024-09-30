let numero1 = parseInt(prompt("Escribe el primer número a utilizar"));
let numero2 = parseInt(prompt("Escribe el segundo número a utilizar"));

let operacion = parseInt(prompt("Escribe el número de la operación que desseas reslizar:\n1.Suma" +
    "\n2.Resta\n3.Multiplicación\n4.División"));

switch (operacion){
    case 1: suma(numero1, numero2);break;
    case 2: resta(numero1, numero2);break;
    case 3: multiplicacion(numero1, numero2);break;
    case 4: division(numero1, numero2);break;
}

function suma(a,b){
    alert (a + b);
}
function resta(a,b){
    alert (a - b);
}
function multiplicacion(a,b){
    alert (a * b);
}
function division(a,b){
    alert (parseInt(a / b) + ", resto " + (a%b));
}