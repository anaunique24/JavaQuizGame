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
