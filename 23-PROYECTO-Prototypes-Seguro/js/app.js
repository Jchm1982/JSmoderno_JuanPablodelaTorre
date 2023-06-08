//constructores
//Primer objeto
function Seguro(marca,year,tipo) {
   this.marca = marca;
   this.year = year;
   this.tipo = tipo;
}

//Realiza la cotizacion con los datos
//No se utiliza funcion de flecha por que se tiene que acceder a los datos del objeto
Seguro.prototype.cotizarSeguro = function (){
   /*
      1 = Americano 1.15
      2 = Asiatico 1.05
      3 = Europeo 1.35
   */

   let cantidad;
   const base = 2000;

  switch (this.marca) {
   case '1':
      cantidad = base * 1.15;      
      break;
   
      case '2':
      cantidad = base * 1.05;
   break;
   
   case '3':
      cantidad = base * 1.35;   
      break;
  
   default:
      break;
  }
  //Leer el año
  const diferencia = new Date().getFullYear()-this.year;
  //Cada año que la diferencia es mayor,el costo va a reducirse  un 3%
  cantidad -= ((diferencia * 3) * cantidad ) / 100;

  /*
  Si el seguro es basico se multiplica por un 30% más
  Si el seguro es completo se multiplica por un 50% más
   */
  if(this.tipo === 'basico'){
   cantidad*=1.30;
  }else{
   cantidad*=1.50;
  }
  return cantidad;
}


//segundo objeto
function UI(){}

//Aqui se llenan las opcioens de los años
UI.prototype.llenarOpciones = () => {
   const max = new Date().getFullYear(),
         min = max -20;
   
   const selectYear = document.querySelector('#year');
   for(let i=max; i > min; i--){
      let option = document.createElement('option');
      option.value = i;
      option.textContent=i;
      selectYear.appendChild(option);
   }
}

//Muestra Alertas en pantalla y se crea otro prottype
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
   const div = document.createElement('DIV');
   
   if(tipo === 'error'){
      div.classList.add('error');
   }else{
      div.classList.add('correcto');
   }
   div.classList.add('mensaje','mt-10');
   div.textContent = mensaje;

   //Insertamos en el HTML
   const formulario = document.querySelector('#cotizar-seguro');
   //insertBefore se coloca el nuevo nodo y el nodo de referencia en donde se quiere insertar
   formulario.insertBefore(div,document.querySelector('#resultado'))

   //limpiar el mensajde de error
   setTimeout(() => {
      div.remove();
   }, 3000);

}

//Un nuevo prototype para la interfaz de usuario
UI.prototype.mostrarResultado = (total,seguro) => {
   const {marca,year,tipo} =seguro;
   let textoMarca;
   switch (marca) {
      case '1':
         textoMarca = 'Americano';
         break;
         
      case '2':
         textoMarca = 'Asiatico';
         break;
      
      case '3':
         textoMarca = 'Europeo';
         break;   
   
      default:
         break;
   }
   //Crear el resultado
   const div = document.createElement('div');
   div.classList.add('mt-10');

   //Para que modifique el HTML
   div.innerHTML = `
      <p class="header">Tu resumen</p>
      <p class="font-bold">Marca:<span class="font-notmal">${textoMarca}</span></p>
      <p class="font-bold">Año:<span class="font-notmal">${year}</span></p>
      <p class="font-bold">Tipo:<span class="font-notmal capitalize">${tipo}</span></p>
      <p class="font-bold">Total:<span class="font-notmal">$ ${total}</span></p>
   `;
   const resultadoDiv = document.querySelector('#resultado');
   

   //Mostrar el spinner
   const spinner = document.querySelector('#cargando');
   spinner.style.display = 'block';

   setTimeout(() => {
      spinner.style.display = 'none';//Se borra el spinner
      resultadoDiv.appendChild(div);//se muestra el resultado
   }, 3000);
}


//Instanciamos UI
const ui = new UI();


//Cargar el documento
document.addEventListener('DOMContentLoaded', () => {
   ui.llenarOpciones();//Llena el select con los años
})

//
eventListeners();
function eventListeners(){
   const formulario = document.querySelector('#cotizar-seguro');
   formulario.addEventListener('submit',cotizarSeguro);
}

//como es un submit se toma el evento e
function cotizarSeguro(e){
   e.preventDefault();

   //LEER LA MARCA SELECCIONADA
   const marca = document.querySelector('#marca').value;
   
   //LEER EL AÑO SELECCIONADO
   const year = document.querySelector('#year').value;

   //LEER EL TIPO DE COBERTURA y como se leen los radiobuttom el que el usuario haya checado
   const tipo = document.querySelector('input[name="tipo"]:checked').value;
   
   if(marca ==='' || year === '' || tipo===''){
      ui.mostrarMensaje('Todos los campos son obligatorios','error');
      return;
   }
   ui.mostrarMensaje('Cotizando...','exito');

   //Ocultar las cotizaciones previas
   const resultados = document.querySelector('#resultado div');
   if(resultados!=null){
      resultados.remove();
   }

   //Instanciar el seguro
   const seguro = new Seguro(marca,year,tipo);
   const total = seguro.cotizarSeguro();
   

   //Utilizar el prototype que va a cotizar el seguro
   ui.mostrarResultado(total,seguro);

   
}