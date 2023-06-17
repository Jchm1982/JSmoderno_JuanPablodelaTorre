//Corregir callback hell hacerlo con Promise

const paises = [];

const nuevoPais = pais => new Promise( resolve => {
   setTimeout(() => {
      paises.push(pais);
      resolve(`El resultado del resolve, Agregado: ${pais}`);
   }, 3000);
});


nuevoPais('Alemania')
   .then(resultado => {
      console.log(resultado);
      console.log(paises);
      //Aqui se pone return para volver a llamar el promise
      return nuevoPais('Francia');
   })
   .then(resultado =>{
      console.log(resultado);
      console.log(paises);
      return nuevoPais('Inglaterra');
   })
   .then(resultado => {
      console.log(resultado);
   })