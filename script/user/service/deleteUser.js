import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

//Usamos esta funcion para eliminar un usuario
export async function deleteUser(id){
    try {
        const response = await axios.delete(`http://localhost:3000/usuarios/${id}`);
        console.log("response delete", response.data)
    }catch (error) {
        console.error('Error deleting user:', error);
        alert('Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
}
