const buttonColors = ['red', 'green', 'yellow', 'blue'];
let gamePattern = [];
let userPattern = [];
let gameOn = false;
let level = 0;


  $(document).keydown(() => { 
    if(!gameOn){
      $('#level-title').html('Level ' + level)
      nextMove();
      gameOn = true;
    }
  });

$('.btn').click(function () {
  const userSelectedButton = $(this).attr("id");
  userPattern.push(userSelectedButton);

  playSound(userSelectedButton);
  animatePress(userSelectedButton);
  console.log(userPattern);
});

function getRandomIndex(){
  const randomNum = Math.floor(Math.random() * 4);
  return randomNum;
}

function nextMove() {
  userPattern = [];
  level++;
  $('#level-title').html('Level ' + level);
  
  const randomNumber = getRandomIndex();
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(userPattern) {
  if(gamePattern[level] === userPattern[level]){
    if(gamePattern.length === userPattern.length) {
      setTimeout(()=> {

      },1000);
    }
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gameOn = false;
  gamePattern = [];
}