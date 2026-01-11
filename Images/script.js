let taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskDate = document.getElementById("taskDate");
  let taskTime = document.getElementById("taskTime");

  if (taskInput.value === "") {
    alert("Please enter a task!");
    return;
  }

  let task = {
    text: taskInput.value,
    date: taskDate.value,
    time: taskTime.value,
    completed: false
  };

  saveTask(task);
  displayTask(task);

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

function displayTask(task) {
  let li = document.createElement("li");

  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <div class="task-info">
      <strong>${task.text}</strong>
      <small>${task.date || ""} ${task.time || ""}</small>
    </div>
    <div class="actions">
      <button class="complete-btn">✔</button>
      <button class="edit-btn">✎</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  li.querySelector(".complete-btn").onclick = () => {
    li.classList.toggle("completed");
    task.completed = !task.completed;
    updateStorage();
  };

  li.querySelector(".edit-btn").onclick = () => {
    let newTask = prompt("Edit your task:", task.text);
    if (newTask) {
      task.text = newTask;
      li.querySelector("strong").innerText = newTask;
      updateStorage();
    }
  };

  li.querySelector(".delete-btn").onclick = () => {
    li.remove();
    removeTask(task);
  };

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(displayTask);
}

function updateStorage() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("strong").innerText,
      date: li.querySelector("small").innerText.split(" ")[0],
      time: li.querySelector("small").innerText.split(" ")[1],
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskToRemove.text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
