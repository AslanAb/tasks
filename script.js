//вывести все карточки заданий на страницу
showTasks()
// присваивание функции удаления и редактирования к кнопкам карточек
deleteTask()
editTask()

function showTasks() {
    //отрисовка карточек
    let tasksArr = JSON.parse(localStorage.getItem("tasks"))
    if (tasksArr) {
        const tasksEl = document.querySelector('.tasks')
        tasksArr.forEach((el) => {
            tasksEl.appendChild(createDivTask(el.title, el.text, el.id))
        })
    } else {
        tasksArr = []
        localStorage.setItem('tasks', JSON.stringify(tasksArr))
    }
}

function createDivTask(title, text, id) {
    let taskEl = document.createElement('div')
    taskEl.classList.add('task')
    taskEl.id = id
    taskEl.innerHTML = `
        <div class="task-header header">
            <p class="task-title">${title}</p>
            <input type="text" class="input-title hidden hidden1" placeholder="Заголовок">
            <div>
                <button class="task-edit"><img src="./image/edit.png" alt="" class="edit img"></button>
                <button class="task-delete"><img src="./image/delete.png" alt="" class="delete img"></button>
            </div>
        </div>
        <p class="task-text">${text}</p>
        <textarea class="textarea_text hidden" cols="34" rows="22" placeholder="Задача"></textarea>
    `
    return taskEl
}

// Добавить новую карточку задания
class newTask {
    constructor(title, text, id) {
        this.title = title
        this.text = text
        this.id = id
    }
}

document.querySelector('.task-add').addEventListener('click', () => {
    creatTask('Заголовок', 'Ваш текст')
})

function creatTask(title, text) {
    // Создать новый объект задания и загрузить в базу
    let tasksArr = JSON.parse(localStorage.getItem("tasks"))
    let idOfNewTask = null
    if (tasksArr.length > 0) {
        idOfNewTask = tasksArr[tasksArr.length - 1].id + 1
        let task = new newTask(title, text, idOfNewTask)
        tasksArr.push(task)
    } else {
        idOfNewTask = 1
        tasksArr = [{
            "title": title,
            "text": text,
            "id": idOfNewTask
        }]
    }
    localStorage.setItem('tasks', JSON.stringify(tasksArr))

    // Вывести добавленное задание на карточку и вывести карточку на экран
    const tasksEl = document.querySelector('.tasks')
    tasksEl.appendChild(createDivTask(title, text, idOfNewTask))
    // переприсваивание функции удаления и редактирования к кнопкам карточек
    deleteTask()
    editTask()
}

// удаление карточки задания
function deleteTask() {
    // присваивание функции к кнопкам удаления карточек
    document.querySelectorAll(".task-delete").forEach((el) => {
        el.addEventListener("click", deleteFromStorageAndDOM)
    })
}
// Удаление задания из базы и удаление карточки
function deleteFromStorageAndDOM(el) {
    let taskId = el.target.parentNode.parentNode.parentNode.parentNode.id
    let tasksArr = JSON.parse(localStorage.getItem("tasks"))
    let indexOfTask = tasksArr.findIndex((el) => el.id == taskId)
    tasksArr.splice(indexOfTask, 1)
    localStorage.setItem("tasks", JSON.stringify(tasksArr))
    el.target.parentNode.parentNode.parentNode.parentNode.remove()
}

//редактирование карточек заданий
function editTask() {
    // присваивание функции к кнопкам редактирования карточек
    document.querySelectorAll(".task-edit").forEach((el) => {
        el.addEventListener("click", editTaskFromStorageAndDOM)
    })
}

function editTaskFromStorageAndDOM(el) {
    let taskId = el.target.parentNode.parentNode.parentNode.parentNode.id
    let task = document.getElementById(`${taskId}`)
    let taskTitle = task.querySelector(".task-title")
    let taskText = task.querySelector(".task-text")
    let inputTitle = task.querySelector(".input-title")
    let textareaText = task.querySelector(".textarea_text")

    taskTitle.classList.toggle("hidden")
    taskText.classList.toggle("hidden")
    inputTitle.classList.toggle("hidden")
    textareaText.classList.toggle("hidden")

    //изменение задания в базе
    if (inputTitle.classList.contains('hidden')) {
        let tasksArr = JSON.parse(localStorage.getItem("tasks"))
        let indexOfTask = tasksArr.findIndex((el) => el.id == taskId)
        tasksArr[indexOfTask].title = inputTitle.value
        tasksArr[indexOfTask].text = textareaText.value
        localStorage.setItem("tasks", JSON.stringify(tasksArr))
        //обновление карточки
        taskTitle.textContent = tasksArr[indexOfTask].title
        taskText.textContent = tasksArr[indexOfTask].text
    }

    inputTitle.value = taskTitle.textContent
    textareaText.value = taskText.textContent
}