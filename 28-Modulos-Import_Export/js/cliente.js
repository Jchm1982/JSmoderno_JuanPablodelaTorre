// (function(){
//    console.log('Desde un IIFE');

//    //Si se quiere utilizar las variables en otro archivo se tiene que hacer con window
//    window.nombreCliente = 'JC';
// })();
/*
para que este valor este disponible en otro archivo es de la siguiente forma
Y para que funcione export se en donde colocas los archivos en este caso en el index
<script src="js/cliente.js" type="module"></script>
export = saca una variable, una funcion hasta una clase
*/
export const nombreCliente = 'Juan C';
export const ahorro = 200;

export function mostarInformacion(nombre, ahorro){
   return `Cliente:${nombre} - Ahorro: ${ahorro}`;
}

export function tienesSaldo(ahorro) {
   if (ahorro > 0) {
      console.log('Si tiene saldo');
   }else{
      console.log('El cliente no tiene saldo');
   }
}

export class Cliente{
   constructor(nombre,ahorro){
      this.nombre = nombre;
      this.ahorro =ahorro;
   }
   mostrarInformacion(){
      return `Cliente:${this.nombre} - Ahorro: ${this.ahorro}`;;
   }
}

//existe el export default y no puede estar en las llaves
export default function nuevaFuncion(){
   console.log('Este es el export default');
}