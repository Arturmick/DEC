import {adivinaNumero, formatoFecha, vocalNoVocal, limites} from "./ejercicio1.js";

let numeroEjercicio = parseInt(prompt("Escribe el número del ejercicio que desseas reslizar:\n1.Adivinar número" +
    "\n2.Formato fecha\n3.vocalNoVocal\n4.Limites"));
switch (numeroEjercicio){
    case 1: adivinaNumero();break;
    case 2: formatoFecha();break;
    case 3: vocalNoVocal();break;
    case 4: limites();break;
}
      