const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const taskBox = document.querySelector(".task-box");
const submitBtn = document.querySelector(".clear-btn");

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));


filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

function showTodo(filter) {
  let li = "";

  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task">
        <label for="${id}">
          <input onClick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
          <p class=${isCompleted}>${todo.name}</p>
        </label>
        <div class="setting">
          <i onClick="showMenu(this)" class="">...</i>
          <ul class="task-menu">
            <li onClick="editTask(${id}, '${todo.name}')"><i class="">수정</i></li>
            <li onClick="deleteTask(${id})"><i class="">삭제</i></li>
          </ul>
        </div>
      </li>`;
      }
    });
  }
  taskBox.innerHTML = li;
}
showTodo("all");

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));

}

function submit(){
    document.addEventListener("click", (e) => {
      
        let userTask = taskInput.value.trim();
        
      
        if (userTask) {
          if (!isEditedTask) {
            if (!todos) {
              todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
          } else {
            isEditedTask = false;
            todos[editId].name = userTask;
          }
      
          taskInput.value = "";
      
          localStorage.setItem("todo-list", JSON.stringify(todos));
          showTodo("all");
        }
      });

}


