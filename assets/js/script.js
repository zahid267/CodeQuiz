var introEl = document.getElementById("intro");
var startButton = document.getElementById("startBtn");
var resultEl = document.getElementById("result");
var questSectionEl = document.getElementById("questSection");
var questionEl = document.getElementById("question");
var ans1El = document.getElementById("ans1");
var ans2El = document.getElementById("ans2");
var ans3El = document.getElementById("ans3");
var ans4El = document.getElementById("ans4");
var messageEl = document.getElementById("message");
var scoredispEl = document.getElementById("scoredisp");
var questDisp = document.getElementById("questDisp");
var timerEl = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var saveScoreBtn = document.getElementById("saveBtn");
var scoreListEl = document.getElementById("score_list");
var liElement;

var myQuestion = {}
var answer = ""
var question1={
    question : "Commonly used data types DO NOT include:",
    options : ["strings","booleans","alerts","numbers"],
    answer : "alerts"
    }
  var question2={ 
    question : "String values must be enclosed within _______ when being assigned to variables.",
    options : ["commas","curly brackets","quotes","parenthases"],
    answer : "quotes"
  }
  var question3={
    question : "Avery useful tool used during development and debugging for printing content to the debugger is:",
    options : ["JavaScript","terminal/bash","for loop","console.log"],
    answer : "console.log"
  }
  var question4={
    question : "The condition in an if/else statement is enclpsed within ______",
    options : ["quotes","curly brackets","parentheses","square brackets"],
    answer : "curly brackets"
  }
  var question5={
    question : "Arrays in JavaScript can be used to store ______",
    options : ["numbers and strings","other arrays","booleans","all of the above"],
    answer : "all of the above"
    }
  var question6={
    question : "Which type of JavaScript language is ___",
    options : ["Object-Oriented","Object-Based","Assembly-language","High-level"],
    answer : "Object-Based"
  }
  var question7={
    question : "Which one of the following also known as Conditional Expression:",
    options : ["Alternative to if-else","Switch statement","If-then-else statement","immediate if"],
    answer : "immediate if"
  }
  var question8={
    question : "When interpreter encounters an empty statements, what it will do:",
    options : ["Shows a warning","Prompts to complete the statement","Throws an error","Ignores the statements"],
    answer : "Ignores the statements"
  }
  var question9={
    question : "The 'function' and 'var' are known as:",
    options : ["Keywords","Data types","Declaration statements","Prototypes"],
    answer : "Declaration statements"
  }
  var question10={
    question : "In the JavaScript, which one of the following is not considered as an error:",
    options : ["Syntax error","Missing of semicolons","Division by zero","Missing of Bracket"],
    answer : "Division by zero"
  }

    var totQuestions = 10; var qcnt = 1;
    var winCounter = 0; var loseCounter = 0;  var timerCount = 100; /// 10 seeconds per question
    var gameOver = false;
    var questDone = false;
    var score = 0
startButton.addEventListener("click", startQuiz);

function startQuiz(event){
  event.preventDefault();
  clearQuestion();
  introEl.className = "hide";
  questSectionEl.className = "show";
  qcnt = 1; gameOver = false; score = 0
    questDone = false
    timerCount = 100;   //// 100 seconds -- 10 seconds per question
    timerEl.textContent = timerCount;
    startTimer();
    displayQuestion(qcnt);
  //console.log("tot-quest : " + totquest);
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  var timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if game end condition is met
      if (gameOver && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        showResult();
      }else if(questDone && qcnt <= totQuestions){
        qcnt++;
        questDone = false;
        messageEl.textContent = "";
        messageEl.className = "";
        displayQuestion(qcnt);
      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      gameOver = true;
      showResult()
    }
  }, 1000);
}

questDisp.addEventListener('click',function(event){
  if(event.target.tagName.toLowerCase() === "li" && questDone === false){
    if(event.target.textContent === answer){
      event.target.className = "selectedR";
      messageEl.textContent = "CORRECT";
      messageEl.className = "rightAnswer"
      score = score + 10;
    }else{
      event.target.className = "selectedW";
      messageEl.textContent = "WRONG";
      messageEl.className = "wrongAnswer";
      timerCount = timerCount - 10;
    }
    questDone = true;
    if(qcnt >= totQuestions){gameOver = true}
  }
});
function displayQuestion(myCnt){
  clearQuestion();
  myQuestion = eval("question"+myCnt);
  questionEl.textContent = myQuestion.question;
  ans1El.textContent = myQuestion.options[0];
  ans2El.textContent = myQuestion.options[1];
  ans3El.textContent = myQuestion.options[2];
  ans4El.textContent = myQuestion.options[3];
  answer = myQuestion.answer;
}
function clearQuestion(){
  questionEl.textContent = "";
  ans1El.textContent = "";
  ans2El.textContent = "";
  ans3El.textContent = "";
  ans4El.textContent = "";
  ans1El.className = "";
  ans2El.className = "";
  ans3El.className = "";
  ans4El.className = "";
  messageEl.textContent = "";
  messageEl.className = "";
  answer = "";
}
function showResult(){
  questSectionEl.className = "hide";
  resultEl.className = "show";
  scoreEl.textContent = score;

}
saveScoreBtn.addEventListener("click", function(){
  var init = document.getElementById('initial').value;
  if(init != ""){
    localStorage.setItem("totalScore",score);
    localStorage.setItem("Initials", init);
    var highscore = localStorage.getItem("HighScore");
    if(highscore === ""){highscore = 0}
    if(highscore < score){highscore = score}
    localStorage.setItem("HighScore",highscore);
    liElement = document.createElement("li");
    liElement.textContent = init + " : "+score
    scoreListEl.append(liElement);
    showHighscore();
  }
});

function showHighscore(){
  introEl.className = "hide";
  var hscore = localStorage.getItem("HighScore");
  if(document.getElementById('HighScore') && hscore !== "" && hscore > 0){
    document.getElementById('HighScore').textContent = hscore;
  }
  resultEl.className = "hide";
  scoredispEl.className = "show";
}
document.getElementById("go_back").addEventListener('click', function(){
  scoredispEl.className = "hide";
  introEl.className = "show";
});
document.getElementById("clear_score").addEventListener('click', function(){
  localStorage.setItem("totalScore","");
  localStorage.setItem("Initials", "");
  localStorage.setItem("HighScore", "");
  document.getElementById('HighScore').textContent = "";
  scoreListEl.innerHTML = "";
  document.getElementById("go_back").click();
});
