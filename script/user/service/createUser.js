import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

//Usamos esta funcion para crear un usuario
export async function createUser(user){
    try{
        const response = await axios.post(`https://whatsapp-dz29.onrender.com/usuarios`, user);
        console.log("response create", response.data)
    }catch(error){
        console.error('Error creating user:', error);
        alert('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
}