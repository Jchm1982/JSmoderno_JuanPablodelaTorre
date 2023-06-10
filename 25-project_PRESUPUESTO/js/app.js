//variables y selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')



//Eventos

eventListeners();
function eventListeners(){
   document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

   formulario.addEventListener('submit',agregarGasto);
}



//Clases
class Presupuesto{
   constructor(presupuesto){
      this.presupuesto = Number(presupuesto);
      this.restante = Number(presupuesto);
      this.gastos = [];
   }

   nuevoGasto(gasto){
      this.gastos = [...this.gastos,gasto];
      this.calcularRestante();
   }

   calcularRestante(){
      //reduce() toma 2 parametros
      const gastado = this.gastos.reduce( (total,gasto) => total + gasto.cantidad,0);
      this.restante = this.presupuesto - gastado;
   }

   eliminarGasto(id){
      this.gastos = this.gastos.filter( gasto => gasto.id !== id );
      this.calcularRestante();
   } 
}

class UI{
   //metodo
   insertarPresupuesto(cantidad){
      //cantidad es un objeto
      //Extrayendo Valores
      const {presupuesto,restante} =cantidad;

      //Agregamos al HTML
      document.querySelector('#total').textContent = presupuesto;
      document.querySelector('#restante').textContent = restante;
   }

   imprimirAlerta(mensaje,tipo){
      //crear div
      const divMensaje = document.createElement('div');
      divMensaje.classList.add('text-center','alert');
      if (tipo==='error') {
         divMensaje.classList.add('alert-danger');
      }else{
         divMensaje.classList.add('alert-success');
      }

      //mensaje de error
      divMensaje.textContent =mensaje;

      //insertamos en HTML
      //insertBefore toma 2 argumentos,1.- que vamos a insertar y 2.- en que parte se va a colocar
      document.querySelector('.primario').insertBefore(divMensaje,formulario);

      //quitar el mensaje del HTML
      setTimeout(() => {
         divMensaje.remove();
      }, 3000);
   }
   mostrarGastos(gastos){
      this.limpiarHTML();//Elimina el HTML previo

      //Iterando sobre los gastos
      gastos.forEach(gasto => {
         const { cantidad,nombre,id} = gasto;
         
         //crear un LI
         const nuevoGasto = document.createElement('li');
         nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
         //nueva forma de agregar data-id
         nuevoGasto.dataset.id = id;


         //agregar el HTML del gasto
         nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;

         //boton para borrar el gasto
         const btnBorrar = document.createElement('button');
         btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
         btnBorrar.innerHTML = 'Borrar &times';
         btnBorrar.onclick = () =>{
            eliminarGasto(id);
         };
         nuevoGasto.appendChild(btnBorrar);


         //agregar al HTML

         gastoListado.appendChild(nuevoGasto);
      })
   }

   limpiarHTML(){
      while( gastoListado.firstChild ){
         gastoListado.removeChild(gastoListado.firstChild);
      }
   }

   actualizarRestante(restante){
      document.querySelector('#restante').textContent = restante;
   }

   comprobarPresupuesto(presupuestoObj){
      const {presupuesto,restante }= presupuestoObj;
      
      const restanteDiv = document.querySelector('.restante');
      //Comprobar 25%
      if( (presupuesto / 4) > restante ){
         restanteDiv.classList.remove('alert-success','alert-warning');
         restanteDiv.classList.add('alert-danger');
      }else if( (presupuesto / 2) > restante ){
         restanteDiv.classList.remove('alert-success');
         restanteDiv.classList.add('alert-warning');
      }else{
         restanteDiv.classList.remove('alert-danger','alert-warning');
         restanteDiv.classList.add('alert-success');
      }


      if (restante <= 0) {
         ui.imprimirAlerta('El presupuesto se ha Agotado','errors');
         formulario.querySelector('button[type="submit"]').disabled = true;
      }
   }
}
//Instanciar
const ui = new UI();

let presupuesto;



//Funciones

function preguntarPresupuesto(){
   const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
   //console.log(presupuestoUsuario);

   if(presupuestoUsuario==='' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario <=0){
      window.location.reload();//Recarga la ventana actual y hace la validaacion
   }
   presupuesto = new Presupuesto(presupuestoUsuario);
   

   ui.insertarPresupuesto(presupuesto);
}

//Añade gastos
//como es un submit le pasamos e
function agregarGasto(e){
   e.preventDefault();//previene accion por default

   //leemos los gastos del formulario
   const nombre = document.querySelector('#gasto').value;
   const cantidad = Number(document.querySelector('#cantidad').value);

   //validar
   if (nombre ==='' || cantidad ==='') {
      console.log('Ambos campos son obligatorios');
      ui.imprimirAlerta('Ambos Campos son Obligatorios','error');
      return;//Se coloca para que no se ejecuten las siguientes lineas de codigo
   }else if(cantidad<=0 || isNaN(cantidad) ){
       ui.imprimirAlerta('Cantidad no Valida','error');
       return;
   }

   //crear objeto de tipo Gasto
   /*
   esta forma extrae nombre y cantidad destruction
   const {nombre,cantidad} = gasto;
   */
  //esta sintaxis une nombre y cantidad a gasto
   const gasto = {nombre,cantidad,id:Date.now() }


   //añade un nuevo gasto
   presupuesto.nuevoGasto(gasto);

   //Mensaje de que todo esta correcto
   ui.imprimirAlerta('Gasto agregado Correctamente');

   //Imprimir los gastos

   //aplicar distrocturing
   const {gastos,restante} = presupuesto;
   ui.mostrarGastos(gastos);

   ui.actualizarRestante(restante);

   ui.comprobarPresupuesto(presupuesto);

   //para reiniciar el formulario
   formulario.reset();
   
}

//eliminar Gasto
function eliminarGasto(id) {
   //elimina del objeto
   presupuesto.eliminarGasto(id);

   //elimina los gastos de HTML

   const { gastos,restante } = presupuesto;
   ui.mostrarGastos(gastos);

   ui.actualizarRestante(restante);

   ui.comprobarPresupuesto(presupuesto);
}
