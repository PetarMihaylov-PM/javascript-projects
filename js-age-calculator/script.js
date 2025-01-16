
const button = document.querySelector(".button");
const result = document.getElementById("result");
let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split('T')[0];

button.addEventListener('click', calculateAge);

function calculateAge(){
    let birthDate = new Date(userInput.value);

    let dayOfBirth = birthDate.getDate();
    let monthOfBirth = birthDate.getMonth() + 1; // otherwise it strats from 0;
    let yearOfBirth = birthDate.getFullYear();

    let dayToday = new Date().getDate();
    let thisMonth = new Date().getMonth() + 1;
    let thisYear = new Date().getFullYear();

    let saveDay, saveMonth, saveYear;
    
    saveYear = thisYear - yearOfBirth;

    if(thisMonth >= monthOfBirth){
        saveMonth = thisMonth - monthOfBirth;
    } else {
        saveYear--;
        saveMonth = 12 + thisMonth - monthOfBirth; 
    }

    if(dayToday >= dayOfBirth){
        saveDay = dayToday - dayOfBirth;
    } else{
        saveMonth--;
        saveDay = getDaysOfMonth(yearOfBirth, monthOfBirth) + dayToday - dayOfBirth;
    }
    if(saveMonth < 0){
        saveMonth = 11;
        saveYear--;
    }

    if(isNaN(saveDay) || isNaN(saveMonth) || isNaN(saveYear)){
        result.innerHTML = "Enter your bith date.";
    }else{
        result.innerHTML = `You are <span>${saveYear}</span> years, <span>${saveMonth}</span> months and <span>${saveDay}</span> days old.`;
    }
}

function getDaysOfMonth(year, month){
    return new Date(year, month, 0).getDate();
}