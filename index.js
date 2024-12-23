const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Dublin", correct: false }
        ]
    },

    {
        question: "What is the capital of Ireland?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: false },
            { text: "Dublin", correct: true }
        ]
    },

    {
        question: "What is the capital of England?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: true },
            { text: "Paris", correct: false },
            { text: "Dublin", correct: false }
        ]
    },

    {
        question: "What is the capital of the USA?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Washington DC", correct: true },
            { text: "Dublin", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answerBtn");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    let selectedButton = e.target;
    let isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerText = `You answered ${score} out of ${questions.length} questions correctly`;
        nextButton.innerHTML = "Restart";
        nextButton.style.display = "block";
    }
}

nextButton.addEventListener("click", () => {
if(currentQuestionIndex < questions.length) {
    handleNextButton();
}else{
    startQuiz();
}
});


    startQuiz();