const getButton = document.getElementById('get');
const taskArea = document.getElementById('Tasks');
const from = document.getElementById('addTask');
let taskTitleFromForm = document.getElementById('title');
const url = 'http://localhost'

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
    fetch(url + `/task/${taskid}`,{method: 'DELETE'});
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

function update() {
    getTasks();
}


getButton.addEventListener('click', getTasks);
getTasks();
