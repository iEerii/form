document.addEventListener('DOMContentLoaded', function() {
    //PASO DIEZ: se crea un objeto para enviar el formulario
    const datos = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    //PASO DOS: se seleccionan los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#enviar-mail');
    const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]')
    
    //PASO TRES: se asignan los eventos
    // inputEmail.addEventListener('blur', function(e){ //callback
    //     console.log(e.target.value);
    // });

    // inputAsunto.addEventListener('blur', validar)
        

    // inputMensaje.addEventListener('blur', function(e){
    //     console.log(e.target.value)
    // });

    //OTRA MANERA DE HACERLO CON UNA FUNCION y sin el callback
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        if(e.target.value.trim() === ''){ //PASO CUATRO: verificar que no haya espacios en blanco con .trim
            mostrarAlerta(`El campo ${e.target.id} es obligatorio ( ͡° ͜ʖ ͡°)`, e.target.parentElement);
            //PASO NUEVE: se limpia la alerta en caso de validación de datos
            datos[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            datos[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //PASO DIEZ 1.1: asignar los valores 
        datos[e.target.name] = e.target.value.trim().toLowerCase();
        //comprobar el objeto de email
        comprobarEmail();
    }

    //PASO CINCO: crear una alerta de error en la validacion
    function mostrarAlerta(mensaje, referencia){ //PASO SIETE: el mensaje debe aparecer en cada campo
       limpiarAlerta(referencia);
        
        //PASO CINCO 1.1: generar alerta en html
        const error = document.createElement('P');
        //PASO CINCO 1.2: forma de añadir texto al parrafo
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        //PASO SEIS: inyectar el error al formulario con .appenchild
        referencia.appendChild(error); 
        //otra manera de hacerlo es 
        //formulario.innerHTML = error.innerHTML;
    }

    //PASO NUEVE 1.1: se crea la funcion para limpiar la alerta
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(datos) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //expresion regular
        const resultado = regex.test(datos);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(datos).includes('')){ //para verificar que todos los campos esten llenos
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }
});