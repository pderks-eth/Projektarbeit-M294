const getButton = document.getElementById('get');
const taskArea = document.getElementById('Tasks')
const url = 'http://localhost'

async function getTasks() {
    let response = await fetch(url + '/tasks');
    let tasks = await response.json();
    console.log(tasks)
    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task')

        const taskTitle = document.createElement('h3');
        taskTitle.innerHTML = task.title;
        taskDiv.appendChild(taskTitle);

        taskArea.appendChild(taskDiv);

        if (task.completed) {
            taskDiv.classList.add('done');
        } else {
            taskDiv.classList.add('notDone');
        }

        console.log(task.completed);
    });
}






getButton.addEventListener('click', getTasks);

