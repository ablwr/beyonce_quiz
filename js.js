var quiz = [{
  "format": "1.33:1",
  "img": ["img/image002.png", "img/image004.png", "img/image005.png", "img/image006.png", "img/image007.png", "img/image08.png", "img/image009.png", "img/image016.png", "img/image15.png"]
  },
  {
    "format": "1.77:1",
    "img": ["img/image000.png", "img/image00.png", "img/image05.png", "img/image02.png", "img/image003.png", "img/image03.png", "img/image11.png", "img/image011.png", "img/image008.png", "img/image010.png", "img/image012.png", "img/image12.png", "img/image13.png", "img/image013.png", "img/image015.png", "img/image014.png"]
  },
  {
    "format": "2.2:1",
    "img": ["img/image04.png"]
  },
  {
    "format": "2.667:1",
    "img": ["img/image14.png", "img/image09.png", "img/image10.png"]
  },
  {
    "format": "2.48:1",
    "img": ["img/image07.png"]
  },
  {
    "format": "2.35:1",
    "img": ["img/image01.png"]
  },
  {
    "format": "3.5:1",
    "img": ["img/image06.png"]
  }
]

var content = $("content"),
    questionContainer = $("question"),
    choicesContainer = $("choices"),
    scoreContainer = $("score"),
    submitBtn = $("submit");

var numQuestion = 0,
    currentQuestion = Math.floor(Math.random()*quiz.length),
    score = 0,
    askingQuestion = true;

function $(id) {
  return document.getElementById(id);
}

function getImg() {
  randImg = Math.floor(Math.random()*quiz[currentQuestion]['img'].length);
  return quiz[currentQuestion]['img'][randImg];
}

function getNewQuestion(){
  currentQuestion = Math.floor(Math.random()*quiz.length);
}

function askQuestion() {
  var choicesHtml = "";
  for (var i = 0; i < quiz.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + numQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + quiz[i]['format'] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + quiz[i]['format'] + "</label>";
  }

  questionContainer.innerHTML = "<img src='" + getImg() + "'/>"
  choicesContainer.innerHTML = choicesHtml;
  if (numQuestion === 0) {
    scoreContainer.textContent = "Score: 0 right answers out of " +
      quiz.length + " possible.";
    submitBtn.textContent = "Submit Answer";
  }
}

function checkAnswer() {
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + numQuestion);

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        userpick = radios[i].value;
      }
      if (radios[i].value == quiz[currentQuestion]['format']) {
        correctIndex = i;
      }
    }

    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion]['format']) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }
    scoreContainer.textContent = "Score: " + score + " right answers out of " +
      quiz.length + " possible.";
  } else {
    askingQuestion = true;
    submitBtn.textContent = "Submit Answer";
    if (numQuestion < quiz.length - 1) {
      numQuestion++;
      getNewQuestion();
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h2>The quiz is over!</h2>" +
    "<h2>Below are your results:</h2>" +
    "<h2>" + score + " out of " + quiz.length + " questions. " +
    "</h2><h2> That's " +
    Math.round(score / quiz.length * 100) + "%.</h2>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
