import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

export async function createMessage(message){
    try{
        const response = await axios.post(`https://whatsapp-dz29.onrender.com/mensajes`, message);
        console.log("response create", response.data)
    }catch(error){
        console.error('Error creating mensaje:', error);
        alert('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
}