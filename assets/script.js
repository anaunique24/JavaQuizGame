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
    timerCount = 75;
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
    },7500);
  }
   
  function lostGame() {
    localStorage.setItem("recentScore", quizScore)
   }

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
    
    
