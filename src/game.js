//variables
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level;

//waiting for the key A to be pressed to start the game start is a value so that any wrong presse dosen't innterput the game
$(document).keydown(function(e) {
  if (!start) {
    start = true;
    nextSequence();
    level = 0;
    $("#level-title").text("Level " + level);

  }

});
// function that get triggerd after clicking button this function play the button correspond sound and check for the user sequence
$(".btn").click(function() {
  //remembre that if you use jQuery you should put this bettween ()
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
// we send the laset value of our small arry (user array) to be chaked withe the big array the random generated one
// every time we check the laste user value with the random array value that have the same index
  checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {

  if (gamePattern[index] === userClickedPattern[index]) {
    //we waite untiel the sequence end than we call for the new item in the sequence;

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    gameOver();
  }
}


function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press any key to restart");
  level = 0;
  gamePattern = [];
  start = false;
}
