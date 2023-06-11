//todo esto es selecciona de HTML
//campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

/*UI (user Interface) */
//seleccionamos el formulario
const formulario  = document.querySelector('#nueva-cita');
//Seccion para listar las citas UL
const contenedorCitas  = document.querySelector('#citas');

let editando;

/*Definir las clases */
class Citas{
   constructor(){
      this.citas = [];
   }
   agregarCita(cita){
      this.citas = [...this.citas,cita];
   }

   eliminarCita(id){
      //filter quita un elemento, o quitar los demas  y mantener un elemento basado en una condicion
      this.citas = this.citas.filter( cita => citas.id !== id);
   }
   editarCita(citaActualizada){
      //.map recorre los elementos del arreglo, crea un nuevo arreglo
      this.citas = this.citas.map( cita => cita.id===citaActualizada.id ? citaActualizada : cita);
   }

}

class UI{
   imprimirAlerta(mensaje,tipo){
      //Creamos el div
      const divMensaje = document.createElement('div');
      divMensaje.classList.add('text-center','alert','d-block','col-12');

      //Agregar clase en base al tipo de error
      if(tipo ==='error'){
         divMensaje.classList.add('alert-danger');
      }else{
         divMensaje.classList.add('alert-success');
      }

      //Mensaje de Error
      divMensaje.textContent = mensaje;

      //Agregamos al DOM
      document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

      //Quitar la Alerta despues de 5 segundos
      setTimeout(() => {
         divMensaje.remove();
      }, 5000);
   }
   //Se puede aplicar destructoring desde el parentecis {citas}
   imprimirCitas({citas}){

      this.limpiarHTML();

      citas.forEach( cita => {
         const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
         const divCita = document.createElement('div');
         divCita.classList.add('cita','p-3');
         divCita.dataset.id = id;

         //Scripting de los elementos de la cita
         const mascotaParrafo = document.createElement('h2');
         mascotaParrafo.classList.add('card-title','font-weight-bolder');
         mascotaParrafo.textContent = mascota;

         const propietarioParrafo = document.createElement('p');
         propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
         `;
         
         const telefonoParrafo = document.createElement('p');
         telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
         `;
         
         const fechaParrafo = document.createElement('p');
         fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
         `;
         
         const horaParrafo = document.createElement('p');
         horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora}
         `;
         const sintomasParrafo = document.createElement('p');
         sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
         `;

         //Boton para eliminar las citas
         const btnEliminar = document.createElement('button');
         btnEliminar.classList.add('btn','btn-danger','mr-2');
         btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
         btnEliminar.onclick = () => eliminarCita(id);

         //Añadir un boton para editar
         const btnEditar = document.createElement('button');
         btnEditar.classList.add('btn','btn-info');
         btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>';
         btnEditar.onclick = () => cargarEdicion(cita);
         console.log(cita);


         //Agregar los parrafos al divCita
         divCita.appendChild(mascotaParrafo); 
         divCita.appendChild(propietarioParrafo);
         divCita.appendChild(telefonoParrafo);
         divCita.appendChild(fechaParrafo);
         divCita.appendChild(horaParrafo);
         divCita.appendChild(sintomasParrafo);
         divCita.appendChild(btnEliminar);
         divCita.appendChild(btnEditar);

         //Agregar las citas al HTML
         contenedorCitas.appendChild(divCita);
      })
   }
   limpiarHTML(){
      while(contenedorCitas.firstChild){
         contenedorCitas.removeChild( contenedorCitas.firstChild);
      }
   }

}

const ui = new UI();
const administrarCitas = new Citas();


/*Registrar los eventos */
//Listeners para todos los elementos html
eventListers();
function eventListers(){
   //leer lo que el usuario escribe en el text change o pinput
   mascotaInput.addEventListener('change',datosCita);
   propietarioInput.addEventListener('change',datosCita);
   telefonoInput.addEventListener('change',datosCita);
   fechaInput.addEventListener('change',datosCita);
   horaInput.addEventListener('change',datosCita);
   sintomasInput.addEventListener('change',datosCita);

   formulario.addEventListener('submit',nuevaCita);
}

//objeto con la información de la cita
const citaObj = {
   mascota: '',
   propietario: '',
   telefono: '',
   fecha:'',
   hora:'',
   sintomas:''
}

/*Agregar datos al objeto de cita */
//leer lo que el usuario esta escribiendo
function datosCita(e){
   //leer el atributo del HTML e.target.names, accedemos a las propiedades
   citaObj[e.target.name]=e.target.value;
   console.log(citaObj);
}

/*Valida y Agrega una nueva cita a la clase de citas */
function nuevaCita(e){
   e.preventDefault();
   
   //Extraer la información del objeto de cita
   const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;
   
   //validar
   if(mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas===''){
      ui.imprimirAlerta('Todos los campos son Obligatorios','error');

      return;
   }

   if (editando) {
         //Mensaje de editado correctamente
         ui.imprimirAlerta('Editado Correctamente');

         //pasar el objeto de la cita a edición
         administrarCitas.editarCita({...citaObj})

         //Regresar texto del boton a su estado original
         formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

         //quitar modo edicion
         editando = false;
   }else{

      //Generar un id unico
      citaObj.id = Date.now();

      //Crear una nueva cita
      //{...citaObj} se agrega una copia del objeto, para no reescribir y se quede el ultimo regitro y se duplique la info. Se hace con el spred
      administrarCitas.agregarCita({...citaObj});

      //Mensaje de agregado correctamente
      ui.imprimirAlerta('Se agrego Correctamente');
   }
 

   //Reiniciar el objeto para la validacion
   reiniciarObejto();

   //Reiniciamos el formulario
   formulario.reset();

   //Mostrar el HTML de ls citas
   ui.imprimirCitas(administrarCitas);
}

//reiniciamos el objeto
function reiniciarObejto(){
   citaObj.mascota='';
   citaObj.propietario='';
   citaObj.telefono='';
   citaObj.fecha='';
   citaObj.hora='';
   citaObj.sintomas='';  

}

function eliminarCita(id) {
   //Eliminar la Cita
   administrarCitas.eliminarCita(id);
   
   //Muestre el mensaje
   ui.imprimirAlerta('La cita se elimino correctamente');
   //Recargar las citas
   ui.imprimirCitas(administrarCitas);
}

//carga los datos y el modo de edicion
function cargarEdicion(cita){
   const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
   
   //Llenar los inputs
   mascotaInput.value = mascota;
   propietarioInput.value = propietario;
   telefonoInput.value = telefono;
   fechaInput.value = fecha;
   horaInput.value = hora;
   sintomasInput.value = sintomas;

   //Llenar el objeto
   citaObj.mascota = mascota;
   citaObj.propietario = propietario;
   citaObj.telefono = telefono;
   citaObj.fecha = fecha;
   citaObj.hora = hora;
   citaObj.sintomas = sintomas;
   citaObj.id = id;

   //cambiar el texto del boton
   formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
   
   editando=true;

}