import './style.css'
// import {someyhing} from "date-fns" 

console.log("hey")

const main = {
    
    projects : [],
    addProject : function(project){this.projects.push(project); return this.projects},
    getProjects : function(){return main.projects},


}


function createProject (name,todolist){
    let todos = [];
    if (todolist != undefined){
        todos = todolist
    }
    
     const addTodo = function(todo){todos.push(todo); return todos}
    const getTodos = function(){return todos};
    let isGenerated = false
    return {name,getTodos,addTodo,isGenerated,todos};
}
function createTodo (name,date,priority){
    let tasks = [];
    const addTask = function(task){tasks.push(task); return tasks};
    const getTasks = function(){return tasks};
    return {addTask,getTasks,date,name,priority,tasks};
}
function createTask(name,isDone) {
    return  {name,isDone}
}


const domManager  =  (function(){
    const populateStorage  = function(){
       
        localStorage.setItem("projects",JSON.stringify(main.getProjects()))
       // localStorage.setItem("tasks",JSON.stringify())
      
         let YOOOO = JSON.parse(localStorage.getItem("projects"))
         let HEY  =  localStorage.getItem("projects")
        console.log(YOOOO)
        console.log(HEY + "NOT PARSIFIED")
    }
    const body = document.querySelector(".projects-area");
    const projectBtn = document.querySelector(".project-btn");
    const todosArea = document.querySelector(".todos-area")
    const dialog  = document.querySelector("dialog");
    const form = document.querySelector("form");
    const formName = document.querySelector("#name");
    const formDate = document.querySelector("#date");
    const formImportance = document.querySelector("#importance");
    const formSubmit = document.querySelector("#submit");
    const formClose = document.querySelector(".close-btn");
    projectBtn.addEventListener("click",function(){
        const input = document.createElement("input");
        input.maxLength = 20;
        
        body.appendChild(input);
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container")
        const confirmButton = document.createElement("button");
        const cancelButton = document.createElement("button");
        body.appendChild(buttonsContainer);
        buttonsContainer.appendChild(confirmButton);
        buttonsContainer.appendChild(cancelButton);
        
        confirmButton.textContent = "Confirm";
        cancelButton.textContent = "Cancel";
        confirmButton.classList.add("confirm-btn");
        cancelButton.classList.add("cancel-btn");
        cancelButton.addEventListener("click",function(){
            body.removeChild(buttonsContainer)
            body.removeChild(input);
        })
        const handleConfirmClick = function(){
            if (input.value!=""){
                main.addProject(createProject(input.value))
                populateStorage()
                body.removeChild(buttonsContainer)
                body.removeChild(input);
                populateProjects()
                console.log(main.getProjects());
            }
           
            
        }
        const handleConfirmEnter = function(e){
            if (e.code == "Enter"){
                main.addProject(createProject(input.value))
                populateStorage()
                body.removeChild(buttonsContainer)
                body.removeChild(input);
                populateProjects()
                console.log(main.getProjects());
            }
        }
        confirmButton.addEventListener("click",handleConfirmClick)
        input.addEventListener("keydown",handleConfirmEnter)
    })
    const populateProjects = function(){
        main.projects.map(function(current){
            const div = document.createElement("div");
            if (current.isGenerated == false){
                div.textContent = current.name
                div.classList.add("project-div")
                current.isGenerated = true;
                body.appendChild(div)
               populateTodos(current)
            }
            div.addEventListener("click",populateTodos)
        })
    }

    let latestClickedProject = "";
    const populateTodos = function(e){
        
        todosArea.innerHTML = ""
        let currentProject = main.getProjects().filter(function(current){
            if(e.type == "click"){
                if (current.name ==e.target.textContent ){
                    latestClickedProject = current;
                    console.log(latestClickedProject)
                    return true;
                    
                }
            }
            
            else if (current.name ==e.name ){
                latestClickedProject = current;
                console.log(latestClickedProject);
                return true;
                
            }
        })
        currentProject[0].getTodos().map(function(current){
            let todosDiv = document.createElement("div");
            let todosTitle = document.createElement("h2");
            let taskArea = document.createElement("div");
            let todoDate = document.createElement("p");
            todoDate.textContent  = current.date
            todosTitle.textContent = current.name;
            todosDiv.classList.add("todos-div");
            todosArea.appendChild(todosDiv);
            todosDiv.appendChild(todosTitle)
            todosDiv.appendChild(todoDate);
            todosDiv.appendChild(taskArea);
            if (current.priority == "importance-4"){
                todosDiv.classList.add("very-important");
            }
            else if (current.priority == "importance-3"){
                todosDiv.classList.add("important");
            }
            else if (current.priority == "importance-2"){
                todosDiv.classList.add("minor")
            }
            else{todosDiv.classList.add("trivial")}
           
            taskArea.classList.add("task-area")
            let todosInput = document.createElement("input");
            todosDiv.appendChild(todosInput);
            populateStorage()
            populateTasks(current)
            todosInput.addEventListener("keydown",populateTasks);
        })
        const addTodoButton = document.createElement("button");
        todosArea.appendChild(addTodoButton);
        addTodoButton.textContent = "Add To-do"
        addTodoButton.addEventListener("click",function(){
            dialog.showModal();
            console.log("addtobutton hey hey")
            
           
            
     
        })
       
         }

         formSubmit.addEventListener("click",function(){
            formName.setCustomValidity("");
            formDate.setCustomValidity("");
            formImportance.setCustomValidity("");
            if (formName.validity.valueMissing == true){
                event.preventDefault();
                formName.setCustomValidity("Name of To-do?");
            }
            
            else if (formDate.validity.valueMissing == true){
                event.preventDefault();
                formDate.setCustomValidity("Due Date?");
            }
            else if (formImportance.validity.valueMissing == true){
                event.preventDefault();
                formImportance.setCustomValidity("Importance?");}
            else if (formName.value ==latestClickedProject.getTodos().map((current)=>{return current.name }) ){
                    event.preventDefault()
                    formName.setCustomValidity("Pick a new Name!")
            }
            else{
               event.preventDefault();
               latestClickedProject.addTodo(createTodo(formName.value,formDate.value,formImportance.value))
               console.log(latestClickedProject.getTodos())
            console.log("formsubmit hey hey")
            populateTodos(latestClickedProject)
            dialog.close();
            }
            
            formName.reportValidity();
            formDate.reportValidity();
            formImportance.reportValidity();
            formName.value = ""
            formDate.value = ""

        })



    const populateTasks = function(e){
        if (e.code == "Enter" ){
            let h2Text = e.target.parentNode.firstChild.textContent;
           let currentTodo =  latestClickedProject.getTodos().filter(function(current){
                if (current.name == h2Text){
                    
                    return true
                }
                
            })
            currentTodo[0].addTask(createTask(e.target.value,false));
            let taskArea = e.target.parentNode.childNodes[2]
            taskArea.innerHTML = "";
            e.target.value = "";
            currentTodo[0].getTasks().map(function(curent){
                let taskContainer = document.createElement("div");
                taskContainer.classList.add("task-container");
                let taskCheckbox = document.createElement("input");
                taskCheckbox.setAttribute("type","checkbox");
                let taskName = document.createElement("p");
                taskName.textContent = curent.name;
                
                taskArea.appendChild(taskContainer);
                taskContainer.appendChild(taskCheckbox);
                taskContainer.appendChild(taskName);
                taskCheckbox.checked = curent.isDone;
                
                
            })
            let taskCheckbox = document.querySelectorAll(".task-container input");
      
           taskCheckbox.forEach(function(currentCheckbox){
            currentCheckbox.addEventListener("click",function(currentCheckbox){
                let h2Text = currentCheckbox.target.parentNode.parentNode.parentNode.firstChild.textContent
                let currentTodo =  latestClickedProject.getTodos().filter(function(current){
                    if (current.name == h2Text){
                        
                        return true
                    }})
                currentTodo[0].getTasks().map(function(currenttask){
                    if ( currentCheckbox.target.nextSibling.textContent == currenttask.name){
                        currenttask.isDone = currentCheckbox.target.checked;
                    }
                })
           })})
           
    }
    else if (e.name !=undefined){

        
        let currentTodo = ""
        for (let i=todosArea.childNodes.length;i>0;i--){
            
            if (todosArea.childNodes[i-1].firstChild.textContent == e.name){
                currentTodo = todosArea.childNodes[i-1]
            }
        }
  
    let taskArea  =                 currentTodo.childNodes[2]
     
            taskArea.innerHTML = "";
        e.getTasks().map(function(curent){
            let taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");
            let taskCheckbox = document.createElement("input");
            taskCheckbox.setAttribute("type","checkbox");
            let taskName = document.createElement("p");
            taskName.textContent = curent.name;
            taskArea.appendChild(taskContainer);
            taskContainer.appendChild(taskCheckbox);
            taskContainer.appendChild(taskName);
            
        })
    }
}

/*


figure out how to  save todos and tassk aswell.     figure it out bruvBUUUUUUVVV

add local storage


add home project with all todos
and due in 7 days projecetsefsfsdfjskfjsklfjsklfjekdfjziorfjzeios

add styiling withing todos - font, flex display etc
 when tasks are checked they go to the bottom



*/

    return {populateProjects,populateTodos}
})()
if (!localStorage.getItem("projects")){
    let hello = 1;
}
else{
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    
    storedProjects.forEach(function(storedProject) {
        // Recreate each project using createProject and pass in the stored todos
        const recreatedProject = createProject(storedProject.name);
        
        storedProject.todos.forEach(function(storedTodo) {
            // Recreate each todo using createTodo and pass in the stored tasks
            const recreatedTodo = createTodo(storedTodo.name, storedTodo.date, storedTodo.priority);
            
            // Recreate tasks and add them to the todo
            storedTodo.tasks.forEach(function(storedTask) {
                const recreatedTask = createTask(storedTask.name, storedTask.isDone);
                recreatedTodo.addTask(recreatedTask);
            });

            recreatedProject.addTodo(recreatedTodo);
        });

        // Add the fully reconstructed project back to main.projects
        main.addProject(recreatedProject);
    });


  /*   JSON.parse(localStorage.getItem("projects")).forEach(function(current){
        main.addProject(createProject(current.name,current.todos))
        
        // the porblem is todo objkects dont have their gettasks functionality
        // so i need to recreate them like i did with obkects
        
    })
    main.projects.forEach(function(current){
        current.todos.forEach(function(currentTodo){
            current.addTodo(createTodo(currentTodo.name,currentTodo.date,currentTodo.priority))
        }) 
    }) */ 
    
    domManager.populateProjects()
    main.projects.forEach(function(current){
        domManager.populateTodos(current)
    })
    
    
    
    
}
    