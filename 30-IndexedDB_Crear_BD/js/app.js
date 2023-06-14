let DB;

document.addEventListener('DOMContentLoaded',() =>{
   crmDB();

   setTimeout(() => {
      crearCliente();
   }, 5000);
})

function crmDB(){
   //Crear BD version 1.0
   let crmDB =window.indexedDB.open('crm',1)

   //Si ahy un error
   crmDB.onerror = function() {
      console.log('Hubo error a la hora de crear BD');
   }

   //Si se creo bien
   crmDB.onsuccess = function() {
      console.log('Base de datos creada');

      DB =crmDB.result;
   }


   //Configuracion de la BD, solo se ejecuta una sola vez, cuando la DB es creada, se pasa un evento(e)
   crmDB.onupgradeneeded = function (e){
      //console.log('Este metodo solo se ejecuta una sola vez ....');
      //console.log(e.target.result);
      const db= e.target.result;

      const objectStore = db.createObjectStore('crm',{
         keyPath: 'crm',
         autoIncrement:true
      });

      //definir las columnas
      objectStore.createIndex('nombre','nombre',{ unique:false });
      objectStore.createIndex('email','email',{ unique:true });
      objectStore.createIndex('telefono','telefono',{ unique:false });

      console.log('Columnas Creadas');
   }
}

function crearCliente() {
   let transaction = DB.transaction(['crm'],'readwrite');

   transaction.oncomplete= function (){
      console.log('Transaccion completada');
   }

   transaction.onerror = function(){
      console.log('Hubo un Error en la Transaccion');
   }

   const objectStore = transaction.objectStore('crm');

   const nuevoCliente = {
      telefono:'5558974935',
      nombre:'Juan C',
      email:'correo@correo.com'
   }

   const peticion = objectStore.add(nuevoCliente);

   console.log(peticion);
}