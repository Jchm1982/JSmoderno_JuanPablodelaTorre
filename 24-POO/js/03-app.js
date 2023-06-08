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

//herencia
class Empresa extends Cliente{
   constructor(nombre,saldo,telefono,categoria){
      //Esta va a ir hacia la clase padre y buscara los atributos que le pases en el super()
      super(nombre,saldo);
      this.telefono = telefono;
      this.categoria = categoria;
   }
   //se re-escriben utilizando la clase del hijo
   static bienvenida(){//reescribir un metodo
      return `Bienvenido al Cajero de Empresas`;
   }
}


//instanciamos la primera clase
const juan = new Cliente('Juan',400);
const empresa = new Empresa('Codigo JC',700,5545678909,'Aprendiendo en Linea');
console.log(empresa);
console.log(empresa.mostrarInformacion());

console.log(Cliente.bienvenida());
console.log(Empresa.bienvenida());