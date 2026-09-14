let idValue = 1
let tasksArray = []

const addButton = document.getElementById("add-btn")
const inputElement = document.getElementById("input-el")
const tasksUlElement = document.getElementById("tasks-ul-el")

if(localStorage.getItem("tasks")){                            
    tasksArray = JSON.parse(localStorage.getItem("tasks"))
    for(index = 0; index < tasksArray.length ; index ++){
        renderTasks(tasksArray[index])
    }
    if(tasksArray.length != 0){
        const lastTaskSaved = tasksArray[tasksArray.length - 1]
        idValue = lastTaskSaved.id + 1
    }
    else{
        idValue = 1
    }
}

addButton.addEventListener("click",function(){
    const inputText = inputElement.value.trim()
    inputElement.value = ""
    if(inputText){
        const task = {
        id: idValue,
        isCompleted: false,
        name: inputText
        }
        tasksArray.push(task)
        idValue ++
        localStorage.setItem("tasks",JSON.stringify(tasksArray))
        renderTasks(tasksArray [tasksArray.length - 1])
    }else{
        alert("The task can't be an empty space !")
    }
})


function renderTasks(taskObject){
    tasksUlElement.innerHTML += `
                <li class="taskBox">
                    <div>
                        <input type="checkbox">
                        <span>${taskObject.name}</span>
                    </div>
                    <div class="deleteAndEditButtons">
                        <button class="editButton" data-id="${taskObject.id}">Edit</button>
                        <button class="deleteButton" data-id="${taskObject.id}">Delete</button>
                    </div>
                </li>
    `
}


tasksUlElement.addEventListener("click",function(event){
    if(event.target.classList.contains("deleteButton")){
        const taskId = Number(event.target.dataset.id)
        tasksArray = tasksArray.filter(function(task){
            return task.id !== taskId
        })
        tasksUlElement.innerHTML = ""
        for (let index = 0 ; index < tasksArray.length ; index ++){
            renderTasks(tasksArray[index])
        }
        localStorage.setItem("tasks",JSON.stringify(tasksArray))
    }
})


tasksUlElement.addEventListener("click", function(event){
    if (event.target.classList.contains("editButton")){
        const taskId = Number(event.target.dataset.id)
        let newTask = prompt("Enter new text: ", taskEdit.name)
        const taskEdit = tasksArray.find(function(task){
            return task.id === taskId
        })
        if(newTask){
            taskEdit.name = newTask
            tasksUlElement.innerHTML = ""
            localStorage.setItem("tasks",JSON.stringify(tasksArray))
            for (index = 0; index < tasksArray.length ; index ++){
                renderTasks(tasksArray[index])
            }
        }
        else{
            alert("Task can't be an empty string")
        }
    }
})