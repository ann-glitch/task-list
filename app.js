//define ui variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearTasks = document.querySelector(".clear-tasks");

//load all event listeners
loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTask);
}

//add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-trash"></i>';
  li.appendChild(link);
  console.log(li);

  taskList.appendChild(li);

  taskInput.value = "";

  e.preventDefault();
}
