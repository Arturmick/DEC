document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("videoElement");
    const playButton = document.getElementById("play");
    const muteButton = document.getElementById("silenciar");
    const rewindButton = document.getElementById("menos10");
    const forwardButton = document.getElementById("mas10");
    const restartButton = document.getElementById("reiniciar");
    const volumeDownButton = document.getElementById("bajarVol");
    const volumeUpButton = document.getElementById("subirVol");
    const carrusel = document.getElementById("carrusel");  

    let principioDelVideo = true;
    let tiempoClick = 0;

    document.querySelectorAll("#carrusel img").forEach(img => {
        img.addEventListener("click", () => {
            
            switchVideo(img.src);            
        });
    });

    playButton.addEventListener("click", () => {        

        if (video.paused) {

            document.getElementById("barraCargaVacia").classList.remove("oculto");
            document.getElementById("barraCargaVacia").classList.add("visible");
            
            playButton.innerHTML = '<img src="./videos/pausa.png" alt="Pause">';
                     
            video.play();

        } else {
            playButton.innerHTML = '<img src="./videos/jugar.png" alt="Pause">';
            video.pause();
        }
        tiempoClick = video.currentTime;
    });

    muteButton.addEventListener("click", () => {

        if (video.muted) {

            muteButton.innerHTML = '<img src="./videos/herramienta-de-audio-con-altavoz.png" alt="Pause">';
           
            
        } else {
            muteButton.innerHTML = '<img src="./videos/sin-sonido.png" alt="Pause">';
           
        }
        video.muted = !video.muted;
    });

    rewindButton.addEventListener("click", () => {
        document.getElementById("barraCargaVacia").classList.remove("oculto");
        document.getElementById("barraCargaVacia").classList.add("visible");
        video.currentTime -= 10;
        tiempoClick = video.currentTime;
    });

    forwardButton.addEventListener("click", () => {
        document.getElementById("barraCargaVacia").classList.remove("oculto");
        document.getElementById("barraCargaVacia").classList.add("visible");
        video.currentTime += 10;
        tiempoClick = video.currentTime;
    });

    restartButton.addEventListener("click", () => {
        document.getElementById("barraCargaVacia").classList.remove("oculto");
        document.getElementById("barraCargaVacia").classList.add("visible");
        video.currentTime = 0;
        playButton.innerHTML = '<img src="./videos/pausa.png" alt="Pause">';
        video.play();
        
    });

    volumeDownButton.addEventListener("click", () => {
        video.volume = Math.max(0, video.volume - 0.1);
    });

    volumeUpButton.addEventListener("click", () => {
        video.volume = Math.min(1, video.volume + 0.1);
    });   
    video.addEventListener("timeupdate", barraCarga);
    
    function barraCarga(){
        let duracion = video.duration;
        let tiempoActual = video.currentTime;        
        let porcentaje = (tiempoActual / duracion) * 100;             
        
        if(tiempoActual > 6 && principioDelVideo == true){
            document.getElementById("barraCargaVacia").classList.remove("visible");
            document.getElementById("barraCargaVacia").classList.add("oculto");
            principioDelVideo = false;
        }
        if (!principioDelVideo && (tiempoActual - tiempoClick) >= 6) {
            document.getElementById("barraCargaVacia").classList.remove("visible");
            document.getElementById("barraCargaVacia").classList.add("oculto");
            principioDelVideo = false;
        }
        
        document.getElementById("barraCargaLlena").style.width = porcentaje + "%";

        const scrubberWidth = document.getElementById("barraCargaLlena").offsetWidth;        
        document.getElementById("scrubber").style.transform = "translateX(" + (scrubberWidth-25) + "px)";
    }
    
    function switchVideo(src) {

        const srcFilename = src.split('/').pop();

        switch (srcFilename) {
            case "1.png":
                cambiarVideo("./videos/1.mp4", "ocho","Puzzle de caja llena de bolas te sorprenderá");
                break;
            case "2.png":
                cambiarVideo("./videos/2.mp4", "dos","Experto en clima explica la Dana");
                break;
            case "3.png":
                cambiarVideo("./videos/3.mp4", "tres","Porque el frijol es el alimento del futuro");
                break;
            case "4.png":
                cambiarVideo("./videos/4.mp4", "cuatro", "Restauración reloj antiguo");
                break;
            case "5.png":
                cambiarVideo("./videos/5.mp4", "cinco", "Jordi Wild se sorprende con experimento");
                break;
            case "6.png":
                cambiarVideo("./videos/6.mp4", "seis", "Majes se da una vuelta en moto");
                break;
            case "7.png":
                cambiarVideo("./videos/7.mp4", "siete", "¿Qué pasó en la Dana? Te mentimos al respecto");
                break;              
        }
    }

    function cambiarVideo(videoSrc,numero, titulo) {

        video.src = videoSrc;
        playButton.innerHTML = '<img src="./videos/pausa.png" alt="Pause">';
        document.getElementById("titulo").innerHTML = titulo;

        video.play();

        const imagen = document.getElementById(numero);
        const newImage = imagen.cloneNode(true);

        imagen.parentNode.removeChild(imagen);
        
        newImage.src = videoSrc.replace(".mp4", ".png");
        
        carrusel.appendChild(newImage);

        newImage.addEventListener("click", () => {
            switchVideo(newImage.src);
        });
    }
});