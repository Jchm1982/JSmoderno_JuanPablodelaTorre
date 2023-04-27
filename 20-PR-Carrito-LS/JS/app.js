//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos de Local Storage
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Resetamos el arreglo

        limpiarHTML();// eliminamos todo el HTML
    });
}

//Funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;        
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //Elimina del arreglo con el articulosCarrito por el data-id
    
        articulosCarrito= articulosCarrito.filter ( curso => curso.id !== cursoId);

        carritoHTML();//Iterar sobre el carrito y mostrar su HTML


    }

    
}



//Lee el contenido del contenido HTML al que le dimos CLICK y extrae la informacion del curso
function leerDatosCurso(cursoSeleccionado){
    //console.log(cursoSeleccionado)

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id:cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }
    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(cursoSeleccionado => cursoSeleccionado.id === infoCurso.id );
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(cursoSeleccionado => {
            if(cursoSeleccionado.id === infoCurso.id){
                cursoSeleccionado.cantidad++;
                return cursoSeleccionado;//regresa el objeto actualizado
            }else{
                return cursoSeleccionado;//regresa el objetos que no estan duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //Agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma Lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}