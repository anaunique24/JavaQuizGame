// create questionslist : question string, options, correct ans
var questions = [{
    title: "Which of the following is not a data type?",
    choices: ["number", "boolean", "prompt", "string"],
    correctAnswer: "prompt"
  }, {
    title: "Arrays in JavaScript can be used to store ______.",
    choices: ["numbers and strings", "a number", "booleans", "all the above"],
    correctAnswer: "all the above"
  }, {
    title: "What does JS stand for?",
    choices: ["jazz sounds", "juicy salad", "JavaScript", "jolly sunday"],
    correctAnswer: "JavaScript"
  }, { 
    title: "What does Javascript do?",
    choices: ["It's a coffee maker, duh.", "Sir, this is a Wendy's.", "Adds functionality to websites", "Your mother was working the bonbon concession at the Eiffel Tower."],
    correctAnswer: "Adds functionality to websites"
}];


// create question counter = 0
let questionIndex = 0;


// Click on start button(attach event listener)
let startScreenEl = document.querySelector('#start-screen');
let startQuestionEl = document.querySelector('#question-screen');
let startEndEL = document.querySelector('#end-screen');
let startBtn = document.querySelector('#start-button');
let titleEl = document.querySelector('#title');
let choicesEl = document.querySelector('#choices');
let timerEl = document.querySelector('#timer');
let timer;
let timerCount;
let quizScore = 0;

startScreenEl.setAttribute('class', 'reveal');
startQuestionEl.setAttribute('class', 'hidden');
startEndEL.setAttribute('class', 'hidden');
timerEl.setAttribute('class', 'countdown');

function startQuiz() {
    timerCount = 30;
    startScreenEl.setAttribute('class', 'hidden');
    startQuestionEl.setAttribute('class', 'reveal');
    generateQuestions();
    beginTimer(); 
};

//   start timer from 75 secs
  //     every sec time is going to decrement
function beginTimer() {
    timer = setInterval(function(){
      timerCount--;
      timerEl.textContent = timerCount;
      if(timerCount <= 0){
        clearInterval(timer);
        lostGame();
      };
    },1000);
  }
   
function lostGame() {
    localStorage.setItem("recentScore", quizScore)
};

   //    show 1st question with options(function)
function generateQuestions() {
    let currentQuestion = questions[questionIndex]
    
    titleEl.textContent = currentQuestion.title 

    choicesEl.innerHTML = "";

    for (let i = 0; i < 4; i++) { // this will set a loop for 4 times
        let tempBtn = document.createElement("button");
        tempBtn.textContent = currentQuestion.choices[i]; 
        tempBtn.setAttribute('class', 'question-box');
        tempBtn.setAttribute("id", currentQuestion.choices[i])
      
        tempBtn.onclick = validateAnswer//run the validateAnswer function
        choicesEl.appendChild(tempBtn) //this will append to the Dom
      }
      if (currentQuestion === 0){
        endQuiz();
    };
};
 // check if ans click by user matches with correct ans for question
//        display correct msg
//        check if we have time
//          if question counter < length of question array
//             increment the question counter 
//                  go to next question
    
 function validateAnswer(){
      if (this.id !== questions[questionIndex].correctAnswer){
        alert("Wrong");
        console.log('this is the id', this.id);
        subtractQuizTimer();
      }else {
        alert("Correct!");
        quizScore += "";
        console.log('score so far', quizScore);
      };
      questionIndex++;
      if (questionIndex >= questions.length){
        endQuiz();
      } else {
        generateQuestions();
    };
};
    
function endQuiz() {
        startQuestionEl.setAttribute('class', 'hidden');
        startEndEL.setAttribute('class', 'reveal');
        localStorage.setItem("recentScore", quizScore);
        clearInterval(timer)
};
      
function subtractQuizTimer() {
    timerCount -= 10;
}


// else || if(timer === 0)
//   stop timer and grab the last sec left
//   display the score
//   form is going to take user initial and score and save it in local storage and display it on second html page.
var startButton = document.querySelector("#startButton");
var endButton = document.querySelector('#end-screen');
var initials = document.querySelector('#initials');
var initialsButton = document.querySelector('#initials-button');
var hiscores = document.querySelector('#high-scores');
var userData = JSON.parse(localStorage.getItem("high-scores")) || [];

initialsButton.addEventListener("click", function(){
    // localStorage.setItem("Initials", initials);
    // localStorage.setItem("recentScore", quizScore);
    
    var Player = {
      initials:initials.value, 
      score:quizScore,
    };

    console.log(Player);
    userData.push(Player);

    localStorage.setItem("high-scores", JSON.stringify(userData));
    for (let i = 0; i < userData.length; i++) {
      var p = document.createElement('p')
      p.textContent = "Player: " + userData[i].initials + " Score: " + userData[i].score; 
      hiscores.append(p)
      
    };
  });
  
  startBtn.onclick = startQuiz;