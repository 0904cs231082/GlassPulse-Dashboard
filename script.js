// digital clock functionality

function updateClock() {
    const clockElement = document.getElementById('live-clock');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.innerText = `${hours}:${minutes}:${seconds}`;


}


    // update clothes an every seconds
    setInterval(updateClock, 1000);
    updateClock();



    // Dark light mode

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        if(document.body.classList.contains('light-theme')){
            themeToggle.innerHTML  = "🌞 Light Mode";
        } else{
            themeToggle.innerHTML = " Dark Mode";
        }
    });

    function updateGreetings() {
        const greetingElement = document.getElementById('greeting');
        const hours = new Date().getHours();

        if(hours < 12){
            greetingElement.innerText = "Good Morning";
        } else if(hours < 18){
           greetingElement.innerText = "Good Afternoon";
        } else{
            greetingElement.innerText = "Good Evening"
        }
    }

    updateGreetings();


// change name functionality
const editBtn = document.getElementById('edit-name-btn');
const userNameSpan = document.getElementById('user-name');

editBtn.addEventListener('click', () =>{
    const newName = prompt("Enter Your Name:", userNameSpan.innerText);
    if(newName){
        userNameSpan.innerText = newName;
        document.querySelector('.avatar').innerText = newName.charAt(0).toUpperCase();
    }
    setTimeout(() => {
    alert("Name updated successfully!");
}, 1000); 
});


const navItems = document.querySelectorAll('.nav-items');
navItems.forEach(item =>{
    item.addEventListener('click', () =>{
        navItems.forEach(nav => nav.classList.remove('active-nav'));
        item.classList.add('active-nav');
    });
});


//  TODO logic

const taskInput = document.getElementById('todo-input');
const categorySelect = document.getElementById('task-category');
const addTaskBtn = document.getElementById('add-task-btn');
const taskContainer = document.getElementById('task-container');
const emptyMessage = document.getElementById('empty-message');

// load from local storage

const tasks= JSON.parse(localStorage.getItem('myDashboardTasks')) || [];

function saveAndRefresh(){
    localStorage.setItem('myDashboardTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks(){
    taskContainer.innerHTML = "";
     
    // check empty state
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
    tasks.forEach((task, index) => {
       const card = document.createElement('div');
       card.classList.add('task-card');
       if(task.completed) card.classList.add('completed');

       card.innerHTML = `
       <div style="display: flex; align-items: center;">
       <span class="tag">${task.category}</span>
       <span>${task.text}</span>
       </div>
       <div class="action-btns">
       <button onclick="toggleTask(${index})">✔</button>
       <button onclick="deleteTask(${index})">🧺</button>
       </div>
       `;
       taskContainer.appendChild(card);
    });
}

// add new task

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if(text === "") return;

    tasks.push({
        text: text,
        category: categorySelect.value,
        completed: false
    });
    taskInput.value = "";
    saveAndRefresh();
});

window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveAndRefresh();
};

window.deleteTask = (index) =>{
    tasks.splice(index, 1);
    saveAndRefresh();
};

renderTasks();

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', ()=>{
const term = searchInput.value.toLowerCase();
const allCards = document.querySelectorAll('.task-card');

allCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(term);
});
});