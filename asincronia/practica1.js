let tiempoRandom;
let tiempoInicial;



document.addEventListener('DOMContentLoaded', () => {
   
    crearCuadrado();
});

function crearCuadrado() {
    tiempoRandom = (Math.floor(Math.random() * (5 - 2 + 1)) + 2) * 1000;
    
    setTimeout(() => {
        const div = document.createElement('div');               
        const tiempo = Date.now();
        div.className = 'pulsame'; 

        setInterval(() => {
            div.innerText = `Han pasado ${Math.floor((Date.now() - tiempo) )} milisegundos`;
        }); 
           
        div.style.position = 'absolute';
        div.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        div.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

        document.body.appendChild(div);
        tiempoInicial = Date.now();

    },tiempoRandom); 

    document.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('pulsame')) {
            
            const tiempoPulsado = Date.now();
            let tiempoTardado = (tiempoPulsado - tiempoInicial) / 1000;
            alert(`Has tardado ` + tiempoTardado +  ` segundos en pulsar.`);
            window.location.reload();           
        }
    });
}