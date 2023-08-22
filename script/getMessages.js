import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

export async function getMessages(){
    try {
        const response = await axios.get(`http://localhost:3000/mensajes/`);
        console.log("response get", response.data)
    } catch (error) {
        console.error('Error getting mensaje:', error);
        alert('Hubo un error al obtener el usuario. Por favor, inténtalo de nuevo.');
    }
}
