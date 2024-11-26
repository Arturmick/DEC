document.addEventListener("DOMContentLoaded", () => { 
    
    cargaEventos();
});

function cargaEventos(){
    contenedor1.addEventListener("dragover", allowDrop);
    contenedor2.addEventListener("dragover", allowDrop);

    contenedor1.addEventListener("drop", drop);
    contenedor2.addEventListener("drop", drop);

    imagen.addEventListener("dragstart", drag);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    ev.target.appendChild(draggedElement);
}