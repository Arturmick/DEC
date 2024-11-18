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

    document.querySelectorAll("#carrusel img").forEach(img => {
        img.addEventListener("click", () => {
            
            switchVideo(img.src);            
        });
    });

    playButton.addEventListener("click", () => {

        if (video.paused) {

            playButton.innerHTML = '<img src="./videos/pausa.png" alt="Pause">';
            video.play();

        } else {
            playButton.innerHTML = '<img src="./videos/jugar.png" alt="Pause">';
            video.pause();
        }
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
        video.currentTime -= 10;
    });

    forwardButton.addEventListener("click", () => {
        video.currentTime += 10;
    });

    restartButton.addEventListener("click", () => {
        video.currentTime = 0;
        video.play();
    });

    volumeDownButton.addEventListener("click", () => {
        video.volume = Math.max(0, video.volume - 0.1);
    });

    volumeUpButton.addEventListener("click", () => {
        video.volume = Math.min(1, video.volume + 0.1);
    });

            
    function cambiarVideo(videoSrc,numero) {

        video.src = videoSrc;
        playButton.innerHTML = '<img src="./videos/pausa.png" alt="Pause">';

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
    function switchVideo(src) {

        const srcFilename = src.split('/').pop();

        switch (srcFilename) {
            case "1.png":
                cambiarVideo("./videos/1.mp4", "ocho");
                break;
            case "2.png":
                cambiarVideo("./videos/2.mp4", "dos");
                break;
            case "3.png":
                cambiarVideo("./videos/3.mp4", "tres");
                break;
            case "4.png":
                cambiarVideo("./videos/4.mp4", "cuatro");
                break;
            case "5.png":
                cambiarVideo("./videos/5.mp4", "cinco");
                break;
            case "6.png":
                cambiarVideo("./videos/6.mp4", "seis");
                break;
            case "7.png":
                cambiarVideo("./videos/7.mp4", "siete");
                break;              
        }
    }
});