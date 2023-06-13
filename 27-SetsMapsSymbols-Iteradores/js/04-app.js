const producto = {
   idProducto:10,

}


const weekmap =new WeakMap();

weekmap.set(producto,'monitor');

console.log(weekmap.has(producto));
console.log(weekmap.get(producto));