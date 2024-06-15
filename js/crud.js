document.addEventListener('DOMContentLoaded', function() {
    const evForm = document.getElementById('evForm');
    const evTableBody = document.querySelector('#evTable tbody');
    const viewButton = document.getElementById('viewButton');
    let evData = JSON.parse(localStorage.getItem('evData')) || [];
    let editIndex = -1;

    evForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const ev = {
            model: document.getElementById('model').value,
            battery_capacity: document.getElementById('battery_capacity').value,
            range: document.getElementById('range').value,
            charging_time: document.getElementById('charging_time').value,
            power: document.getElementById('power').value,
            top_speed: document.getElementById('top_speed').value
        };

        if (editIndex === -1) {
            evData.push(ev);
        } else {
            evData[editIndex] = ev;
            editIndex = -1;
        }

        localStorage.setItem('evData', JSON.stringify(evData));
        evForm.reset();
        renderTable();
    });

    viewButton.addEventListener('click', renderTable);

    function renderTable() {
        evTableBody.innerHTML = '';
        evData.forEach((ev, index) => {
            const row = document.createElement('tr');
            for (const key in ev) {
                const cell = document.createElement('td');
                cell.textContent = ev[key];
                row.appendChild(cell);
            }
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => editEV(index));
            actionsCell.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => deleteEV(index));
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);
            evTableBody.appendChild(row);
        });
    }

    function editEV(index) {
        const ev = evData[index];
        document.getElementById('model').value = ev.model;
        document.getElementById('battery_capacity').value = ev.battery_capacity;
        document.getElementById('range').value = ev.range;
        document.getElementById('charging_time').value = ev.charging_time;
        document.getElementById('power').value = ev.power;
        document.getElementById('top_speed').value = ev.top_speed;
        editIndex = index;
    }

    function deleteEV(index) {
        evData.splice(index, 1);
        localStorage.setItem('evData', JSON.stringify(evData));
        renderTable();
    }

    renderTable(); // Initial render to display any saved data
});
