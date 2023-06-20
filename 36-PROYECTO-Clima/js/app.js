   //creando los selectores
   const container = document.querySelector('.container');
   const resultado = document.querySelector('#resultado');
   const formulario = document.querySelector('#formulario');

   window.addEventListener('load',()=>{
      formulario.addEventListener('submit',buscarClima);
   });

   function buscarClima(e) {
      e.preventDefault();

      //validar
      const ciudad  =document.querySelector('#ciudad').value;
      const pais  =document.querySelector('#pais').value;

      if(ciudad ===''|| pais ===''){
         //Hubo un error
         mostrarError('ambos campos son obligatorios','error');

         return;
      }
     //Conaultamos el API
     consultarAPI(ciudad,pais);


   }

   function mostrarError(mensaje) {

      const alerta = document.querySelector('.bg-red-100');

      if(!alerta){
         console.log(mensaje);
         //crear una alerta
         const alerta = document.createElement('div');
         alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','max-w-md','mx-auto','mt-6','text-center');
         alerta.innerHTML=`
               <strong clsss="font-bold">Error !</strong>
               <span class="block">${mensaje}</span>
            `;
         container.appendChild(alerta);

         //Se elimine la alerta despues de 5 seg
         setTimeout(() => {
            alerta.remove();
         }, 5000);
      }
         
   }

   function consultarAPI(ciudad,pais) {
      const appId= '19e8089b1df52447648ce80dad1c4e39';

      const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`;

      Spinner();//muestra el spinner de carga

      fetch(url)
         .then( respuesta => respuesta.json())
         .then(datos => {
            limpiarHTML();//limpiamos el HTML previo
            if(datos.cod==="404"){
               mostrarError('Ciudad no encontrada');
               return;
            }

            //Mandamos a llamar la funcion que imprime la respuesta en el HTML
            mostrarClima(datos);
         })

   }

   function mostrarClima(datos) {
      const { name,main: { temp,temp_max,temp_min}} = datos;
      /*Las operaciones que se hacen es cuando tienes grados kelvin y se convierten centigrados
         const centigrados = temp -273.15;
      */
      const centigrados = parseInt(temp);
      const max = parseInt(temp);
      const min = parseInt(temp);

      const nombreCiudad = document.createElement('p');
      nombreCiudad.textContent = `Clima en ${name}`;
      nombreCiudad.classList.add('font-bold','text2xl');

      const actual = document.createElement('p');
      actual.innerHTML = `${centigrados} &#8451;`;
      actual.classList.add('font-bold','text-6xl');

      const tempMaxima = document.createElement('p');
      tempMaxima.innerHTML  = `Max: ${max} &#8451;`;
      tempMaxima.classList.add('text-xl');
      
      const tempMinima = document.createElement('p');
      tempMinima.innerHTML  = `Min: ${min} &#8451;`;
      tempMinima.classList.add('text-xl');

      const resultadoDiv = document.createElement('div');
      resultadoDiv.classList.add('text-center','text-white');
      resultadoDiv.appendChild(nombreCiudad);
      resultadoDiv.appendChild(actual);
      resultadoDiv.appendChild(tempMaxima);
      resultadoDiv.appendChild(tempMinima);

      resultado.appendChild(resultadoDiv);
   }

   function limpiarHTML() {
      while(resultado.firstChild){
         resultado.removeChild(resultado.firstChild);
      }
   }

   function Spinner() {
         limpiarHTML();
         
         const divSpinner=document.createElement('div');
         divSpinner.classList.add('spinner');
         divSpinner.innerHTML = `
         <div class="double-bounce1"></div>
         <div class="double-bounce2"></div>
         `;

      resultado.appendChild(divSpinner)
   }