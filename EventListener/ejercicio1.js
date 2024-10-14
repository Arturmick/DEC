let cuentaFilas = 0;

window.onload = empezar;

function empezar() {
    anyadir.addEventListener("click", agregarFila);
}

function editar(){
    
    let idPadre = this.parentNode.parentNode.id;
    let selector = "#" + idPadre + " + " + " tr";
    
    let inputs = document.querySelector(selector).querySelectorAll("input");

    if(!inputs[0].disabled){
        confirm("¿Deseas guardar el resultado?");
        inputs[0].disabled = true;
        inputs[1].disabled = true;
        inputs[2].disabled = true;
        return;
    }

    inputs[0].disabled = false;
    inputs[1].disabled = false;
    inputs[2].disabled = false;

}
function eliminar(){
    let idHijo = this.parentNode.parentNode.id;

    let hijo = document.querySelector("#"+idHijo);
    
    let vecinoHijo = document.querySelector("#" + idHijo + " + " + "tr");

    hijo.remove();

    vecinoHijo.remove();   
}

function crearElemento (tipo, valor) {
    let elemento = document.createElement(tipo);
    elemento.value = valor;
    return elemento;
}

function agregarFila(){

    const fila1 = document.createElement('tr');

    fila1.id = "celdas_" + cuentaFilas + "_1";
    fila1.className = "celdas1"

    fila1.innerHTML = `
                <td>Nombre</td>
                <td>Apellidos</td>
                <td>DNI</td>
                <td rowspan="2"><button class="editar">Editar</button></td>            
                <td rowspan="2"><button class="eliminar">X</button></td>
            `;
    let botones = fila1.querySelectorAll("button");

    botones[0].addEventListener("click",editar);
    botones[1].addEventListener("click",eliminar);

    const fila2 = document.createElement('tr');

    fila2.id = "celdas_" + cuentaFilas + "_2";

    fila2.className = "celdas2";
    fila2.innerHTML = `
        <td><input type="text" disabled></td>
        <td><input type="text" disabled></td>
        <td><input type="text" disabled></td>
    `;    
    tabla.appendChild(fila1);
    tabla.appendChild(fila2);        

    cuentaFilas++;
}
