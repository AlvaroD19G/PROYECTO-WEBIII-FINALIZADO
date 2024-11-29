const apiUrl = 'http://gestionveterinariaapi.azurewebsites.net/PROYECTO WEBIII FINALIZADO/WebIIIVeterinara/Controlador/usuariosController.php';


const loadOwners = () => {
    axios.get(`${apiUrl}?accion=listar`)
        .then(response => {
            console.log(response.data);
            renderTable(response.data);
        })
        .catch(error => {
            console.error('Error al cargar la lista de usuarios:', error);
            alert('Ocurrió un error al cargar la lista de usuarios.');
        });
};


const renderTable = (owners) => {
    const tableBody = document.querySelector('#ownersTable tbody');
    tableBody.innerHTML = '';
    owners.forEach(owner => {
        tableBody.innerHTML += `
            <tr>
                <td style="text-align: center;">${owner.id}</td>
                <td style="text-align: center;">${owner.nombre}</td>
                <td style="text-align: center;">${owner.telefono}</td>
                <td style="text-align: center;">${owner.direccion}</td>
                <td style="text-align: center;">
                    <button class="update-btn" onclick="openUpdateModal(${owner.id}, '${owner.nombre}', '${owner.telefono}', '${owner.direccion}')">Actualizar</button>
                    <button class="delete-btn" onclick="deleteOwner(${owner.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
};


const deleteOwner = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        console.log('id:', id);
        axios.delete(`${apiUrl}?accion=eliminar&id=${id}`)
            .then(response => {
                const { status, message } = response.data;

                if (status === 'success') {
                    alert(message);
                    loadOwners();
                } else if (status === 'error') {
                    alert(message);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
                alert('Ocurrió un error al intentar eliminar el usuario.');
            });
    }
};


const openUpdateModal = (id, name, phone, address) => {
    document.getElementById('ownerId').value = id;
    document.getElementById('ownerName').value = name;
    document.getElementById('ownerPhone').value = phone;
    document.getElementById('ownerAddress').value = address;

    document.getElementById('overlay').classList.add('active');
    document.getElementById('updateModal').classList.add('active');
};


const closeModal = () => {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('updateModal').classList.remove('active');
};


const saveChanges = () => {
    const id = document.getElementById('ownerId').value;
    const nombre = document.getElementById('ownerName').value;
    const telefono = document.getElementById('ownerPhone').value;
    const direccion = document.getElementById('ownerAddress').value;

    axios.put(`${apiUrl}?accion=actualizar`, { id, nombre, telefono, direccion })
        .then(() => {
            closeModal();
            loadOwners();
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            alert('Ocurrió un error al intentar actualizar el usuario.');
        });
};


const filterTable = () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#ownersTable tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(searchValue) ? '' : 'none';
    });
};


document.getElementById('cancelBtn').addEventListener('click', closeModal);
document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);
document.getElementById('searchInput').addEventListener('input', filterTable);


loadOwners();
