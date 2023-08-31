import {obtenerCliente,editarCliente} from './API.js';
import {mostrarAlerta,validar} from './funciones.js';

(function(){

   //Campos del formulario
   const nombreImput = document.querySelector('#nombre');
   const emailImput = document.querySelector('#email');
   const empresaImput = document.querySelector('#empresa');
   const telefonoImput = document.querySelector('#telefono');
   const idImput = document.querySelector('#id');

   document.addEventListener('DOMContentLoaded',async () =>{
      const parametrosURL = new URLSearchParams(window.location.search);

      const idCliente = parseInt(parametrosURL.get('id'));

      const cliente  = await obtenerCliente(idCliente);

      mostrarCliente(cliente);

      //submit al formulario
      const formulario = document.querySelector('#formulario');
      formulario.addEventListener('submit',validarCliente);
   });

   function mostrarCliente(cliente){
      const {nombre,empresa,email,telefono, id} = cliente;

      nombreImput.value = nombre;
      empresaImput.value = empresa;
      emailImput.value = email;
      telefonoImput.value = telefono;
      idImput.value = id;

   }

   function validarCliente(e){
      e.preventDefault();

      const cliente = {
         nombre:nombreImput.value,
         email:emailImput.value,
         telefono:telefonoImput.value,
         empresa:empresaImput.value,
         id:parseInt(idImput.value)
      }

      if(validar(cliente)){
         //mostrar mensaje
         mostrarAlerta('Todos los campos son obligatorios');
         return;
      }

      //reescribe el objeto
      editarCliente(cliente);
   }

})();