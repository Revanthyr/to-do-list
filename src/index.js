import './style.css'
 import {differenceInCalendarDays} from "date-fns" 

console.log("hey")

const main = {
    
    projects : [],
    addProject : function(project){this.projects.push(project); return this.projects},
    getProjects : function(){return main.projects},
    removeProject: function(project){
        this.projects.splice(this.projects.indexOf(project),1)
    }

}


function createProject (name,todolist){
    let todos = [];
    if (todolist != undefined){
        todos = todolist
    }
    
     const addTodo = function(todo){todos.push(todo); return todos}
    const getTodos = function(){return todos};
    let isGenerated = false
    const removeTodo = function(todo){
        todos.splice(todos.indexOf(todo),1)
    }
    return {name,getTodos,addTodo,isGenerated,todos,removeTodo};
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
     
      
         let YOOOO = JSON.parse(localStorage.getItem("projects"))
         let HEY  =  localStorage.getItem("projects")
        console.log(YOOOO)
        console.log(HEY + "NOT PARSIFIED")
    }
    const body = document.querySelector(".body");
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
        body.innerHTML = ""
        main.projects.map(function(current){
            current.isGenerated = false;
            const div = document.createElement("div");

            if (current.isGenerated == false){
                div.textContent = current.name
                div.classList.add("project-div")
                current.isGenerated = true;
                let removeButton = document.createElement("button")
                removeButton.textContent = "";
                div.appendChild(removeButton);
               
                body.appendChild(div)
               populateTodos(current)
            }
            div.addEventListener("click",populateTodos)
        })
        let removeProjectBtn = document.querySelectorAll(".project-div button")
        removeProjectBtn.forEach(function(current){
            current.addEventListener("click",function(){
                
                let correspondingProject = main.projects.filter(function(project){
                    if ( current.parentNode.textContent == project.name){
                        return true;
                    }
                    
                })
                main.removeProject(correspondingProject[0])
                    populateStorage()
                    populateProjects()
                
               
            })
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
            let todoRemove = document.createElement("button");
            todoDate.textContent  = current.date
            todosTitle.textContent = current.name;
            todosDiv.classList.add("todos-div");
            todosArea.appendChild(todosDiv);
            todosDiv.appendChild(todosTitle)
            todosDiv.appendChild(todoDate);
            
            
            todosDiv.appendChild(taskArea);
            todosDiv.appendChild(todoRemove);
            todoRemove.textContent =  "remove";
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
        let removeTodoBtn = document.querySelectorAll(".todos-div button")
        removeTodoBtn.forEach(function(current){
            current.addEventListener("click",function(){
                
                let correspondingTodo = latestClickedProject.getTodos().filter(function(todo){
                    if ( current.parentNode.firstChild.textContent == todo.name){
                        return true;
                    }
                    
                })
                latestClickedProject.removeTodo(correspondingTodo[0])
                    populateStorage()
                    populateProjects()
                
               
            })
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
               if (latestClickedProject.name == "next7days"){
                return false;
               }
               else{
                latestClickedProject.addTodo(createTodo(formName.value,formDate.value,formImportance.value))
                
                let differencewithToday = differenceInCalendarDays(
                    new Date(),
                    new Date(formDate.value)

                )
                
                if (differencewithToday<7 ){
                    let Next7days = main.projects.filter(function(current){if(current.name=="next7days"){return true}})[0]
                    Next7days.addTodo(createTodo(formName.value,formDate.value,formImportance.value))
                }
                console.log(formDate.value)
                console.log(latestClickedProject.getTodos())
             console.log("formsubmit hey hey")
             populateTodos(latestClickedProject)
             dialog.close();
               }
             
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
                populateStorage();
                
                
            })
          
           
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
            taskCheckbox.checked = curent.isDone
            taskArea.appendChild(taskContainer);
            taskContainer.appendChild(taskCheckbox);
            taskContainer.appendChild(taskName);
            populateStorage();
            
        })
      
    }
    let taskCheckbox = document.querySelectorAll(".task-container input");
      
    taskCheckbox.forEach(function(currentCheckbox){
       
     currentCheckbox.addEventListener("click",function(currentCheckbox){
         let h2Text = currentCheckbox.target.parentNode.parentNode.parentNode.firstChild.textContent
         let currentTodo =  latestClickedProject.getTodos().filter(function(current){
             if (current.name == h2Text){
                 
                 return true
             }})
            
        let currentTask = currentTodo[0].getTasks().filter(function(current){
                if (current.name == currentCheckbox.target.nextSibling.textContent){
                    return true
                }
            })
            currentTask[0].isDone = currentCheckbox.target.checked;
            populateStorage()
            
            })})
}

/*



everytime  a new todo is added{
    if the date of todo is seven days from today
    append todo to next7days
}



*/

    return {populateProjects,populateTodos,populateTasks}
})()
let Next7days = ""
let testVaarrr = localStorage.getItem("projects")
if (testVaarrr =="[]"){
    let hello = 1;
     Next7days = createProject("next7days")
    main.addProject(Next7days)
    domManager.populateProjects()
}
else{
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    
    storedProjects.forEach(function(storedProject) {
       
        const recreatedProject = createProject(storedProject.name);
        
        storedProject.todos.forEach(function(storedTodo) {
          
            const recreatedTodo = createTodo(storedTodo.name, storedTodo.date, storedTodo.priority);
            
          
            storedTodo.tasks.forEach(function(storedTask) {
                const recreatedTask = createTask(storedTask.name, storedTask.isDone);
                recreatedTodo.addTask(recreatedTask);
            });

            recreatedProject.addTodo(recreatedTodo);
        });

      
        main.addProject(recreatedProject);
    });


 
    
    domManager.populateProjects()
    main.projects.forEach(function(current){
        domManager.populateTodos(current)
        current.todos.forEach(function(todo){
            domManager.populateTasks(todo);
        })
    })
    
    
    
    
}

    