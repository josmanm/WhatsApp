import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

export async function deleteMessage(id,conversacion){
    try {
        const response = await axios.patch(`http://localhost:3000/mensajes/${id}`, {conversaciones : conversacion});
        console.log("response delete", response.data)
    }catch (error) {
        console.error('Error deleting mensaje:', error);
        alert('Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
}