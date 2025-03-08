const todoForm = document.querySelector('.todo-list')
const input = todoForm.querySelector('.input-task')
const inputButton = todoForm.querySelector('.add-button')
const tasksForm = todoForm.querySelector('.tasks')

//thêm task vào bằng insertAdjacentHTML
let addTask = (value,complete) =>{
    tasksForm.insertAdjacentHTML ('afterbegin', `
        <div class="task ${complete}">
            <div class="task-check">
                <i class="fa-regular fa-circle"></i>
            </div>
            <div class="task-content">
            <b><p>${value}</p></b>
            </div>
            <div class="task-delete">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
    `);
    storTasks()
}
//lưu trữ task vào local storage
const storTasks = () => {
    const tasks = tasksForm.querySelectorAll('.task');
    const taskList = [];
    tasks.forEach(task => {
        const taskContent = task.querySelector('.task-content p').textContent;
        const isComplete = task.classList.contains('complete');
        taskList.push({ content: taskContent, complete: isComplete });
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
}



//add dữ liệu từ localStor ra

const loadData = (values) =>{
    values.forEach((value)=>{
        let content = value.content;
        let complete 
        if (value.complete == true) {
            complete = "complete"
        }else{
            complete = ""
        }
        addTask(content,complete)
    })
}

//láy dữ lệu input  
let handelAddTask = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
            if(input.value.trim() !== ''){
                let value = input.value
                addTask(value)
                input.value = ''
            }
        
    }
}



// hành động nhấn Enter hăck click để thêm task
input.addEventListener('keydown', handelAddTask)
inputButton.addEventListener('click', handelAddTask)

window.addEventListener('load', () => {
     loadData(JSON.parse(localStorage.getItem('tasks')) || []);
})

// click vào task để đánh dấu hoàn thành và nhấn icon tùng rác để xóa
tasksForm.addEventListener('click', e => {
    const taskElement = e.target.closest('.task');
    //nut delete
    if (e.target.classList.contains('fa-trash')){
        taskElement.remove()
        storTasks()
    }
    //nut complete
    if (e.target.closest('.task').classList.contains('task')) {
        e.target.closest('.task').classList.toggle('complete');
        storTasks()
    }
    //doi icon
    if (e.target.closest('.task').classList.contains('complete')) {
        icnonCheck = taskElement.querySelector('.task-check')
        icnonCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    }else{
        icnonCheck = taskElement.querySelector('.task-check')
        icnonCheck.innerHTML = '<i class="fa-regular fa-circle"></i>'
    }
});



