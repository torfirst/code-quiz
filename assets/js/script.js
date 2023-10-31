// list of questions and choices
var questions = [{
  question: 'Commonly used data types DO NOT include:',
  choices: ['strings', 'booleans', 'alerts', 'numbers'],
  correctAnswer: 'alerts',
}, {
  question: 'The condition in an if/else statement is enclosed within _____.',
  choices: ['parenthesis', 'curly brackets', 'quotes', 'square brackets'],
  correctAnswer: 'parenthesis',
}, {
  question: 'Arrays in JavaScript can be used to store:',
  choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
  correctAnswer: 'all of the above',
}, {
  question: 'String values must be enclosed within ____ when being assigned to variables.',
  choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
  correctAnswer: 'quotes',
}, {
  question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
  choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
  correctAnswer: 'console.log',
}]

var score = 0;
var timer = document.getElementById('timer');
var timerCount;
var introDiv = document.querySelector('.quiz-intro');
var quizContainer = document.getElementById('quiz-container');
var questionTextEl = document.getElementById('question');
var choiceButtons = document.getElementById('choice-buttons');
var currentQuestionIndex = 0;
var submitHighScoresView = document.getElementById('high-scores');
var highScoresListView = document.getElementById('high-scores-list');
if ( JSON.parse(localStorage.getItem('highScores'))  === null ) {
  localStorage.setItem('highScores', JSON.stringify([]));
}
var highScores = JSON.parse(localStorage.getItem('highScores')); // defines high score array for display usage and adding to
var startBtn = document.querySelector('.start-quiz');
var submitBtn = document.querySelector('submit-highscore');

// Add event listener to start button
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  timerCount = 60;
  startTimer();
  document.getElementById("highscores").classList.add("hide"); //disables the "view high scores" button during the quiz
  introDiv.classList.add('hide');
  quizContainer.classList.remove('hide');
  displayNextQuestion();
}

function displayNextQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionTextEl.textContent = currentQuestion.question;
  var questionChoices = currentQuestion.choices;
  choiceButtons.innerHTML = ''; // clear old choice buttons

  for (var i = 0; i < questionChoices.length; i++) {
    var currentChoice = questionChoices[i];
    var button = document.createElement('button');
    button.textContent = currentChoice;
    button.setAttribute('onclick', `checkAnswer(${currentQuestionIndex}, '${currentChoice}')`); // onclick calls the checkAnswer function and passes currentQuestionIndex and currentChoice as the parameters
    button.classList.add("answer-styles");
    choiceButtons.append(button);
  }
}

function checkAnswer(questionIndex, questionChoice) {
  var answerFeedback = document.getElementById('answer-feedback');
  if (questions[questionIndex].correctAnswer === questionChoice) {
    score = score + 10;
    answerFeedback.innerHTML = 'Correct!';
    currentQuestionIndex = questionIndex + 1;
  } else {
    timerCount = timerCount - 10;
    answerFeedback.innerHTML = 'Wrong!'
    currentQuestionIndex = questionIndex + 1;
    if (score > 0) {
      score = score - 10;
    } else if (score < 0) {
      score = 0;
    }
  }

  setInterval(function () {
    answerFeedback.innerHTML = '';
  }, 1500)

  if (currentQuestionIndex <= questions.length - 1) {
    displayNextQuestion();
  } else {
    clearInterval(timerInterval);
    timerCount = 0;
    timer.textContent = timerCount.toString(); 
    viewSubmitScore();
  }
}

function viewSubmitScore() {
  // do nothing show add high score button
  submitHighScoresView.classList.remove('hide');
  // hides questions
  quizContainer.classList.add('hide');
  document.getElementById('score-value').innerHTML = score;
}

function submitHighScore() {
  document.getElementById("highscores").classList.remove("hide");
  highScores.push({
    initials: document.getElementById('initials').value.toString(),
    score
  });

  score = 0; // resets score back to 0
  
  // disable submit button to prevent users from entering an empty value for initials
  if (initials.value === "") {
    submitBtn.disabled = true;
  }

  // sorts the scores 
  highScores = highScores.sort((a, b) => b.score - a.score)
  // converts high score to a string
  localStorage.setItem('highScores', JSON.stringify(highScores));
  // go to high scores view
  showHighScores();
}

// after submitting view high scores
function showHighScores() {
  submitHighScoresView.classList.add('hide');
  highScoresListView.classList.remove('hide');
  var storedHighScores = JSON.parse(localStorage.getItem('highScores'));
  var scoreList = document.getElementById('score-list'); // the ol 
  
  storedHighScores.forEach(score => {
    var li = document.createElement('li');
    li.textContent = `${score.initials} - ${score.score}`;
    scoreList.append(li);
  });

  currentQuestionIndex = 0; // resets the current question index
  document.getElementById('initials').value = ''; // resets initials text
}

function goBack() {
  var scoreList = document.getElementById('score-list');
  scoreList.innerHTML = ''; // resets high score list view
  introDiv.classList.remove('hide');
  highScoresListView.classList.add('hide');
  var mainView = document.getElementById('main-view-container');
  mainView.classList.remove('hide');
}

function clearHighScores() {
  localStorage.setItem('highScores', JSON.stringify([])); // clears local storage array
  var scoreList = document.getElementById('score-list');
  scoreList.innerHTML = ''; // resets high score list view
  highScores = []; // clears variable
}

// main menu view high scores 
function viewHighScores() {
  document.getElementById('score-list').innerHTML = ''; // prevents users from spam clicking and causing the high scores to duplicate
  var mainView = document.getElementById('main-view-container');
  mainView.classList.add('hide');

  var scoreList = document.getElementById('score-list'); // the ol 
  highScoresListView.classList.remove('hide');
  var storedHighScores = JSON.parse(localStorage.getItem('highScores'));

  storedHighScores.forEach(score => {
    var li = document.createElement('li');
    li.textContent = `${score.initials} - ${score.score}`;
    scoreList.append(li); // adds the high scores + initials to the ol as list items
  });

  currentQuestionIndex = 0; // resets the current question index
  document.getElementById('initials').value = ''; // resets initials text
}

function startTimer() {
  // Sets timer
  timerInterval = setInterval(function () {
    if (timerCount > 0) {
      // update the counter on top right view
      timerCount--;
      timer.textContent = timerCount.toString();
    }
    // tests if time has run out
    if (timerCount === 0) {
      // clears interval
      clearInterval(timerInterval);
      // go to submit highscore
      viewSubmitScore();
    }
  }, 1000);
}
