/* Los symbols no son iguales nunca*/
const sym = Symbol();
const sym2 = Symbol();

/*
if(sym===sym2){
   console.log('Son iguales');
}else{
   console.log('Son diferentes');
}
*/

const nombre = Symbol();
const apellido = Symbol();

const persona = {}

//agregando nombre y apellido, como llaves del objeto
persona[nombre] = 'Juan';
persona[apellido] = 'Hernandez';
persona.tipoCliente = 'Premium';
persona.saldo = 500;



console.log(persona);
//para acceder se tiene que utilizar los corchetes
/*Las propiedades que se tengan definidas por medio de un symbol no son iterables */
console.log(persona[nombre]);

/*Definir una descripcion de un symbol */
const nombreCliente = Symbol('name del cliente');
const cliente = {};

cliente[nombreCliente] = 'Peter';

console.log(cliente);
console.log(cliente[nombreCliente]);
console.log(nombreCliente);