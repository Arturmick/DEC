let peticion;
let nombre = [];
let precioAhora = [];
let precioAntes = [];
let precioRecord = [];

let url = 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/precio-de-compra-en-fotocasa/records?order_by=distrito&limit=88';
let url2 = 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/precio-de-compra-en-idealista/records?order_by=distrito&limit=88';


document.addEventListener('DOMContentLoaded', () => {
    ajax(url);
    ajax(url2);
});

function ajax(link) {  

    let peticion = new XMLHttpRequest();
    movidas('GET', link, true, peticion);   
    peticion.onreadystatechange = () => {
        if (peticion.readyState === 4 && peticion.status === 200) {
            datos = JSON.parse(peticion.responseText);
            procesar();
        }
    };
}

function movidas (get, url, boolean, peticion) {
    peticion.open(get, url, boolean);
    peticion.send();    
}


function procesar() {   

    let tabla = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let headerRow = document.createElement('tr');

    let headers = ['Distrito', 'Barrio','Precio 2022 (€/m2)', 'Precio 2010 (€/m2)', 'Precio Máximo Histórico (€/m2)', 'Diferencia'];
    headers.forEach((headerText) => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tabla.appendChild(thead);


    for (dato of datos.results) {

        if(dato.precio_2022_euros_m2 == null ){            
            dato.precio_2022_euros_m2 = 'No disponible';
        }
        if(dato.precio_2010_euros_m2 == null){
            dato.precio_2010_euros_m2 = 'No disponible';
        }
        if(dato.max_historico_euros_m2 == null){
            dato.max_historico_euros_m2 = 'No disponible';
        }
    

        let row = document.createElement('tr');

        let distrito = document.createElement('td');
        let barrio = document.createElement('td');
        let precioAhora = document.createElement('td');
        let precioAntes = document.createElement('td');
        let precioRecord = document.createElement('td');
        let diferencia = document.createElement('td');

        distrito.textContent = dato.distrito;
        barrio.textContent = dato.barrio;
        precioAhora.textContent = dato.precio_2022_euros_m2;
        precioAntes.textContent = dato.precio_2010_euros_m2;
        precioRecord.textContent = dato.max_historico_euros_m2;
        diferencia.textContent = dato.precio_2022_euros_m2 - dato.precio_2010_euros_m2;

        if(diferencia.innerText == 'NaN'){
            diferencia.innerText = 'No disponible';
        }


        row.appendChild(distrito);
        row.appendChild(barrio);
        row.appendChild(precioAhora);
        row.appendChild(precioAntes);
        row.appendChild(precioRecord);


        if(diferencia.textContent < 0 ){
            diferencia.style.color = 'red';
            diferencia.textContent = '↓';
        }else if(diferencia.textContent > 0){
            diferencia.style.color = 'green';
            diferencia.textContent = '↑';
        }else if(diferencia.textContent == 0){
            diferencia.textContent = '=';
        }


        row.appendChild(diferencia);

        tbody.appendChild(row);
    }

    tabla.appendChild(tbody);
    tablaFotocasa.appendChild(tabla);

    console.log(dato);
}
