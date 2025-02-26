

const inputBox = document.getElementById("inputBox");
const submitButton = document.querySelector(".button");
const listContainer = document.getElementById("listContainer");
showSavedData();

submitButton.addEventListener("click", () =>{
    addTask();
    saveData();
}
)
inputBox.addEventListener("keypress", event =>{
    
    if(event.key === 'Enter'){
        addTask();
        saveData();
    }
}
)

function addTask(){
    if(inputBox.value === ''){
        alert("You did not write a task!");
    }
    else{
        const li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }

    inputBox.value = '';
}

listContainer.addEventListener('click', event => {
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData();
    }
    else if(event.target.tagName === 'SPAN'){
        event.target.parentElement.remove();
        saveData();
    };
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showSavedData(){
    listContainer.innerHTML = localStorage.getItem("data")
}