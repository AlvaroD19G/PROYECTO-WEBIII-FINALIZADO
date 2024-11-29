const form = document.getElementById('userForm');

form.addEventListener('submit', function(event) {
    const nombre = document.getElementById('name').value;
    const telefono = document.getElementById('phone').value;
    const direccion = document.getElementById('address').value;

    const formData = {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion
    };

    axios.post('http://gestionveterinariaapi.azurewebsites.net/WebIIIVeterinara/Controlador/usuariosController.php?accion=insertar', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
});

function redirectToList() {
    window.location.href = 'listaUsuarios.html'; 
}
