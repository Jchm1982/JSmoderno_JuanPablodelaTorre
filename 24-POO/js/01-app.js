//Crear clases en JS
//Class Declaration
//1
class Cliente{
   constructor(nombre,saldo){
      this.nombre = nombre;
      this.saldo = saldo;
   }

   mostrarInformacion(){
      //se hace referencia a los valores del objeto
      return `Cliente:${this.nombre}, tu saldo es de ${this.saldo}`;
   }
   //los satatic no requieren una instancia para mandarse a llamar
   static bienvenida(){
      return `Bienvenido al Cajero`;
   }
}

//instanciamos la primera clase
const juan = new Cliente('Juan',400);
//esta es la forma como accedes a los valores
console.log(juan.mostrarInformacion());
console.log(juan);
console.log(Cliente.bienvenida());


//Class Expresion
const Cliente2 = class {
   constructor(nombre,saldo){
      this.nombre = nombre;
      this.saldo = saldo;
   }
   mostrarInformacion(){
      return `Cliente:${this.nombre}, tu saldo es de ${this.saldo}`;
   }
}

const juan2 = new Cliente2('Carlos',600);
console.log(juan2.mostrarInformacion());
console.log(juan2);