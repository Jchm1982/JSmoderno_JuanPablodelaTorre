//VAriables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',() =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        
        console.log(tweets);

        crearHTML();
    });
}




//Funciones
function agregarTweet(evento){
    evento.preventDefault();

    //textArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion..
    if(tweet ===''){
        mostrarError('Un mensaje no puede ir vacio');
        return;//Previene que se ejecutenmas lineasl del codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet //cuando un valor es el mismo en el objeto tweet: tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets,tweetObj];
    
    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
};

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 seg
    setTimeout(() => {
        mensajeError.remove();       
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        

        tweets.forEach( tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignamos el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el HTML
            listaTweets.appendChild(li);
        } );
    }
    sincronizarStorage();
}

//Agrega los tweet actuales a LocalSorage
function sincronizarStorage() {
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//Elimian un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    
    crearHTML();
}


//limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

