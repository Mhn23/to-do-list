let idValue = 1
let tasksArray = []

const addButton = document.getElementById("add-btn")
const inputElement = document.getElementById("input-el")
const tasksUlElement = document.getElementById("tasks-ul-el")

if(localStorage.getItem("tasks")){                     //here it checks if there is data in localstorage and if there is         
    tasksArray = JSON.parse(localStorage.getItem("tasks"))              //it simply renders it out on the screend and also modifies
    for(index = 0; index < tasksArray.length ; index ++){               //the tasks array
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

addButton.addEventListener("click",function(){          //this is where the task object is created and is added to the array and localstorage
    const inputText = inputElement.value.trim()         //also after its being added its also rendered on the screen
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


function renderTasks(taskObject){           //this is the render function,it shows the array on the screen/html
    if(!taskObject.isCompleted){
        tasksUlElement.innerHTML += `           
                <li class="taskBox">
                    <div>
                        <input type="checkbox" onclick="changeState('${taskObject.id}')">
                        <span>${taskObject.name}</span>
                    </div>
                    <div class="deleteAndEditButtons">
                        <button class="editButton" data-id="${taskObject.id}">Edit</button>
                        <button class="deleteButton" data-id="${taskObject.id}">Delete</button>
                    </div>
                </li>
    `
    }else{
        tasksUlElement.innerHTML += `           
                <li class="taskBox">
                    <div>
                        <input type="checkbox" onclick="changeState('${taskObject.id}')" checked>
                        <span class = "completedTask">${taskObject.name}</span>
                    </div>
                    <div class="deleteAndEditButtons">
                        <button class="editButton" data-id="${taskObject.id}">Edit</button>
                        <button class="deleteButton" data-id="${taskObject.id}">Delete</button>
                    </div>
                </li>
    `
    }
}


tasksUlElement.addEventListener("click",function(event){        //this event listener is made for the delete button so that when a button is 
    if(event.target.classList.contains("deleteButton")){        //clicked anywhere inside of the unordered list it checks if its a delete button
        const taskId = Number(event.target.dataset.id)          //and if it is than it simply takes the id, searches inside of the array and removes the object-task
        tasksArray = tasksArray.filter(function(task){          //with the same id
            return task.id !== taskId
        })
        tasksUlElement.innerHTML = ""
        for (let index = 0 ; index < tasksArray.length ; index ++){
            renderTasks(tasksArray[index])
        }
        localStorage.setItem("tasks",JSON.stringify(tasksArray))
    }
})


tasksUlElement.addEventListener("click", function(event){           //this is pretty much the same as the delete button but it modifies the name property
    if (event.target.classList.contains("editButton")){             //of the object with the id that was clicked and it takes advantage of the fact that
        const taskId = Number(event.target.dataset.id)              //in js objects are referenced as pointers, so when modified it modifies inside the array 
        let newTask = prompt("Enter new text: ", taskEdit.name)     //without the need of me to add it to the array again
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


function changeState(id){               //this changes the state of the task is its either completed
    id = Number(id)                     //or not and re-renders the tasksarray so that it will show the modifications that have been made
    let completedTask = tasksArray.find(function(task){
        return task.id === id
    })
    completedTask.isCompleted = !completedTask.isCompleted
    localStorage.setItem("tasks",JSON.stringify(tasksArray))
    tasksUlElement.innerHTML = ""
    for(let index = 0; index < tasksArray.length ; index ++){
        renderTasks(tasksArray[index])
    }
}