let idValue = 0
let inputText

let task = {
    id: idValue,
    isCompleted: false,
    taskName: inputText
}

let taskArray = []
const addButton = document.getElementById("add-btn")
const inputElement = document.getElementById("input-el")
const tasksUlElement = document.getElementById("tasks-ul-el")

addButton.addEventListener("click",function(){
    inputText = inputElement.value.trim()
    if(inputText){
        tasksUlElement.innerHTML += ` 
                <li class="taskBox" id="task-el-id">
                    <span>${inputText}</span>
                    <div class="deleteAndEditButtons">
                        <button class="editButton">Edit</button>
                        <button class="deleteButton">Delete</button>
                    </div>
                </li>
                `
    }else{
        alert("The task can't be an empty space !")
    }
})

