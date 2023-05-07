//henter elementer fra DOM
let todoInput = document.querySelector(".todo-input")
let todoButton = document.querySelector(".todo-button")
let todoList = document.querySelector(".todo-list")

//Legger til eventlisteners 
document.addEventListener("DOMContentLoaded", getTodos) //DOMContentLoaded = lytter når DOM er ferdig med å laste inn
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)


//Funksjoner
function addTodo(event){
    //Hindrer standar oppførsel av hendelsen skal skje
    event.preventDefault()

    //Legger til en todo div
    let todoDiv = document.createElement("div")
    //Legger til en klasse på div-en
    todoDiv.classList.add("todo")

    //Lager en <li></li>
    let newTodo = document.createElement("li")
    //Legger til en verdi i li-en
    newTodo.innerHTML = todoInput.value
    
    //Legger til en classe
    newTodo.classList.add("todo-item")

    //Legger til li-elementet inni div-en
    todoDiv.appendChild(newTodo)

    //Lagrer todoen i localStorage
    saveLocalTodos(todoInput.value)

    //Legger til completed button
    let completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //Legger til trash button
    let trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //Legger til div-en i <ul></ul> sånn at den kommer i listen
    todoList.appendChild(todoDiv)

    //Fjerner teksten i input-elementet etter man har lagt den til i listen
    todoInput.value = ""
}

function deleteCheck(e){
    //Henter ut elementet som blir klikket på og lagrer det i item
    let item = e.target 

    //Fjerner listen hvis vi trykker på trash-btn
    if(item.classList[0] === "trash-btn"){
        //Vi finner forelderen til item
        let todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        //Venter til trantionen er ferdig før funksjonen vil bli aktivert
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }

    //Setter strekk over gjøremålet hvis vi trykker på complete-btn
    if(item.classList[0] === "complete-btn"){
        let todo = item.parentElement
        todo.classList.toggle("completed")
    }
}


function saveLocalTodos(todo){
    //Sjekker om vi har noen todos i local storage fra før
    let todos;

    //henter ut en verdi fra localStorage med en spesiefik nøkkel, todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

//Hente og vise alle todo-en som er lagret i localStorage på nettsiden
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){
        let todoDiv = document.createElement("div")
    //Legger til en klasse på div-en
    todoDiv.classList.add("todo")
    //Lager en <li></li>
    let newTodo = document.createElement("li")
    //Legger til en verdi
    newTodo.innerHTML = todo
    newTodo.classList.add("todo-item")
    //Legger til li-elementet inni div-en
    todoDiv.appendChild(newTodo)
    //Legger til completed button
    let completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //Legger til trash button
    let trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //Legger til div-en i <ul></ul> sånn at den kommer i listen
    todoList.appendChild(todoDiv)
    })
}

//har i oppgave å fjerne en todo fra localStorage hvis vi sletter den
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    let todoIndex = todo.children[0].innerText
    //Fjerner fra arrayet
    todos.splice(todos.indexOf(todoIndex), 1)
    //konvertere til en JSON streng som kan lagres i localStorage 
    localStorage.setItem("todos", JSON.stringify(todos))
}
      



