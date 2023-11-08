const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const newTaskInput = document.getElementById('newTask');
const saveTaskButton = document.getElementById('saveTask');

const editTaskModal = document.getElementById('editTaskModal'); 
const closeEditModal = document.getElementById('closeEditModal'); 
const editTaskNameInput = document.getElementById('editTaskName'); 
const saveEditedTaskButton = document.getElementById('saveEditedTask'); 

let tasks = [];
let editingTaskIndex; // Store the index of the task being edited

addTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
    newTaskInput.value = '';
});

saveTaskButton.addEventListener('click', () => {
    const newTaskName = newTaskInput.value;
    if (newTaskName) {
        tasks.push({ name: newTaskName, status: 'todo' });
        updateTaskList();
        newTaskInput.value = '';
        taskModal.style.display = 'none';
    }
});

// Function to open the edit modal for a specific task
function openEditModal(index) {
    editingTaskIndex = index;
    editTaskNameInput.value = tasks[index].name;
    editTaskModal.style.display = 'block';
}

closeEditModal.addEventListener('click', () => {
    editTaskModal.style.display = 'none';
    editTaskNameInput.value = '';
});

saveEditedTaskButton.addEventListener('click', () => {
    const newName = editTaskNameInput.value;
    if (newName) {
        tasks[editingTaskIndex].name = newName;
        updateTaskList();
        editTaskModal.style.display = 'none';
        editTaskNameInput.value = '';
    }
});

function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = taskList.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>
                <select class="status" data-index="${index}">
                    <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="inprogress" ${task.status === 'inprogress' ? 'selected' : ''}>In Progress</option>
                    <option value="complete" ${task.status === 'complete' ? 'selected' : ''}>Complete</option>
                </select>
            </td>
            <td><button class="edit" data-index="${index}">Edit</button></td>
            <td><button class="remove" data-index="${index}">Remove</button></td>
        `;
    });

    const statusSelects = document.querySelectorAll('.status');
    const editButtons = document.querySelectorAll('.edit');
    const removeButtons = document.querySelectorAll('.remove');

    statusSelects.forEach(select => {
        select.addEventListener('change', () => {
            const index = select.getAttribute('data-index');
            tasks[index].status = select.value;
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            openEditModal(index);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            tasks.splice(index, 1);
            updateTaskList();
        });
    });
}

updateTaskList();
