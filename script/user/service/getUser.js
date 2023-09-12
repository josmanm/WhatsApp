import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
//Usamos esta funcion para obtener un usuario atravez de su id
export async function getUser(id){
    try {
        const response = await axios.get(`https://whatsapp-dz29.onrender.com/usuarios/${id}`);
        console.log("response get", response.data)
        return response.data;
    }catch (error) {
        console.error('Error getting user:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }
}