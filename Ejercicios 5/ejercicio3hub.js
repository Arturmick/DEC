import {mostrar_menu, agregar_producto, eliminar_producto, actualizar_producto, mostrar_inventario, calcular_valor_total} from "./ejercicio3.js";

let productos = [
    { nombre: "Producto 1", precio: 10.99},
    { nombre: "Producto 2", precio: 25.50 },
    { nombre: "Producto 3", precio: 5.75 },
    { nombre: "Producto 4", precio: 15.00 }
];
let opcion;

while (opcion != 0){

    opcion = mostrar_menu();

    switch (opcion) {
        case 1:agregar_producto(productos);break;
        case 2:eliminar_producto(productos);break;
        case 3:actualizar_producto(productos);break;
        case 4:mostrar_inventario(productos);break;
        case 5:calcular_valor_total(productos);break;
    }
}
