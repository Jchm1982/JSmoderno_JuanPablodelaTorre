//Para validar que se esta viendo la pagina en este momento
document.addEventListener('visibilitychange', () => {
   if(document.visibilityState==='visible'){
      console.log('Ejecutar la funcion para reproducir el video...');
   }else{
      console.log('Pausar el video');
   }
} )