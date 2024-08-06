import './style.css'

console.log("hey")

const main = {
    projects : [],
    addProject : function(project){this.projects.push(project); return this.projects},
    getProjects : function(){return main.projects},


}


function createProject (name){

    let todos = [];
     const addTodo = function(todo){todos.push(todo); return todos}
    const getTodos = function(){return todos};
    let isGenerated = false
    return {name,getTodos,addTodo,isGenerated};
}
function createTodo (name,date,priority){
    let tasks = [];
    const addTask = function(task){tasks.push(task); return tasks};
    const getTasks = function(){return tasks};
    return {addTask,getTasks,date,name,priority};
}
function createTask(name,description,isDone) {
    return  {name,description,isDone}
}
const project1 = createProject("heya");
console.log(project1)

const domManager  =  (function(){
    const body = document.querySelector(".projects-area");
    const projectBtn = document.querySelector(".project-btn");
    projectBtn.addEventListener("click",function(){
        const input = document.createElement("input");
        input.maxLength = 20;
        
        body.appendChild(input);
        const confirmButton = document.createElement("button");
        const cancelButton = document.createElement("button");
        body.appendChild(confirmButton);
        body.appendChild(cancelButton);
        confirmButton.textContent = "Confirm";
        cancelButton.textContent = "Cancel";
        confirmButton.classList.add("confirm-btn");
        cancelButton.classList.add("cancel-btn");
        cancelButton.addEventListener("click",function(){
            body.removeChild(cancelButton);
            body.removeChild(confirmButton);
            body.removeChild(input);
        })
        const handleConfirmClick = function(){
            if (input.value!=""){
                main.addProject(createProject(input.value))
                body.removeChild(cancelButton);
                body.removeChild(confirmButton);
                body.removeChild(input);
                populateProjects()
                console.log(main.getProjects());
            }
           
            
        }
        const handleConfirmEnter = function(e){
            if (e.code == "Enter"){
                main.addProject(createProject(input.value))
                body.removeChild(cancelButton);
                body.removeChild(confirmButton);
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
            }
            // div.addEventListener("click",)
        })
    }
/*
create HTML: grid layout +  div that contains the projects
populateProjects will take each project in the array and for each of them add a child to the div that has the correct name and a class for css styling 
ggez
problem: it goes through the projects each time and populates them again. I would like it to check wether the project is already on there
it could go through all chidren of body and checkif a

*/

    return {}
})()
