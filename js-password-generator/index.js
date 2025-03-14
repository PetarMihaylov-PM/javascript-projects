

const passwordInput = document.getElementById("input");
const length = 12;
const button = document.querySelector('.button');

const upperCase = "QWERTYUIOPASDFGHJKLZXCVBNM";
const lowerCase = "qwertyuiopasdfghjklzxcvbnm";
const numbers = "0123456789";
const symbols = "@!#$%^&*()_-+=/*-~{}[]";
const allChars = lowerCase + upperCase + numbers + symbols;

const upperCaseCheck = document.getElementById("upperCase");
const lowerCaseCheck = document.getElementById("lowerCase");
const symbolCheck = document.getElementById("symbols");
const numbersCheck = document.getElementById("numbers");

button.addEventListener('click', generatePassword);


function generatePassword(){

    let password = '';

    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];

    while(length > password.length){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    passwordInput.value = password;
}

function copyPassword(){
    navigator.clipboard.writeText(passwordInput.value);
  }