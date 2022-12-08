let a = [{
    "title": "title",
    "text": "text"
}, {
    "title": "title1",
    "text": "text1"
}]
localStorage.setItem('tasks', JSON.stringify(a))
const tasksEl = document.querySelector('.tasks')
document.querySelector('.task-add').addEventListener('click', () => {
    tasksEl.appendChild(creatTask('Заголовок', 'Ваш текст'))
})

showTasks()

function showTasks() {
    let tasksArr = JSON.parse(localStorage.getItem("tasks"))
    tasksArr.forEach((el) => {
        tasksEl.appendChild(creatTask(el.title, el.text))
    })
}

class newTask {
    constructor(title, text) {
        this.title = title
        this.text = text
        this.id = () => {
            let tasksArr = JSON.parse(localStorage.getItem("tasks"))
            return indexOf(tasksArr[-1]) + 1
        }
    }
}

function creatTask(title, text) {
    let tasksArr = JSON.parse(localStorage.getItem("tasks"))
    let task = new newTask(title, text)
    tasksArr.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasksArr))

    creatHtml(title, text)

    let taskEl = document.createElement('div')
    let taskTitle = taskEl.querySelector(".task-title")
    let taskText = taskEl.querySelector(".task-text")
    let inputTitle = taskEl.querySelector(".input-title")
    let textareaText = taskEl.querySelector(".textarea_text")
    taskEl.querySelector(".task-edit").addEventListener("click", () => {
        taskTitle.classList.toggle("hidden")
        taskText.classList.toggle("hidden")
        inputTitle.classList.toggle("hidden")
        textareaText.classList.toggle("hidden")

        if (inputTitle.classList.contains('hidden')) {
            let tasksArr = JSON.parse(localStorage.getItem("tasks"))

            inputTitle.value
        }
    })

    taskEl.querySelector(".task-delete").addEventListener("click", () => {
        taskEl.remove()
    })


    return taskEl
}

function creatHtml(title, text) {
    let taskEl = document.createElement('div')
    taskEl.classList.add('task')
    taskEl.innerHTML = `
        <div class="task-header header">
            <p class="task-title">${title}</p>
            <input type="text" class="input-title hidden hidden1" placeholder="Заголовок">
            <div>
                <button class="task-edit"><img src="./image/edit.png" alt="" class="edit button"></button>
                <button class="task-delete"><img src="./image/delete.png" alt="" class="delete button"></button>
            </div>
        </div>
        <p class="task-text">${text}</p>
        <textarea class="textarea_text hidden" cols="34" rows="22" placeholder="Задача"></textarea>
    `
}
