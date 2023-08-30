function descargarClientes(){
   return new Promise((resolve,reject)=>{
      const error = false;

      setTimeout(() => {
         if(!error){
            resolve('El listado de clientes se descargo correctamente');
         }else{
            reject('Error en la conexion');
         }
      }, 3000);
   })
}

//async await
/* Async -> Es sobre la funcion padre o la que se esta ejecutando el promise padre es ejecutar
await -> se utiliza en la parte que a a esperar a que se ejecute el promise, detiene la ejecucion del codigo hasta que se resuelva el promise
*/
async function ejecutar(){
   try {
      console.log(1 + 1);
      const respuesta = await descargarClientes();
      console.log(12 + 12);
      console.log(respuesta);
   } catch (error) {
      console.log();
   }
}

ejecutar();