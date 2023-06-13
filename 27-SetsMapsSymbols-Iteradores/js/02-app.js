/*
1.-weakset
2.-set debil
3.-solo se pueden agregar objetos
*/
const weakset = new WeakSet();

const cliente = {
   nombre: 'Juan',
   apellido: 'Hernandez',
   saldo:100
}

weakset.add(cliente);



console.log(weakset);