let todoInput // miejsce, gdzie wpisujemy tresc zadania
let errorInfo // info o braku zadan/koniecznosci wpisanie tekstu
let addBtn // przycisk dodajacy nowe elementy do listy
let ulList // lista zadan, tagi ul
let newTodo // nowo dodane li

let popup // popup
let popupInfo // tekst w popupie gdy doda sie pusty tekst
let todoToEdit // edytowany todo
let popupInput // input w popupie
let popupAddBtn // przycisk zatwierdz w popupie
let popupCloseBtn // przycisk 'anuluj' w popupie


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTodo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li');
        newTodo.textContent = todoInput.value;
        createToolsArea();

        ulList.appendChild(newTodo);

        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = "Wprowadź tekst zadania!";
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    newTodo.append(toolsPanel)

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("complete");
    doneBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button');
    editBtn.classList.add("edit");
    editBtn.textContent = 'EDIT'

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(doneBtn, editBtn, deleteBtn);

}

const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.edit')) {
        editTodo(e)
    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value;
        popup.style.display = 'none';
    } else {
        popupInfo.textContent = 'Musisz coś wpisać'
    }
}

const deleteTodo = (e) => {
    e.target.closest('li').remove();

    const allTodos = document.querySelectorAll('li')

    if (allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadan na liscie';
    }
}

const enterKeyCheck = (e) => {
    if (e.key === 'Enter') {
        addNewTodo()
    }
}


document.addEventListener('DOMContentLoaded', main)