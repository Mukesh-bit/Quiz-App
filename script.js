// Quiz Questions
const quiz = [
    {
        question: "Which of the following is not a CSS box model property",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-radius"
    },
    {
        question: "The full form of CSS is",
        choices: ["Cascading Style Sheets", "Coloured Special Sheets", "Color and Style Sheets", "None of the above"],
        answer: "Cascading Style Sheets" 
    },
    {
        question: "How can we change the background color of an element?",
        choices: ["background-color", "color", "both A and B", "None of the above"],
        answer: "background-color" 
    },
    {
        question: "In how many ways can CSS be written in?",
        choices: ["1", "2", "3", "4"],
        answer: "3" 
    }
]

const questionElement = document.getElementById('question');
const answerBtn = document.getElementById('answer-btn');
const nextBtn = document.getElementById('next-btn');
const scoreCard = document.querySelector(".scoreCard")
const alert = document.querySelector(".alert");
const startBtn = document.querySelector('.startBtn');
const app = document.querySelector('.app');
const timer = document.querySelector('.timer');

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 10;
let timerID = null;



// function to show Question
const showQuestion = () => {
    const currentQuestion = quiz[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber} . ${currentQuestion.question}`;

    answerBtn.innerHTML = "";

    // show the Answers
    for(let i = 0; i<currentQuestion.choices.length; i++){
        const currentAnswers = currentQuestion.choices[i];
        const button = document.createElement("button");
        button.classList.add("btn")
        button.innerHTML = currentAnswers;
        answerBtn.appendChild(button);

        button.addEventListener('click', () => {
            if(button.classList.contains('selected')){
                button.classList.remove('selected');
            }else {
                button.classList.add("selected");
            }
        })
    }

    if(currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to Start Timer
const startTimer = () => {

    clearInterval(timerID);
    timer.innerHTML = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.innerHTML = timeLeft;

        if(timeLeft === 0) {
            const confirmUser = confirm("Time up!!! Do You Want To Play Again");
            if(confirmUser) {
                timeLeft = 10;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                app.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000)
}

// Function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
}

// function to start Quiz
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    timeLeft = 10;
    timer.style.display = "flex";
    showQuestion();
}

// function to start quiz
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    app.style.display = "block";
    timeLeft = 10;
    startQuiz();
})

// function to check answer
const checkAnswer = () => {
    const selectedAnswer = document.querySelector(".btn.selected");
    if(selectedAnswer.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct Answer")
        score++ ;
    }else{
        displayAlert("Wrong Answer");
    }

    timeLeft = 10;

    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length) {
        showQuestion();
    }else{
        stopTimer();
        showScore();
        timer.style.display = "none";
    }
}

// Function to Show Score
const showScore = () => {
    stopTimer();
    questionElement.innerHTML = "";
    answerBtn.innerHTML = "";
    scoreCard.innerHTML = `You Scored ${score} out of ${quiz.length}`;
    displayAlert("You have completed this Quiz");
    nextBtn.innerHTML = "Play Again";
    quizOver = true;
    
}

// function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.innerHTML = msg;
    setTimeout(() => {
        alert.style.display = "none"
    }, 2000);
}

// next question show whenever click on next button
nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector(".btn.selected");
    if(!selectedChoice && nextBtn.innerHTML === "Next"){
        displayAlert("Select your answer")
        return;
    }
    if(quizOver) {
        nextBtn.innerHTML = "Next";
        scoreCard.innerHTML = "";
        currentQuestionIndex = 0;
        showQuestion();
        quizOver = false;
        score = 0;
        startQuiz();
    }
    
    else {
        checkAnswer();
    }
    
});

