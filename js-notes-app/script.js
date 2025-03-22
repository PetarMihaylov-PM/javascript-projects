

 const notesContainer = document.querySelector(".notes-container");
 const noteButton = document.querySelector(".button");
 let notes = document.querySelectorAll(".input-box");

 getSavedData();



 function getSavedData(){
    notesContainer.innerHTML = localStorage.getItem("notes");
 }

 function saveNotes(){
    localStorage.setItem("notes", notesContainer.innerHTML);
 }

 noteButton.addEventListener('click', () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "img/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    saveNotes();
 })

 notesContainer.addEventListener("click", event => {
    if(event.target.tagName === 'IMG'){
        event.target.parentElement.remove();
        saveNotes();
    } else if(event.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(note => {
            note.onkeyup = () => {
                saveNotes();
            }
        })
    }
 });

 document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
 })
