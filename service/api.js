import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';


// Funciones para el CRUD de usuarios
// Se utiliza la librería axios para realizar las peticiones a la API
// Se utiliza async/await para esperar a que la petición se resuelva
// Se utiliza try/catch para capturar los errores que puedan surgir
// Se utiliza la API de JSON Server para simular una API REST

//Usamos esta funcion para crear un usuario
export async function createUser(user){
    try{
        const response = await axios.post(`http://localhost:3000/usuarios/`, user);
        console.log("response create", response.data)
    }catch(error){
        console.error('Error creating user:', error);
        alert('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
}

//Usamos esta funcion para actualizar un usuario
export async function updateUser(user){
    try {
        const response = await axios.put(`http://localhost:3000/usuarios/${user.id},{ user }`);
        console.log("response update", response.data)
    }catch (error) {
        console.error('Error updating user:', error);
        alert('Hubo un error al actualizar el usuario. Por favor, inténtalo de nuevo.');
    }
}

//Usamos esta funcion para eliminar un usuario
export async function deleteUser(id){
    try {
        const response = await axios.delete(`http://localhost:3000/usuarios/${id}`);
        console.log("response delete", response.data)
    }catch (error) {
        console.error('Error deleting user:', error);
        alert('Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
}

//Usamos esta funcion para obtener todos los usuarios
export async function getUsers(){
    try {
        const response = await axios.get(`http://localhost:3000/usuarios/`);
        console.log("response get", response.data)
        return response.data;
    }catch (error) {
        console.error('Error getting users:', error);
        alert('Hubo un error al obtener los usuarios. Por favor, inténtalo de nuevo.');
    }
}

//Usamos esta funcion para obtener un usuario atravez de su id
export async function getUser(id){
    try {
        const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
        console.log("response get", response.data)
        return response.data;
    }catch (error) {
        console.error('Error getting user:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }
}

export async function getLogin(user){
    try {
        const response = await axios.get(`http://localhost:3000/usuarios/?numCelular=${user.numCelular}&contrasenia=${user.contrasenia}`);
        console.log("response get", response.data)
        return response.data;
    }catch (error) {
        console.error('Error getting user:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }   
}

export async function createMensaje(mensaje){
    try{
        const response = await axios.post(`http://localhost:3000/mensajes/`, mensaje);
        console.log("response create", response.data)
    }catch(error){
        console.error('Error creating mensaje:', error);
        alert('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
}

export async function updateMensaje(mensaje){
    try {
        const response = await axios.put(`http://localhost:3000/mensajes/${mensaje.id},{ mensaje }`);
        console.log("response update", response.data)
    }catch (error) {
        console.error('Error updating mensaje:', error);
        alert('Hubo un error al actualizar el usuario. Por favor, inténtalo de nuevo.');
    }
}

export async function getMensajes(){
    try {
        const response = await axios.get(`http://localhost:3000/mensajes/`);
        console.log("response get", response.data)
    } catch (error) {
        console.error('Error getting mensaje:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }
}

export async function getMensajesUser(id){
    try {
        const response = await axios.get(`http://localhost:3000/mensajes/?idUsuario=${id}`);
        console.log("response get", response.data)
        return response.data;
    } catch (error) {
        console.error('Error getting mensaje:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }
}

export async function deleteMensaje(){
    try {
        const response = await axios.delete(`http://localhost:3000/mensajes/${id}`);
        console.log("response delete", response.data)
    }catch (error) {
        console.error('Error deleting mensaje:', error);
        alert('Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
}