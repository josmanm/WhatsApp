import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

export async function updateMessage(id1,id2 ,id,mensaje){
    try {
        const response = await axios.put(`http://localhost:3000/mensajes/${id}`,{idUser1:id1,idUser2:id2, conversaciones:mensaje });
        console.log("response update", response.data)
    }catch (error) {
        console.error('Error updating mensaje:', error);
        alert('Hubo un error al actualizar el usuario. Por favor, inténtalo de nuevo.');
    }
}