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
    const lastTaskSaved = tasksArray[tasksArray.length-1]
    idValue = lastTaskSaved.id + 1
    console.log(idValue)
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
                    <span>${taskObject.name}</span>
                    <div class="deleteAndEditButtons">
                        <button class="editButton">Edit</button>
                        <button class="deleteButton">Delete</button>
                    </div>
                </li>
    `
}
