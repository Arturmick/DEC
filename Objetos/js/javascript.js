import { CartaElement } from "../components/CartaElement.js";

window.onload = () => {
    boton.addEventListener('click', cargarCarta);
}

function cargarCarta() {
    let carta = new CartaElement("./img/pokemon.png", 'Charizard', '1000');
    contenedorCartas.appendChild(carta);
}