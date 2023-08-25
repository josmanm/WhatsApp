import { createMessage } from '../script/createMessage.js';
import { createUser } from '../script/createUser.js';
import { deleteMessage } from '../script/deleteMessage.js';
import { deleteUser } from '../script/deleteUser.js';
import { updateMessage } from '../script/updateMessage.js';
import { updateUser } from '../script/updateUser.js';
import { getLogin } from './getLogin.js';
import { getUsers } from './getUsers.js';

let botonIngresar = document.getElementById('botonIngresar');
let data;

const login = async (e) => {
    const numCelular = document.getElementById('inputNumCelular').value;
    const contrasenia = document.getElementById('contrasenia').value;
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let userData = {
        numCelular: numCelular,
        contrasenia: contrasenia
    }
    userData = await getLogin(userData);
    console.log(userData);
    if(Object.keys(userData).length === 0){
        console.log("no entro");
    }else{
        console.log(" entro");
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          else{
            event.preventDefault();
            login();
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

