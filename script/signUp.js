import { getUsers } from './getUsers.js';
import { createUser } from './createUser.js';

const BTNREGISTRAR = document.querySelector('#btnRegistrar');

const register = async (e) => {
    const NOMBRE =document.querySelector('#Nombre').value;
    const NUMCELULAR= document.querySelector('#NumCelular').value;
    const CONTRASENIA = document.querySelector('#contrasenia').value;
    const URLIMG = document.querySelector('#imgPerfil').value;

    let listUsers = await getUsers();

    let user = listUsers.find(user => user.numCelular == NUMCELULAR);

    if (user) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El numero ingresado ya existe!',
            confirmButtonColor: '#00a884',
            width: '20rem',
          })
    }else{
        user ={
            nombre: NOMBRE,
            numCelular: NUMCELULAR,
            contrasenia: CONTRASENIA,
            urlImgPerfil: URLIMG,
            flag: "",
            infoUsuario: " ",
            fechaHoraEnLinea: ""
        }
         let data = await createUser(user);
         console.log(data);
         Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente!',
            confirmButtonColor: '#00a884',
            width: '20rem',
         })
         window.open(`/index.html?id=${data.id}`,'_self');
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Falta llenar los campos indicados!',
              confirmButtonColor: '#00a884',
              width: '20rem',
            })
          }
          else {
            event.preventDefault();
            register();
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()