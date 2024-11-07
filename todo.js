// URL to fetch initial tasks
const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

// Elements
const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");

// Fetch initial tasks
async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    todos.forEach(addTaskToDOM);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Add task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.className = task.completed ? "completed" : "";

  li.innerHTML = `
    <span>${task.title}</span>
    <div>
      <button onclick="toggleComplete(${task.id})">☑</button>
      <button onclick="deleteTask(${task.id})">☒</button>
    </div>
  `;

  todoList.appendChild(li);
}

// Add new task
function addTask() {
  const taskTitle = newTaskInput.value.trim();
  if (taskTitle === "") return;

  const task = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };

  addTaskToDOM(task);
  newTaskInput.value = "";
}

// Toggle task completion
function toggleComplete(id) {
  const taskItem = document.querySelector(`li[data-id="${id}"]`);
  if (taskItem) {
    taskItem.classList.toggle("completed");
  }
}

// Delete task
function deleteTask(id) {
  const taskItem = document.querySelector(`li[data-id="${id}"]`);
  if (taskItem) {
    todoList.removeChild(taskItem);
  }
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize app by fetching tasks
fetchTodos();
