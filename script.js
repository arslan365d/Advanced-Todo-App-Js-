let todos = JSON.parse(localStorage.getItem("todos")) || [];
let todos_Container = document.querySelector(".todos")
let addTodo = document.querySelector("#addTodo");
let todoInput = document.querySelector("#todoInput")
let templateOfTodo = document.querySelector("#tempOfTodo");
let actualTodo = templateOfTodo.content.cloneNode(true);
let modal = document.querySelector(".modal")
let modalText = document.querySelector("#modalText")
let editModal = document.querySelector(".editModalDiv")
let editTodoInput = document.querySelector("#editTodo")
let editModalBtn = document.querySelector("#editModalBtn")
let editTodoIDPlace = document.querySelector(".editTodoIDPlace")

// Loading todo that stored in local storage
document.addEventListener("DOMContentLoaded", () => {
  todos.forEach(element => {
    // Putting data in html using template tag
    let actualTodo = templateOfTodo.content.cloneNode(true);
    actualTodo.querySelector("#content").textContent = element.content;
    // console.log(actualTodo.querySelector("#content").textContent );
    actualTodo.querySelector("#date").textContent = element.createdAt;
    actualTodo.querySelector(".todo").setAttribute("data-id", element.id)
    actualTodo.querySelector(".delete").addEventListener("click", () => {
      deleteTodo(element.id);
    })
    actualTodo.querySelector(".edit").addEventListener("click", () => {
      editTodo(element.id);
    })
    todos_Container.appendChild(actualTodo)

  });

})

// Todo add functionality
addTodo.addEventListener("click", () => {
  let inputValue = todoInput.value;

  // start of Generating uinque id using date object
  let minute = new Date().getMinutes();
  let sec = new Date().getSeconds();
  let id = minute * sec
  // end of Generating unique id

  if (inputValue !== "") {
    let todo = {};
    let date = new Date().toLocaleString();
    todo.id = id
    todo.content = inputValue;
    todo.createdAt = date;

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))

    // Putting data in html using template tag
    let actualTodo = templateOfTodo.content.cloneNode(true);
    actualTodo.querySelector("#content").textContent = todo.content;
    actualTodo.querySelector("#date").textContent = todo.createdAt;
    actualTodo.querySelector(".todo").setAttribute("data-id", id)
    actualTodo.querySelector(".delete").addEventListener("click", () => {
      deleteTodo(id);
      console.log("Ffff");

    })
    actualTodo.querySelector(".edit").addEventListener("click", () => {
      editTodo(id);
    })
    todos_Container.appendChild(actualTodo)

    // Adding popup of add
    modalText.innerText = "Todo Added"
    modal.classList.add("show")
    setTimeout(() => {
      modal.classList.remove("show")
    }, 1000)
    todoInput.value = ""
  }
})

// Todo Delete Functionality
function deleteTodo(id) {
  let todo = document.querySelector(`[data-id="${id}"`);
  let todos = JSON.parse(localStorage.getItem("todos"));
  let ExistingTodo = todos.filter((elem) => elem.id !== id);

  localStorage.setItem("todos", JSON.stringify(ExistingTodo))
  // Adding popup of delete
  todos_Container.removeChild(todo)
  modalText.innerText = "Todo Removed"
  modal.classList.add("show")
  setTimeout(() => {
    modal.classList.remove("show")
  }, 1000)
}

// Todo edit button
function editTodo(id) {
  editModal.classList.add("showEditModal")
  let editElem = todos.find((elem) => elem.id === id);
  editTodoInput.value = editElem.content
  editTodoIDPlace.innerHTML = `${editElem.id}`
  editTodoInput.focus()
}

// Modal edit button(second edit button)
editModalBtn.addEventListener("click", () => {
  let id = Number(editTodoIDPlace.innerHTML);
  editModal.classList.remove("showEditModal")
  let todo = document.querySelector(`[data-id="${id}"`);
  let updatedValue = editTodoInput.value;

  let editElem = todos.find((elem) => elem.id === Number(id));
  editElem.content = updatedValue;

  todo.querySelector("#content").innerText = updatedValue
  localStorage.setItem("todos", JSON.stringify(todos))
  todo.querySelector("#content").innerText = updatedValue
  // Adding opoup of edit 
  modalText.innerText = "Todo Edited"
  modal.classList.add("show")
  setTimeout(() => {
    modal.classList.remove("show")
  }, 1000)
})
