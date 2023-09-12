import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

//Usamos esta funcion para obtener todos los usuarios
export async function getUsers(){
    try {
        const response = await axios.get(`https://whatsapp-dz29.onrender.com/usuarios/`);
        return response.data;
    }catch (error) {
        console.error('Error getting users:', error);
        alert('Hubo un error al obtener los usuarios. Por favor, inténtalo de nuevo.');
    }
}