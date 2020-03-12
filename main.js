let score = 0;
let current = 0;

$(document).ready(function() {
  // start button event listener
  $(".start-button").click(function() {
    $(".start-page").hide();
    $(".next").hide();
    $(".questions").show();
    displayQuestion();
    $(".score").text("Current Score: " + score);
    console.log("Start Quiz button clicked");
  });

  $(".next-button").click(function(event) {
    console.log("Next button clicked");
    displayQuestion();
    $(".next").hide();
    $(".submit").show();
  });

  $(".submit-button").click(function(event) {
    event.preventDefault();
    let selected = $("input:checked");
    console.log(selected);
    console.log(event);
    if (selected.length) {
      let answer = selected.val();
      console.log(answer);
      checkAnswer(answer);
      console.log("hey world");
      $(".next").show();
      $(".submit").hide();
    } else {
      alert("Please select an answer");
    }
  });

  // retry button click listener
  $(".retry-button").click(function() {
    location.reload();
    console.log("Retake button clicked");
  });

  //click listener to make questions change color on hover
  $(".questions-selector").on("click", function(event) {
    $("input")
      .closest("div")
      .removeClass("selected");
    $("input:checked")
      .closest("div")
      .addClass("selected");
  });
});

//FUNCTIONS
function displayQuestion() {
  $(".question-number").text("Question Number: " + (current + 1) + "/10");
  $("input")
    .closest("div")
    .removeClass("selected");
  $("input").attr("disabled", false);
  if (current < myQuestions.length) {
    let listQuestion = myQuestions[current];
    $("h2").text(listQuestion.question);
    $(".questions-selector").html("");
    console.log(listQuestion.answers);
    for (let i = 0; i < listQuestion.answers.length; i++) {
      $(".questions-selector").append(
        `<div><label><input type="radio" clickable='true' class="answer" name="answer" id="answer${i +
          1}" value="${listQuestion.answers[i]}" tabindex="${i + 1}"/>${
          listQuestion.answers[i]
        }</label></div>`
      ); //To Do Modify this to use symantic form Tag
    }
  } else {
    // show summary that says how many you got correct
    displayScore();
  }
}

// function stub to check answer
function checkAnswer(answer) {
  $("input").attr("disabled", true);
  let listQuestion = myQuestions[current];
  if (listQuestion.answers[listQuestion.correct] == answer) {
    score++;
    $("input:checked")
      .closest("div")
      .addClass("correct");
    alert("Correct");
  } else {
    $("input:checked")
      .closest("div")
      .addClass("incorrect");
    alert(
      `I am sorry, the correct answer was ${
        listQuestion.answers[listQuestion.correct]
      }`
    );
  }
  $(".score").text("Current Score: " + score);
  current++;
}

//function to display score
function displayScore() {
  $(".questions").hide();
  $(".end-quiz").show();
  $(".end-score").text("Your score: " + score + "/10");
  if (score >= 5) {
    $(".comment").text("Well done!");
  } else {
    $(".comment").text("Better luck next time!");
  }
}
