const apiUrl = 'http://mascotas.mysql.database.azure.com/WebIIIVeterinara/Controlador/citasController.php'; 

const loadAppointments = () => {
    axios.get(`${apiUrl}?accion=listar`)  
        .then(response => {
            const appointments = response.data; 
            const tableBody = document.querySelector('#appointmentsTable tbody');
            tableBody.innerHTML = ''; 

            appointments.forEach(appointment => {
                tableBody.innerHTML += `
                    <tr>
                        <td style="text-align: center;">${appointment.id}</td>
                        <td style="text-align: center;">${appointment.mascota}</td>
                        <td style="text-align: center;">${appointment.fecha}</td>
                        <td style="text-align: center;">${appointment.hora}</td>
                        <td style="text-align: center;">${appointment.descripcion}</td>
                        <td style="text-align: center;">
                            <button class="update-btn" onclick="openUpdateModal(${appointment.id})">Editar</button>
                            <button class="delete-btn" onclick="deleteAppointment(${appointment.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error al cargar las citas:', error);
        });
};

window.onload = loadAppointments;

const loadPets = () => {
    axios.get('URL_DE_TU_API/mascotas.php?accion=listar')  
        .then(response => {
            const pets = response.data;
            const petSelect = document.getElementById('petSelect');
            
            pets.forEach(pet => {
                const option = document.createElement('option');
                option.value = pet.id;
                option.textContent = pet.nombre;
                petSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar las mascotas:', error);
        });
};

const openUpdateModal = (appointmentId) => {
    axios.get(`${apiUrl}?accion=buscar&id=${appointmentId}`)
        .then(response => {
            const appointment = response.data;

            document.getElementById('appointmentId').value = appointment.id;
            document.getElementById('appointmentDate').value = appointment.fecha;
            document.getElementById('appointmentTime').value = appointment.hora;
            document.getElementById('appointmentDescription').value = appointment.descripcion;

            document.getElementById('updateModal').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al obtener la cita:', error);
        });
};

const closeUpdateModal = () => {
    document.getElementById('updateModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
};

const updateAppointment = () => {
    const id = document.getElementById('appointmentId').value;
    const fecha = document.getElementById('appointmentDate').value;
    const hora = document.getElementById('appointmentTime').value;
    const descripcion = document.getElementById('appointmentDescription').value;

    const updatedData = { id, fecha, hora, descripcion };

    axios.put(`${apiUrl}?accion=actualizar`, updatedData)
        .then(response => {
            loadAppointments();
            closeUpdateModal();
        })
        .catch(error => {
            console.error('Error al actualizar la cita:', error);
            alert('Hubo un error al actualizar la cita');
        });
};

const deleteAppointment = (appointmentId) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        axios.get(`${apiUrl}?accion=eliminar&id=${appointmentId}`)
            .then(response => {
                loadAppointments();
            })
            .catch(error => {
                console.error('Error al eliminar la cita:', error);
                alert('Hubo un error al eliminar la cita');
            });
    }
};

const filterTable = () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#appointmentsTable tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(searchValue) ? '' : 'none';
    });
};

document.getElementById('searchInput').addEventListener('input', filterTable);
window.onload = loadAppointments;
document.getElementById('saveChangesBtn').onclick = updateAppointment;
document.getElementById('cancelBtn').onclick = closeUpdateModal;
