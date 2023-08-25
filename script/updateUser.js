import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
//Usamos esta funcion para actualizar un usuario
export async function updateUser(user){
    try {
        const response = await axios.put(`http://localhost:3000/usuarios/${user.id}`,{ user });
        console.log("response update", response.data)
    }catch (error) {
        console.error('Error updating user:', error);
        alert('Hubo un error al actualizar el usuario. Por favor, inténtalo de nuevo.');
    }
}