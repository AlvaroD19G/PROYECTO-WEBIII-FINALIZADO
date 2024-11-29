document.addEventListener('DOMContentLoaded', () => {
    cargarusuarios();
});

const form = document.getElementById('petForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('name').value;
    const raza = document.getElementById('raza').value;
    const edad = document.getElementById('age').value;
    const usuarioId = document.getElementById('owner').value;

    const petData = {
        nombre: nombre,
        raza: raza,
        edad: parseInt(edad),
        id_usuario: parseInt(usuarioId),
    };

    axios.post('http://gestionveterinariaapi.azurewebsites.net/PROYECTO WEBIII FINALIZADO/WebIIIVeterinara/Controlador/mascotasController.php?accion=insertar', petData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(petData)
        form.reset(); 
    })
    .catch(error => {
        console.error('Error al guardar la mascota:', error);
        alert('Hubo un error al guardar la mascota');
    });
});

function cargarusuarios() {
    axios.get('http://gestionveterinariaapi.azurewebsites.net/PROYECTO WEBIII FINALIZADO/WebIIIVeterinara/Controlador/usuariosController.php?accion=listar')
    .then(response => {
        console.log(response.data);
        const usuarios = response.data; 
        const ownerSelect = document.getElementById('owner');

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id; 
            option.textContent = usuario.nombre; 
            ownerSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar la lista de usuarios:', error);
        alert('No se pudo cargar la lista de usuarios');
    });
}

function redirectToList() {
    window.location.href = 'listaMascotas.html'; 
}
