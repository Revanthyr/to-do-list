console.log("hey")

const main = {
    projects : [],
    addProject : function(project){this.projects.push(project); return this.projects},
    getProjects : function(){return projects},


}


function createProject (name){

    let todos = [];
     const addTodo = function(todo){todos.push(todo); return todos}
    const getTodos = function(){return todos};
    return {name,getTodos,addTodo};
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
    const projectBtn = document.querySelector(".project-btn");
    projectBtn.addEventListener("click",function(){
        
    })


    return {}
})()
