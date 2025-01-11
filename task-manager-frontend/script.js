// filepath: script.js
const baseUrl = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const taskForm = document.getElementById('taskForm');
    const logoutButton = document.getElementById('logoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert(data.error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;

            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful');
                window.location.href = 'index.html';
            } else {
                alert(data.error);
            }
        });
    }

    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;
            const priority = document.getElementById('taskPriority').value;
            const dueDate = document.getElementById('taskDueDate').value;
            const category = document.getElementById('taskCategory').value;
            const status = document.getElementById('taskStatus').value;
            const token = localStorage.getItem('token');

            const response = await fetch(`${baseUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, priority, dueDate, category, status })
            });

            const data = await response.json();
            if (response.ok) {
                loadTasks();
            } else {
                alert(data.error);
            }
        });

        loadTasks();
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }
});

async function loadTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseUrl}/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong> - ${task.description} <br>
                Priority: ${task.priority} | Due: ${task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A'} | Category: ${task.category} | Status: ${task.status}
            </div>
            <div class="task-actions">
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

async function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        loadTasks();
    } else {
        const data = await response.json();
        alert(data.error);
    }
}