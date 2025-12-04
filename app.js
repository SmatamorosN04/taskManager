const taskForm = document.getElementById("task-form");

const tasklist = document.getElementById("task-list");
loadTasks();
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskInput = document.getElementById("task-input");

    const task = taskInput.value;
    console.log(task);

    if(task){
        tasklist.append(createTaskElement(task));
         storeTaskLocalStorage(task) 
        taskInput.value = "";
    }
});

function createTaskElement(task){
    const li = document.createElement("li");
    li.textContent = task;
    li.append(createButton("❌", "delete-btn"),createButton("✏️", "edit-btn"));
    return li;
}
function createButton(text, className) {
    const btn = document.createElement("span");
    btn.textContent = text;
    btn.className = className;
    return btn;
}

tasklist.addEventListener("click", (event) =>{
    console.log(event.target);

    if(event.target.classList.contains("delete-btn"))
    {
        deleteTask(event.target.parentElement);
    } else if(event.target.classList.contains("edit-btn")){
        editTask(event.target.parentElement)
    }
});

function deleteTask(taskItem){
    if(confirm("Estas seguro?")){
        taskItem.remove();
        removeFromLocalStorage();
    }
}
function editTask(taskItem){
    const newTask = prompt("Aver que quieres editar:", taskItem.firstChild.textContent);
    if(newTask!== null){
        taskItem.firstChild.textContent = newTask;
        updateLocalStorafe();
    }
}

function storeTaskLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => {
        tasklist.appendChild(createTaskElement(task))
    });
}

function updateLocalStorafe(){
   const tasks = Array.from(tasklist.querySelectorAll("li")).map( (li) => li.firstChild.textContent);
   localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeFromLocalStorage(taskContent){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updateTasks = tasks.filter((task) => task != taskContent);

    localStorage.setItem("tasks", JSON.stringify(updateTasks));
}