(function (){
   let DB;
   const formulario = document.querySelector('#formulario');

   document.addEventListener('DOMContentLoaded',() =>{
      //Conectarnos a la BD
      conectarDB();

      formulario.addEventListener('submit',validarCliente);
   });

   
   
   //Como es un submit, toma el evento e, y se coloca e.preventDefault()
   function validarCliente(e){
      e.preventDefault();

      //leer todos los input, de esta forma nos permite leer lo que el usuario agrego en los input
      const nombre = document.querySelector('#nombre').value;
      const email = document.querySelector('#email').value;
      const telefono = document.querySelector('#telefono').value;
      const empresa = document.querySelector('#empresa').value;
      if(nombre==='' || email==='' || telefono==='' || empresa===''){
         //Agregamos funcion de Alerta
         imprimirAlerta('Todos los campos son obligatorios','error');

         return;
      }

      //Crear un objeto con la información
      const cliente = {
         //se queda de esta forma por que la variable y el nombre son iguales,esto por el objectLiteral
         nombre,
         email,
         telefono,
         empresa,
         //id:Date.now()
      }
      cliente.id = Date.now();
      crearNuevoCliente(cliente);

   }

   function crearNuevoCliente(cliente) {
      //Utilizamos las transacciones
      const transaction = DB.transaction(['crm'],'readwrite');

      //definimos el objectstore
      const objectStore = transaction.objectStore('crm');

      objectStore.add(cliente);

      transaction.onerror = function(){
         imprimirAlerta('Hubo un error','error');
      }

      transaction.oncomplete = function(){
         //console.log('Cliente Agregado');

         imprimirAlerta('El cliente se agrego correctamente');
         setTimeout(() => {
            window.location.href = 'index.html';
         }, 3000);
      }
   }

     


})();