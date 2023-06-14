/* import, permite traer la exportacion de otro archivo*/
import nuevaFuncion, { nombreCliente,ahorro,mostarInformacion, tienesSaldo, Cliente } from './cliente.js';
import { Empresa } from './empresa.js';

nuevaFuncion();

console.log(nombreCliente);
console.log(ahorro);

console.log(mostarInformacion(nombreCliente,ahorro));

tienesSaldo(ahorro);

//Utilizar la clase de cliente
const cliente = new Cliente(nombreCliente,ahorro);

console.log(cliente.mostrarInformacion());

//importar empresa

const empresa = new Empresa('JCHM s.a de c.v',200,'Aprendiendo a exportar e importar');
console.log(empresa.mostrarInformacion());

