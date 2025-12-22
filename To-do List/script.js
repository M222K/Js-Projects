//add the whole functionality to render once the DOM is loaded
document.addEventListener("DOMContentLoaded",()=>{
    const todoInput = document.getElementById("to-do input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    //i want to get the tasks from local storage if any so i will parse them form the task array and if there is nothing there i will initialize it as an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task)=>renderTasks(task)); //render tasks on the page load

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            return;
        }
        const newTask = {
            id: Date.now(),
            text: taskText,
            complteted: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks(newTask);
        todoInput.value = ""; //clear input field
        console.log("Task Added:", tasks);
    });

    function renderTasks(task) {
        const li=document.createElement("li");
        li.setAttribute("data-id",task.id);
        if(task.completed){
            li.classList.add("completed");
        }
        li.innerHTML=`
        <span>${task.text}</span>
        <button class="dlt-button">Delete</button>
        `;
        li.addEventListener("click",(e)=>{
            if(e.target.tagName==="BUTTON")return;
            console.log(e);
            task.completed=!task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        //to delete the task we write a specify query selector for the delete button
        li.querySelector(".dlt-button").addEventListener("click",(e)=>{
            e.stopPropagation(); //to prevent the li click event from firing
            todoList.removeChild(li);
            tasks=tasks.filter((t)=>t.id!==task.id);
            saveTasks();
            console.log("Task Deleted:",tasks);
        })
        todoList.appendChild(li);
    }

    //push the task array memory to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})

