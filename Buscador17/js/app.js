//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max= new Date().getFullYear();
const min= max -10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};


//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos();//Muestra los automoviles al cargar

    //LLena las opciones de años
    llenarSelect();
})

//Event Listener para los select de busqueda
marca.addEventListener('change',event => {
    datosBusqueda.marca = event.target.value;
    filtrarAuto();
});

year.addEventListener('change',event => {
    datosBusqueda.year = parseInt(event.target.value);
    filtrarAuto();

});

minimo.addEventListener('change',event => {
    datosBusqueda.minimo = event.target.value;
    filtrarAuto();
});

maximo.addEventListener('change',event => {
    datosBusqueda.maximo = event.target.value;
    filtrarAuto();
});

puertas.addEventListener('change',event => {
    datosBusqueda.puertas = parseInt(event.target.value);
    filtrarAuto();
});

transmision.addEventListener('change',event => {
    datosBusqueda.transmision = event.target.value;
    filtrarAuto();
});

color.addEventListener('change',event => {
    datosBusqueda.color = event.target.value;
    
    filtrarAuto();
});

//Funciones
function mostrarAutos(autos) {
    limpiarHTML(); //Elimina el HTML previo

    autos.forEach( auto => {
        const {marca,modelo,year,puertas,transmision,precio,color} = auto;

        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color};
        `;


        //Insertar en el html
        resultado.appendChild(autoHTML);
    });   
}
//limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//agrega las opciones de año al select
    }   
}

//Funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    //console.log(resultado);
    
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta','error');
    noResultado.textContent= 'No hay Resultados, favor de utilizar otros criterios';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca ===marca;
    }
    return auto;
}

function filtarYear(auto) {
    const {year} = datosBusqueda;
    if(year){
        return auto.year ===year;
    }
    return auto;
    
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;   
    
}
function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio= minimo;
    }
    return auto;   
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas ===puertas;
    }
    return auto;   
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision ===transmision;
    }
    return auto;   
}
function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color){
        return auto.color ===color;
    }
    return auto;     
}