export class CartaElement extends HTMLElement {

    imagen;
    nombre;
    experiencia;

    constructor(imagen, nombre, experiencia) {
        super();
        this.imagen = imagen;
        this.nombre = nombre;
        this.experiencia = experiencia;
        this. innerHTML = 
        `
        <img src="${this.imagen}" alt="${this.nombre}">
        <div class="experiencia">${this.experiencia}</div>
        <div class="nombre">${this.nombre}</div>
        `;
        
    }

    getImagen() {
        return this.imagen;
    }
    getNombre() {
        return this.nombre;
    }
    getExperiencia() {
        return this.experiencia;
    }

}
export default CartaElement;

customElements.define('carta-element', CartaElement);