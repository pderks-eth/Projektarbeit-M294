const getButton = document.getElementById('get');
const url = 'http://localhost'

async function getTasks() {
    let response = await fetch(url + '/tasks');
    let tasks = await response.json();
    console.log(tasks)
}






getButton.addEventListener('click', getTasks);

