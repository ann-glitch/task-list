//define ui variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const deleteTasks = document.querySelector(".clear-tasks");

//load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load content
  document.addEventListener("DOMContentLoaded", getTasks);

  form.addEventListener("submit", addTask);

  taskList.addEventListener("click", removeTasks);

  deleteTasks.addEventListener("click", clearTasks);

  filter.addEventListener("keyup", filterTasks);
}

//get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  //show error if input is empty
  if (taskInput.value === "") {
    showError("Please add a task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  //store tasks
  storedTaskInLocalStorage(taskInput.value);

  //clear inputs
  taskInput.value = "";

  e.preventDefault();
}

//show error
function showError(error) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  const container = document.querySelector(".container");
  const divRow = document.querySelector("row");

  container.insertBefore(errorDiv, divRow);

  //clear error after 3 seconds
  setTimeout(clearError, 2000);

  li.style.display = "none";
}

//clear error
function clearError() {
  document.querySelector(".alert").remove();
}

//store tasks in local storage
function storedTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove tasks from list items
function removeTasks(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete it?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove tasks from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

//clear all tasks
function clearTasks(e) {
  //   taskList.innerHTML = "";

  //most used.
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear tasks from local storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const searchInput = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(searchInput) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
