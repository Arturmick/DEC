let cronometro;
let horas;
let minutos;
let segundos;
let decimas;
let centesimas;

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {

        event.preventDefault(); // Evita que se recargue la página
        
        cronometro = document.getElementById('minutos').value;

        cronometro = (cronometro * 60) * 1000;

        setInterval(() => {

            if (cronometro <= 0) {

                document.getElementById('cronometro').innerText = '0:0:0:0';
                alert('¡Tiempo finalizado!');
                clearInterval(0);

            } else {

                cronometro -= 10;
                horas = Math.floor(cronometro / 3600000);
                minutos = Math.floor(cronometro % 3600000 / 60000);
                segundos = Math.floor(cronometro % 60000 / 1000);
                decimas = Math.floor(cronometro % 1000 / 100);
                centesimas = Math.floor(cronometro % 100 / 10);
        
                document.getElementById('cronometro').innerText = `${pad(horas)}:${pad(minutos)}:${pad(segundos)}:${decimas}${centesimas}`; 
            }
        },10);           
    });
});

function pad(num) {
    return num.toString().padStart(2, '0');
}
