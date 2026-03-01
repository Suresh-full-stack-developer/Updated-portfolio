const taskList = document.getElementById("taskList");
const counter = document.getElementById("taskCounter");

document.addEventListener("DOMContentLoaded", loadTasks);

// ADD TASK
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = { text: taskText, completed: false };
    createTask(task);
    saveTasks();

    input.value = "";
}

// CREATE TASK
function createTask(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    span.onclick = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        const newText = prompt("Edit task:", span.textContent);
        if (newText) {
            span.textContent = newText;
            saveTasks();
        }
    };

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.append(span, editBtn, deleteBtn);
    taskList.appendChild(li);
    updateCounter();
}

// SAVE TO LOCALSTORAGE
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCounter();
}

// LOAD TASKS
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task));
}

// CLEAR ALL TASKS
function clearAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.innerHTML = "";
        localStorage.removeItem("tasks");
        updateCounter();
    }
}

// TASK COUNTER
function updateCounter() {
    const total = document.querySelectorAll("#taskList li").length;
    const completed = document.querySelectorAll("#taskList li.completed").length;
    const pending = total - completed;

    counter.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}
