//define ui variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const deleteTasks = document.querySelector(".clear-tasks");

//load all event listeners
loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTask);

  taskList.addEventListener("click", removeTasks);

  deleteTasks.addEventListener("click", clearTasks);
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
  link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  li.appendChild(link);
  console.log(li);

  taskList.appendChild(li);

  taskInput.value = "";

  e.preventDefault();
}

//remove tasks
function removeTasks(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete it?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

//clear tasks
function clearTasks(e) {
  //   taskList.innerHTML = "";

  //most used.
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
