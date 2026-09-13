let idValue = 1
let inputText
let tasksArray = []

const addButton = document.getElementById("add-btn")
const inputElement = document.getElementById("input-el")
const tasksUlElement = document.getElementById("tasks-ul-el")

addButton.addEventListener("click",function(){
    inputText = inputElement.value.trim()
    if(inputText){
        const task = {
        id: idValue,
        isCompleted: false,
        name: inputText
        }
        tasksArray.push(task)
        localStorage.setItem("tasks",JSON.stringify(tasksArray))
        
    }else{
        alert("The task can't be an empty space !")
    }
})

