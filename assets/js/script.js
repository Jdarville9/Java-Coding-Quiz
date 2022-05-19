// Query Selectors
var quizEl = document.querySelector("#start-quiz");
var answerEl = document.querySelector("#answers");
var submitScoreEl = document.querySelector("#submit-score");
var initialsEl = document.querySelector("#user-initials");
var showQuestionBlock = document.querySelector("#inner-block");
var hideStartMenu = document.querySelector("#quiz-intro");
var showQuestionBlock = document.querySelector("#inner-block");
var questionEl = document.querySelector("#question");
var timerEl = document.querySelector("#timer");
var buttonClick = document.querySelector("#submit-score");
var finishQuiz = document.querySelector("#finish-quiz")
var pointsScored = document.querySelector("#points-scored")

var playerInit;

// TIMER STUFF
var startingTime = 100;
var countDown;

var timer = function() {

    countDown = setInterval (()=> {
        startingTime--;

        if (startingTime >= 0) {
            timerEl.innerText = startingTime
        } else {
            clearInterval(startingTime);
            highScore();
        }
    },1000)
}
// END TIMER STUFF

var quizData = [
    {
        question: "What is JavaScript?",
        answers: [
            "An online streaming service.",
            "An object-oriented computer programming language commonly used to create interactive effects within web browsers.",
            "A standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.",
            "A popular coffe shop located in Central Park",],
        correct: "An object-oriented computer programming language commonly used to create interactive effects within web browsers.",

    },
    {
        question: "Which html element is used to link a JavaScript source?",
        answers: ["<link>", ".js", "src ''", "<script>",],
        correct: "<script>",
    },
    {
        question: "Which document method will return the first element within the document that matches a specified selector, or group of selectors?",
        answers: [".window.alert()", ".querySelector()", ".addEventListener()", ".createElement()",],
        correct: ".querySelector()",
    },
    {
        question: "Which of these is not a recoginzed value in JS",
        answers: ["String", "Number", "Boolean", "Quote",],
        correct: "Quote",
    },
];

function start() {
    timer();
    currentQuestion = 0;
    hideStartMenu.classList.add("hide");
    showQuestionBlock.classList.remove("hide");
    loadQuestions();
}

var loadQuestions = function() {
    questionEl.textContent = quizData[currentQuestion].question;
    var answers = quizData[currentQuestion].answers;
    answerEl.innerHTML = "";

    for(var i = 0; i < answers.length; i++) {
        const option = answers[i];
        var answerOption = document.createElement("button");
        answerOption.textContent = option;
        answerOption.classList.add("question-option");
        answerOption.addEventListener("click", check)
        answerEl.appendChild(answerOption)
    }
}

var check = function(event) {
    var answerChoice = event.target;
    var correctAnswer = answerChoice.innerText === quizData[currentQuestion].correct;

    if (!correctAnswer) {
        startingTime = startingTime - 10;
        alert("Awe, that was a lame answer. 10 seconds off Time Left")
    } else {
        alert("You Rock!!");
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestions();
    } 
    else {
        submitScore();
    }
}

var submitScore = function() {
    clearInterval(countDown);
    timerEl.innerText = "000"

    showQuestionBlock.classList.add("hide");
    finishQuiz.classList.remove("hide");
    pointsScored.innerText = startingTime;
}

var viewScores = function() {
    finishQuiz.classList.add("hide");

    var saveScores = function() {
        localStorage.setItem("storeHighScore", JSON.stringify(storeHighScore))
    }

    var loadScores = function() {
    }

    var enterInit = document.querySelector("#enter-initials").value
    if (enterInit.length === 3) {
        var scoreLi = document.querySelector("#player-info")
        var listItemEl = document.createElement("p")
        listItemEl.innerText = enterInit + " scored " + pointsScored.innerText + " points!";
        var storeHighScore = listItemEl.innerText
        scoreLi.appendChild(listItemEl)
        console.log("Checking High Scores")

        var scorePage = document.querySelector("#high-scores")
        scorePage.classList.remove("hide");

        saveScores();

    } else {
        alert("The quiz Gods DEMAND that you enter only 3 characters. No more, no less!")
        document.querySelector("#enter-initials").value = ""
        submitScore()
    }
}

// Event Listeners
buttonClick.addEventListener("click", viewScores);
quizEl.addEventListener("click", start);