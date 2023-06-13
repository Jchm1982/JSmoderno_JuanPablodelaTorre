const carrito = new Set();

//Set metods
//Para agregar elementos 
//En los set no hay valores repetidos
carrito.add('camisa');
carrito.add('Disco #1');
carrito.add('Disco #2');
carrito.add('Disco #3');
carrito.add('Camisa');

//Para saber cuanto elementos hay en el erreglo se utilza size CUANTO MIDE
console.log(carrito.size);

//Comprobar si un valor existe en el set retorna tru o false
console.log(carrito.has('camisa'));

//Eliminar un elemento del set
carrito.delete('Disco #3');

//Eliminar todos los elementos del set
//carrito.clear();

//Los set son iterables
carrito.forEach( producto => {
   console.log(producto );
})

console.log(carrito);

//Del siguiente arreglo eliminar los duplicados
const numeros = [10,20,30,40,50,10,20];
const noDuplicados = new Set(numeros);
console.log(noDuplicados);