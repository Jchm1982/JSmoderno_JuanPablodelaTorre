document.addEventListener('DOMContentLoaded',function(){

    const email = {
        email: '',
        asunto:'',
        mensaje:''
    }

    //console.log(email);
    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    //Asignar Eventos
    //CALLBACK'S
    /* inputEmail.addEventListener('blur', function(evento){
        console.log(evento.target.value);
        
    });
    
    inputAsunto.addEventListener('blur', function(evento){
        console.log(evento.target.value);
        
    });

    inputMensaje.addEventListener('blur', function(evento){
        console.log(evento.target.value);
        
    }); */
    inputEmail.addEventListener('input',validar);
    inputAsunto.addEventListener('input',validar);
    inputMensaje.addEventListener('input',validar);

    formulario.addEventListener('submit',enviarEmail);

    btnReset.addEventListener('click',function(event){
        event.preventDefault();

        //Reiniciar el objeto
        resetFormulario();
    });

    function enviarEmail(evt) {
        evt.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout( () => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            //Reiniciar el objeto
            resetFormulario();

            //Crear una Alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent= 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            setTimeout(() => {
               alertaExito.remove(); 
            }, 3000);
         },3000);
    }


    function validar(evento){
        
        if(evento.target.value.trim() === ''){
            mostrarAlerta(`El campo ${evento.target.id} es obligatorio`,evento.target.parentElement);
            email[evento.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if(evento.target.id ==='email' && !validarEmail(evento.target.value)){
            mostrarAlerta('El Email no es valido', evento.target.parentElement);
            email[evento.target.name]='';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evento.target.parentElement);

        //Asignar los valores al obejro Email
        email[evento.target.name] = evento.target.value.trim().toLowerCase();
        
        //Comprobar el objeto de Email
        comprobarEmail();
        
    }

    function mostrarAlerta(mensaje, referencia ){
        limpiarAlerta(referencia);
        

        //Generar Alerta HTML
        const error=document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2','text-center');
        
        //Inyectar el error al Formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        //Comprueba si ya existe una alerta
        const alerta  = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    
    function comprobarEmail() {
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
    
    function resetFormulario() {
        //Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
    
        formulario.reset();

        comprobarEmail();
    }
});