document.addEventListener('DOMContentLoaded', () => {
    cargarMascotas();
});

const form = document.getElementById('petEventForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const fecha = document.getElementById('eventDate').value;
    const hora = document.getElementById('eventTime').value;
    const descripcion = document.getElementById('description').value;
    const mascotaId = document.getElementById('petSelect').value;

    const eventData = {
        id_mascota: parseInt(mascotaId),
        fecha: fecha,
        hora: hora,
        descripcion : descripcion,
    };

    axios.post('https://mascotasapi.azurewebsites.net/WebIIIVeterinara/Controlador/citasController.php?accion=insertar', eventData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(eventData)
        form.reset(); 
    })
    .catch(error => {
        console.error('Error al guardar la mascota:', error);
        alert('Hubo un error al guardar la mascota');
    });
});

function cargarMascotas() {
    axios.get('https://mascotasapi.azurewebsites.net/WebIIIVeterinara/Controlador/mascotasController.php?accion=listar')
    .then(response => {
        const usuarios = response.data; 
        const ownerSelect = document.getElementById('petSelect');

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
    window.location.href = 'listaCitas.html'; 
}
