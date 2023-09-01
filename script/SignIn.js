import { getUsers } from './user/service/getUsers.js';
import { updateUser } from './user/service/updateUser.js';
import { DateTime } from 'https://moment.github.io/luxon/es6/luxon.js';

let botonIngresar = document.getElementById('botonIngresar');
let data;

const LOGIN = async (e) => {
  const numCelular = document.getElementById('inputNumCelular').value;
  const contrasenia = document.getElementById('contrasenia').value;
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let userData = {
    numCelular: numCelular,
    contrasenia: contrasenia
  }
  let listUsers = await getUsers();
  let contraseniaCorrecta = false;
  let numCelularCorrecto = false;

 let user = listUsers.find(user => user.numCelular == userData.numCelular || user.contrasenia == userData.contrasenia);
  if (user) {
    if (user.contrasenia == userData.contrasenia) {
      contraseniaCorrecta = true;
    }if(user.numCelular == userData.numCelular){
      numCelularCorrecto = true;
    }
    if (contraseniaCorrecta && numCelularCorrecto) {
      let hora = DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
      let data  = await updateUser(user,hora);
      window.open(`/index.html?id=${user.id}`,'_self');
    }else if (contraseniaCorrecta && !numCelularCorrecto) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Número de celular incorrecto!',
        confirmButtonColor: '#00a884',
        width: '20rem',
      })}else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña incorrecta!',
          confirmButtonColor: '#00a884',
          width: '20rem',
        })
      }
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario y contraseña incorrectos!',
      confirmButtonColor: '#00a884',
      width: '20rem',
    })
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
          LOGIN();
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

