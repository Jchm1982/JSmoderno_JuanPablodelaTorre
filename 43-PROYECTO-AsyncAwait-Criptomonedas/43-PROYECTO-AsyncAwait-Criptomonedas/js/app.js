const criptomonedasSelect= document.querySelector('#criptomonedas');
const monedaSelect= document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
   moneda:'',
   criptomoneda:''
}

//Crear un Promise, para descargar las criptomonedas
const obtenerCriptomonedas = criptomonedas => new Promise( resolve  =>{
   resolve(criptomonedas);
});


document.addEventListener('DOMContentLoaded',()=>{
   consultarCriptomonedas();

   formulario.addEventListener('submit',sibmitFormulario);

   criptomonedasSelect.addEventListener('change',leerValor);
   monedaSelect.addEventListener('change',leerValor);
})

async function consultarCriptomonedas(){
   const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                  

   // fetch(url)
   //    .then( respuesta =>  respuesta.json() )
   //    .then(resultado => obtenerCriptomonedas(resultado.Data))
   //    .then(criptomonedas => selectCriptomonedas(criptomonedas) )

   try {
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const criptoMonedas = await obtenerCriptomonedas(resultado.Data);
      selectCriptomonedas(criptoMonedas);
   } catch (error) {
      console.log(error);
   }
}

function selectCriptomonedas( criptomonedas ){
   criptomonedas.forEach(cripto => {
      const { FullName, Name} = cripto.CoinInfo;

      const option = document.createElement('option');
      option.value = Name;
      option.textContent = FullName;
      criptomonedasSelect.appendChild(option);
   });
}

function leerValor(e){
   objBusqueda[e.target.name] = e.target.value;
   
}

function sibmitFormulario(e){
   e.preventDefault();

   //Validar
   const {moneda,criptomoneda} = objBusqueda;

   if(moneda==='' || criptomoneda===''){
      mostrarAlerta('Ambos Campos son Obligatorios');
      return;
   }

   //consultar la API con los resultados
   consultarAPI();
}

function mostrarAlerta(msg){
   const existeError = document.querySelector('.error');

   if(!existeError){
      const divMansaje = document.createElement('div');
      divMansaje.classList.add('error')
   
      //mensaje de error
      divMansaje.textContent = msg;
      formulario.appendChild(divMansaje);
      
      setTimeout(() => {
         divMansaje.remove();
      }, 3000);
   }

   
}

async function consultarAPI(){
   const {moneda,criptomoneda} = objBusqueda;
   const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

   mostrarSpinner();

   // fetch(url)
   //    .then(respuesta => respuesta.json())
   //    .then(cotizacion =>{
   //       mostrarCotozacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
   //    })

      try {
         const respuesta = await fetch(url);
         const resultado = await respuesta.json();
         mostrarCotozacionHTML(resultado.DISPLAY[criptomoneda][moneda])
      } catch (error) {
         console.log(error);
      }
}

function mostrarCotozacionHTML(cotizacion){
   limiarHTML();

   const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE}=cotizacion;
   const precio = document.createElement('p');
   precio.classList.add('precio');
   precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

   const precioAlto = document.createElement('p');
   precioAlto.innerHTML = `El precio mas alto del dia <span>${HIGHDAY}</span>`;

   const precioBajo = document.createElement('p');
   precioBajo.innerHTML = `El precio mas bajo del dia <span>${LOWDAY}</span>`;

   const precioUltimashoras = document.createElement('p');
   precioUltimashoras.innerHTML = `Variación Ultimas 24 hrs.<span>${CHANGEPCT24HOUR}%</span>`;

   const ultimaActualizacion = document.createElement('p');
   ultimaActualizacion.innerHTML = `Ultima actualizaicón <span>${LASTUPDATE}</span>`;
   
   resultado.appendChild(precio);
   resultado.appendChild(precioAlto);
   resultado.appendChild(precioBajo);
   resultado.appendChild(precioUltimashoras);
   resultado.appendChild(ultimaActualizacion);
}

function limiarHTML(){
   while(resultado.firstChild){
      resultado.removeChild(resultado.firstChild);
   }
}

function mostrarSpinner(){
   limiarHTML();

   const spinner = document.createElement('div');
   spinner.classList.add('spinner');

   spinner.innerHTML = `
         <div class="bounce1"></div>
         <div class="bounce2"></div>
         <div class="bounce3"></div>
   `;

   resultado.appendChild(spinner);
}