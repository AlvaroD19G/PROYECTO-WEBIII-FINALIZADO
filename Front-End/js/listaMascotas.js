const apiUrl = 'http://mascotasapi.azurewebsites.net/WebIIIVeterinara/Controlador/mascotasController.php';

const loadPets = () => {
    axios.get(`${apiUrl}?accion=listar`)
        .then(response => {
            renderTable(response.data);
        })
        .catch(error => console.error('Error al cargar la lista de mascotas:', error));
};

const renderTable = (pets) => {
    const tableBody = document.querySelector('#petsTable tbody');
    tableBody.innerHTML = ''; 
    pets.forEach(pet => {
        tableBody.innerHTML += `
            <tr>
                <td style="text-align: center;">${pet.id}</td>
                <td style="text-align: center;">${pet.nombre}</td>
                <td style="text-align: center;">${pet.raza}</td>
                <td style="text-align: center;">${pet.edad}</td>
                <td style="text-align: center;">${pet.usuario}</td>
                <td style="text-align: center;">
                    <button class="update-btn" onclick="openUpdateModal(${pet.id}, '${pet.nombre}', '${pet.raza}', ${pet.edad}, '${pet.usuario}')">Actualizar</button>
                    <button class="delete-btn" onclick="deletePet(${pet.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
};

const deletePet = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
        axios.delete(`${apiUrl}?accion=eliminar&id=${id}`)
            .then(() => loadPets())
            .catch(error => console.error('Error al eliminar la mascota:', error));
    }
};

const openUpdateModal = (id, name, breed, age, ownerId) => {
    document.getElementById('petId').value = id;
    document.getElementById('petName').value = name;
    document.getElementById('petBreed').value = breed;
    document.getElementById('petAge').value = age;
    document.getElementById('petOwnerId').value = ownerId;

    document.getElementById('overlay').classList.add('active');
    document.getElementById('updateModal').classList.add('active');
};

const closeModal = () => {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('updateModal').classList.remove('active');
};

const saveChanges = () => {
    const id = parseInt(document.getElementById('petId').value); 
    const nombre = document.getElementById('petName').value;
    const raza = document.getElementById('petBreed').value;
    const edad = parseInt(document.getElementById('petAge').value);  

    console.log('Datos a enviar:', { id, nombre, raza, edad });

    axios.put(`${apiUrl}?accion=actualizar`, { id, nombre, raza, edad })
        .then(() => {
            closeModal();
            loadPets();
        })
        .catch(error => console.error('Error al actualizar la mascota:', error));
};


const filterTable = () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#petsTable tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(searchValue) ? '' : 'none';
    });
};

document.getElementById('cancelBtn').addEventListener('click', closeModal);
document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);
document.getElementById('searchInput').addEventListener('input', filterTable);

loadPets();
