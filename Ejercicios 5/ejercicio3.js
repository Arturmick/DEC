export function mostrar_menu(){
    return parseInt(prompt("Escribe el número de la operación que desseas reslizar:\n1.Agregar producto" +
        "\n2.Eliminar producto\n3.Actualizar producto\n4.Mostrar inventario\n5.Calcular el valor total \n0.Salir"));    
}
export function agregar_producto(productos){
    let nuevoProducto = { nombre: prompt("introduzca nombre: "), precio: parseFloat(prompt("Introduzca precio:"))}
    productos.push(nuevoProducto);
    alert("Producto agregado");
}
export function eliminar_producto(productos){
    let nombreProducto = prompt("Introduce producto a eliminar: ");
    const indice = productos.findIndex(producto => producto.nombre === nombreProducto);
  if (indice !== -1) {
    productos.splice(indice, 1);
    console.log("Producto eliminado:", nombreProducto);
  } else {
    console.log("Producto no encontrado:", nombreProducto);
  }
}
export function actualizar_producto(productos){
    let nombreProducto = prompt("Introduce producto a actualizar: ");

    let producto = productos.find(p => p.nombre === nombreProducto);
  
  if (producto) {    
    producto.precio = parseInt(prompt("Escribe el nuevo precio: "));
    producto.nombre = prompt("Escribe el nuevo nombre");
  }
  alert ("Producto actualizado: " + producto.nombre + " , " + producto.precio);
}
export function mostrar_inventario(productos){
    productos.forEach(producto => {
        alert("Nombre: " + producto.nombre + ", Precio: " + producto.precio + "€");
      });
}
export function calcular_valor_total(productos){
    let total = productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);

    alert("El valor total de los productos es: " + total.toFixed(2) + "€");
}