//Iteradores

const ciudades = ['Londres','New York','Madrid','Paris'];
const ordenes = new Set([123,231,331,102]);
const datos = new Map();

datos.set('nombre','Juan C');
datos.set('profesion','support');

//default
for(let ciudad of ciudades){
   console.log(ciudad);
}
for(let orden of ordenes){
   console.log(orden);
}
for(let dato of datos){
   console.log(dato);
}

//keys Iterator
// for(let keys of ciudades.keys()){
//    console.log(keys);
// }
// for(let keys of ordenes.keys()){
//    console.log(keys);
// }
// for(let keys of datos.keys()){
//    console.log(keys);
// }




//Values Iterador
// for( let value of ciudades.values()){
//    console.log(value);
// }
// for( let value of ordenes.values()){
//    console.log(value);
// }
// for( let value of datos.values()){
//    console.log(value);
// }





//Iterador Entry imprime llave y valor
// for (let entry of ciudades.entries()) {
//    console.log(entry);
   
// }

// for (let entry of ordenes.entries()) {
//    console.log(entry);
   
// }

// for (let entry of datos.entries()) {
//    console.log(entry);
   
// }

