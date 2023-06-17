//Promises
/*
Para los promises new Promise( (Tenemos acceso a 2 palabras reservadas[resolve y reject] ) =>{

})
resolve:etso se ejecutara cuando el promise se ejecuta correctamente o cuando se cumple
reject:se ejecuta cuando tenemos un error en el promise
*/
const aplicarDescuento = new Promise( (resolve,reject) =>{
   const descuento = true;

   if(descuento){
      resolve('Decuento Aplicado');
   }else{
      reject('No se pudo aplicar el descuento');
   }
} );

/*Como se utilizan los promise
.then() aqui se realizara la accion, una vez que se realiza el promise
SINTAXIS
Es decir, quiero utilizar este promise(aplicarDescuento).y entonces then(se tendra el resultado)
es la forma en la que se va acceder a la respuesta
Y para sacar lo que esta el reject
Cuando falla un promise se tiene acceso al .catch
*/

/*
aplicarDescuento.then( resultado => {
   console.log(resultado);
})
.catch( error => {
   console.log('ERROR');
})
por los => function se pueden eliminar las llaves
cuando se cumple se puede llamar funciones
*/
aplicarDescuento.then( resultado => descuento(resultado))
.catch( error => console.log('ERROR'))

/*
Hay 3 valores posibles para el promise
fulfilled:El promise se cumplio
rejected:El promise NO se cumplio
pending:Que no se ha cumplido, pero tampoco ha sido rechazado
*/
function mensaje(mensaje) {
   console.log(mensaje);
}