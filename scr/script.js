// Datos de usuario y tareas
const usuarios = [
    { username: 'admin', password: 'admin' }
];

let tareas = [];

// Función para validar el inicio de sesión
function iniciarSesion(username, password) {
    return usuarios.some(user => user.username === username && user.password === password);
}

// Función para agregar una tarea
function agregarTarea(id, titulo, descripcion, fechaInicio, nombreCliente, idProyecto, comentarios) {
    const nuevaTarea = {
        id,
        titulo,
        descripcion,
        fechaInicio,
        nombreCliente,
        idProyecto,
        comentarios,
        estatus: 'Por hacer'
    };

    tareas.push(nuevaTarea);
}

// Función para limpiar el formulario
function limpiarFormulario(callback) {
    callback();
}

// Manejo de inicio de sesión
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (iniciarSesion(username, password)) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('appSection').style.display = 'block';
        document.getElementById('userName').innerText = username;
        document.getElementById('loginError').style.display = 'none'; // Ocultar mensaje de error
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

// Función para insertar una fila en la tabla
function insertRow(task) {
    const taskTableBody = document.getElementById('taskTableBody');
    const newRow = taskTableBody.insertRow();
    newRow.insertCell(0).innerText = task.id;
    newRow.insertCell(1).innerText = task.titulo;
    newRow.insertCell(2).innerText = task.descripcion;
    newRow.insertCell(3).innerText = task.fechaInicio;
    newRow.insertCell(4).innerText = task.nombreCliente;
    newRow.insertCell(5).innerText = task.idProyecto;
    newRow.insertCell(6).innerText = task.comentarios;
    newRow.insertCell(7).innerText = task.estatus;

    // Añadir evento de doble clic a la fila para seleccionar la tarea
    newRow.addEventListener('dblclick', () => selectTask(task.id));
}

function addTask() {
    try {
        const taskId = document.getElementById('taskId').value.trim();
        const taskTitle = document.getElementById('taskTitle').value.trim();
        const taskDescription = document.getElementById('taskDescription').value.trim();
        const startDate = document.getElementById('startDate').value;
        const clientName = document.getElementById('clientName').value.trim();
        const projectId = document.getElementById('projectId').value.trim();
        const comments = document.getElementById('comments').value.trim();
        const status = document.getElementById('status').value;

        // Validación de campos
        if (!taskId || !taskTitle || !taskDescription || !startDate || !clientName || !projectId) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Agregar la tarea
        agregarTarea(taskId, taskTitle, taskDescription, startDate, clientName, projectId, comments);

        // Mostrar la tarea en la tabla
        insertRow({ id: taskId, titulo: taskTitle, descripcion: taskDescription, fechaInicio: startDate, nombreCliente: clientName, idProyecto: projectId, comentarios: comments, estatus: status });

        // Limpiar campos de entrada utilizando un callback
        limpiarFormulario(() => {
            document.getElementById('taskId').value = '';
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('startDate').value = '';
            document.getElementById('clientName').value = '';
            document.getElementById('projectId').value = '';
            document.getElementById('comments').value = '';
            document.getElementById('status').value = 'Por hacer';
        });
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
    }
}

// Función para seleccionar una tarea
function selectTask(taskId) {
    try {
        const tarea = tareas.find(task => task.id === taskId);
        if (tarea) {
            document.getElementById('selectedTaskId').value = tarea.id;
            document.getElementById('selectedTaskTitle').value = tarea.titulo;
            document.getElementById('selectedTaskDescription').value = tarea.descripcion;
            document.getElementById('selectedStartDate').value = tarea.fechaInicio;
            document.getElementById('selectedClientName').value = tarea.nombreCliente;
            document.getElementById('selectedProjectId').value = tarea.idProyecto;
            document.getElementById('selectedComments').value = tarea.comentarios;
            document.getElementById('selectedStatus').value = tarea.estatus;
        }
    } catch (error) {
        console.error('Error al seleccionar la tarea:', error);
    }
}

// Función para actualizar una tarea
function updateTask() {
    try {
        const taskId = document.getElementById('selectedTaskId').value;
        const newStatus = document.getElementById('selectedStatus').value;
        const newComment = document.getElementById('newComment').value.trim();

        const tarea = tareas.find(task => task.id === taskId);
        if (tarea) {
            tarea.estatus = newStatus;
            if (newComment) {
                const currentDate = new Date().toLocaleString();
                tarea.comentarios += `\n[${currentDate}]: ${newComment}`;
                document.getElementById('newComment').value = '';
            }
            renderTasks();
        }
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
    }
}

// Función para renderizar las tareas en la tabla
function renderTasks() {
    try {
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';
        tareas.forEach(tarea => insertRow(tarea));
    } catch (error) {
        console.error('Error al renderizar las tareas:', error);
    }
}

// Función para filtrar las tareas por estatus
function filterTasks() {
    try {
        const filterStatus = document.getElementById('filterStatus').value;
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';

        const filteredTasks = filterStatus === 'Todos' ? tareas : tareas.filter(task => task.estatus === filterStatus);
        filteredTasks.forEach(tarea => insertRow(tarea));
    } catch (error) {
        console.error('Error al filtrar las tareas:', error);
    }
}