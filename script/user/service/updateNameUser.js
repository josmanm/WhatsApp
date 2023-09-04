import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
//Actualizar la foto de un usuario
export async function updateNameUser(user,name){
    try {
        const response = await axios.patch(`http://localhost:3000/usuarios/${user.id}`,{ nombre: name});
        console.log("response update", response.data)
    }catch (error) {
        console.error('Error updating user name:', error);
        alert('Hubo un error al actualizar el nombre del usuario. Por favor, inténtalo de nuevo.');
    }
}