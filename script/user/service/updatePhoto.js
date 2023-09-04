import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
//Actualizar la foto de un usuario
export async function updatePhotoUser(user,url){
    try {
        const response = await axios.patch(`http://localhost:3000/usuarios/${user.id}`,{ urlImgPerfil: url});
        console.log("response update", response.data)
    }catch (error) {
        console.error('Error updating user photo:', error);
        alert('Hubo un error al actualizar la foto del usuario. Por favor, inténtalo de nuevo.');
    }
}