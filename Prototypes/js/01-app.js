//objeto Literal
const cliente = {
    nombre: 'Juan',
    saldo: 500
};

//POO
function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.salod = saldo;
}

const juan = new Cliente('Juan',500);
console.log(juan);