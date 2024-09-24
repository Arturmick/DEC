export function adivinaNumero(){
    const max = 100;
        const min = 1;

        let numeroAleatorio = Math.trunc((Math.random() * 100)) + 1;
        let acierto = false;

        while (!acierto){

            let numeroRecogido = prompt("Adivina un número de 1 a 100");

            if(numeroAleatorio != numeroRecogido){
                if(numeroAleatorio < numeroRecogido){
                    alert("El número es menor")
                }else alert ("El número es mayor");
            }else {
                alert("Acertaste!");
                acierto = true;
            }
        }
}

export function formatoFecha(){
    let fecha = prompt ("Introduce una fecha en formato DD/MM/YYYY");
            let partes = fecha.split('/');
            let dia = partes[0];
            let mes = partes[1]-1;
            let anyo = partes[2];

            let fechaFormateada = new Date(anyo, mes, dia);

            let formato = { day: 'numeric',month: 'long', year: 'numeric'};
            let fechaSalida = fechaFormateada.toLocaleDateString('es-ES', formato);
            alert (fechaSalida);
}

export function vocalNoVocal (){
    const vocales = "aeiou";
       
        let letra;

        while (letra != ' ') {

        letra = prompt ("Introduce una letra");

        if(letra == ' '){
            alert("saliendo");
        }else if (vocales.includes(letra)){
            alert("Es una vocal");
        }else alert ("No es una vocal");
            
        }
}

export function limites(){
    let correcto = false;
        while (correcto){
            let inferior = parseInt(prompt ("Introduce el límite inferior"));
            let superior = parseInt(prompt ("Introduce el límite superior"));

            if ((superior - inferior) < 0){
                    
            }    

        }
}

