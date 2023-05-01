function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
}

//prototype
Cliente.prototype.tipoCliente = function (){
    let tipo;

    if (this.saldo > 10000) {
        tipo='Gold';
    }else if(this.saldo > 5000){
        tipo='Platinum';
    }else{
        tipo='Normal';
    }
    return tipo;
    
}

Cliente.prototype.nombreClienteSaldo = function () {
        return `Nombre:${this.nombre}, Saldo:${this.saldo}, Tipo Cliente:${this.tipoCliente()}`;
}

Cliente.prototype.retiraSaldo = function(retira){
    this.saldo-=retira;
}

function Persona(nombre,saldo,telefono) {
    //this.nombre = nombre;
    //this.saldo = saldo;
    Cliente.call(this, nombre,saldo);//de esta forma heredamos nombre y saldo
    this.telefono = telefono;
}

Persona.prototype = Object.create(Cliente.prototype);

Persona.prototype.constructor = Cliente;

//Intsanciando
const juan  = new Persona('JCHM',9000,55647588);
console.log(juan);
console.log(juan.nombreClienteSaldo());

Persona.prototype.mostrarTelefono = function() {
    return `El telefono de esta Persona es ${this.telefono}`;
}

console.log(juan.mostrarTelefono());