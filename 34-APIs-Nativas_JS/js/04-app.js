//Estar en pantalla completa
const abrirBtn = document.querySelector('#abrir-pantalla-completa');
const salirBtn = document.querySelector('#salir-pantalla-completa');

abrirBtn.addEventListener('click',pantallaCompleta);
salirBtn.addEventListener('click',cerrarPantallaCompleta);

function pantallaCompleta(){
   //quiero que todo el sitio corra en pantalla completa
   document.documentElement.requestFullscreen();
}

function cerrarPantallaCompleta() {
   document.exitFullscreen();
}