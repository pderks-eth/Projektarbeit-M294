const getButton = document.getElementById('get');
const taskArea = document.getElementById('Tasks');
const from = document.getElementById('addTask');
const login = document.getElementById('login');
const showTask = document.getElementById('showTask');
const showLogin = document.getElementById('showLogin');
let taskTitleFromForm = document.getElementById('title');
let token = null;
const url = 'http://localhost'
const auth_url = 'http://localhost/auth/jwt'
let logedin = false;

async function getTasks() {
    // clear list
    taskArea.innerHTML = '';

    // get tasks
    let response = await fetch(url + '/tasks');
    let tasks = await response.json();
    console.log(tasks)

    // Display tasks
    tasks.forEach((task) => {

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task')

        const taskTitle = document.createElement('h3');
        taskTitle.innerHTML = task.title;
        taskDiv.appendChild(taskTitle);

        // add Buttons
        const editButton = document.createElement('button');
        editButton.innerHTML = "Edit";
        editButton.setAttribute('onclick', `editTask(${task.id}, '${task.title}')`)
        taskDiv.appendChild(editButton);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute('onclick', `deleteTask(${task.id})`);
        taskDiv.appendChild(deleteButton);

        if (task.completed) {
            taskDiv.classList.add('done');
        } else {
            taskDiv.classList.add('notDone');
        }

        taskArea.appendChild(taskDiv);
    });
}

async function deleteTask(taskid) {
    await fetch(url + `/task/${taskid}`, {method: 'DELETE'});
    update();
}

async function editTask(taskid, tasktitle) {
    let newtitle = prompt("Titel ändern:", tasktitle);
    await fetch(url + '/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: taskid,
            title: newtitle
        })
    });
    update();
}

from.addEventListener('submit', async (e) => {
    e.preventDefault();

    fetch(url + '/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed : false,
            title : taskTitleFromForm.value
        })
    });

    update();
});

// login.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     let response = await fetch(auth_url + '/sign', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     let result = response.json();
//     token = result.headers.get('Authorization');

//     logedin = true;

//     showLogin.style.display = 'none';
//     showTask.style.display = 'block'
// });

function update() {
    getTasks();
}


getButton.addEventListener('click', getTasks);
getTasks();
