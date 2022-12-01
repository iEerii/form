document.addEventListener('DOMContentLoaded', function() {
   
    const datos = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#enviar-mail');
    const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]')
    const btnReset = document.querySelector('#enviar-mail button[type="reset"]')

    
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        //reiniciar el objeto
        datos.email = '';
        datos.asunto = '';
        datos.mensaje = '';
        
        formulario.reset();
        comprobarEmail();
    })
    
    function validar(e) {
        if(e.target.value.trim() === ''){ 
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            
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

    function mostrarAlerta(mensaje, referencia){ 
       limpiarAlerta(referencia);
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        referencia.appendChild(error); 
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(datos) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(datos);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(datos).includes('')){ 
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false; 
    }
});