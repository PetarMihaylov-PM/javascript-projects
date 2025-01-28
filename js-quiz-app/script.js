

const questionsData = [
    {
        question: "How many bones are there in the adult human body?",
        answers: [
            { text: "186", correct: false},
            { text: "206", correct: true},
            { text: "226", correct: false},
            { text: "246", correct: false}
        ]
    }, 
    {
        question: "What is the gestation period of a rabbit?",
        answers: [
            { text: "50-55 days", correct: false},
            { text: "60-65 days", correct: false},
            { text: "40-45 days", correct: false},
            { text: "28-31 days", correct: true}
        ]
    },
    {
        question: 'Which spice is known as "queen of spices"?',
        answers: [
            { text: "Cinnamon", correct: false},
            { text: "Cardamom", correct: true},
            { text: "Black pepper", correct: false},
            { text: "Nutmeg", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false}
        ]
    },
    {
        question: "Which breed of dog is known for its excellent sense of smell and tracking abilities?",
        answers: [
            { text: "Golden Retriever", correct: false},
            { text: "German Shepherd", correct: false},
            { text: "Bloodhound", correct: true},
            { text: "Bulldog", correct: false}
        ]
    },
    {
        question: "What part of the brain is responsible for memory and learning?",
        answers: [
            { text: "Medulla oblongata", correct: false},
            { text: "Hippocampus", correct: true},
            { text: "Hypothalamus", correct: false},
            { text: "Cerebellum", correct: false}
        ]
    },
    {
        question: "What is a traditional serving size of an Italian espresso?",
        answers: [
            { text: "1 oz", correct: true},
            { text: "2 oz", correct: false},
            { text: "3 oz", correct: false},
            { text: "4 oz", correct: false}
        ]
    },
    {
        question: "What is the main function of red blood cells?",
        answers: [
            { text: "Regulating body temperature", correct: false},
            { text: "Fighting infections", correct: false},
            { text: "Clotting blood", correct: false},
            { text: "Carrying oxygen", correct: true}
        ]
    },
    {
        question: "What is the title of the first Harry Potter book in the UK?",
        answers: [
            { text: "Harry Potter and the Philosopher's Stone", correct: true},
            { text: "Harry Potter and the Prisoner of Azkaban", correct: false},
            { text: "Harry Potter and the Chamber of Secrets", correct: false},
            { text: "Harry Potter and the Sorcerer's Stone", correct: false}
        ]
    },
    {
        question: 'Who created the fictional detective "Sherlock Holmes"?',
        answers: [
            { text: "Dashiell Hammett", correct: false},
            { text: "Raymond Chandler", correct: false},
            { text: "Agatha Christie", correct: false},
            { text: "Arthur Conan Doyle", correct: true}
        ]
    }
];
const questionElement = document.querySelector(".question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.querySelector(".nextButton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questionsData[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event){
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect){
        selectedButton.classList.add('correct');
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questionsData.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questionsData.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questionsData.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();