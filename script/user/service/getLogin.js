import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

export async function getLogin(user){
    try {
        const response = await axios.get(`https://whatsapp-dz29.onrender.com/usuarios?numCelular=${user.numCelular}&contrasenia=${user.contrasenia}`);
        return response.data;
    }catch (error) {
        console.error('Error getting user:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }   
}