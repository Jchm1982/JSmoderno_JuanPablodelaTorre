/*
Maps: Son listas ordenas en llave y valor
se crean igual que los Set
*/

const cliente = new Map();

//Para agregar un elemento, en los maps es de la siguiente forma:
cliente.set('nombre','JC');
cliente.set('tipo','premium');
cliente.set('saldo',3000);
cliente.set(true,true);

console.log(cliente);

//puedes ver con la cantidad de elementos
console.log(cliente.size);

// si un valor existe
console.log(cliente.has('nombre'));

//obtener un valor
console.log(cliente.get('nombre'));

//eliminar un valor
cliente.delete('saldo');

//limpiar todo el map
cliente.clear();
console.log(cliente);

//Se puede inciar un map con valores
const pasciente = new Map( [ ['nombre','pasciente'],['cuarto','No definido'] ] );
//agrerar valores despues de haber inicializado el map
pasciente.set('Dr','Dr house');
//Se se coloca la misma llave, eso va a re-escribir un valor
pasciente.set('nombre','Paquito');

console.log(pasciente);

//los maps tambien son iterables
pasciente.forEach(datos => {
   console.log(datos);
})