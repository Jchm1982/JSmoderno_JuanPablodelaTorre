//Callbaks
const paises =['Francias','España','Portugal','Australia'];

//Funcion que utiliza callback
function nuevoPais(pais,callbak){
   setTimeout(() => {
      //despues de 3 segundo agregue un pais y se pasa el pais nuevo
      paises.push(pais);
      //Se manda a llamr el calback como una funcion
      callbak();
   }, 3000);
}

function mostrarPaises(){
   setTimeout(() => {
      paises.forEach(pais =>{
         console.log(pais);
      });
   }, 2000);
}

/*Para este ejemplo no hay nimguna funcion llamada callback
pero se se utiliza una funcion cualquiera
Asi funciona el callback, mandas a llamar una funcion, agrega un valor y manda a llamar una funcion
*/

mostrarPaises('Alemania',mostrarPaises);
nuevoPais('Alemania',mostrarPaises);