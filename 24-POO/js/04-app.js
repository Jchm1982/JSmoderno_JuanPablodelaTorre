class Cliente{
   //Con el # la propiedad es privada y solo se puede acceder desde la clase con otro atributo
   #nombre;
   constructor(nombre,saldo){
      
      this.#nombre = nombre;
      this.saldo = saldo;
   }

   mostrarInformacion(){
      //se hace referencia a los valores del objeto
      return `Cliente:${this.#nombre}, tu saldo es de ${this.saldo}`;
   }
   //los satatic no requieren una instancia para mandarse a llamar
   static bienvenida(){
      return `Bienvenido al Cajero`;
   }
}

const juan = new Cliente('Juan',400);
console.log(juan.mostrarInformacion());
console.log(juan);