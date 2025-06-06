const buttonColors = ['red', 'green', 'yellow', 'blue'];
let gamePattern = [];
let userPattern = [];
let gameOn = false;
let level = 0;


  $(document).keydown(() => { 
    if(!gameOn){
      $('#level-title').html('Level ' + level)
      $('#level-title').removeClass('animation');
      nextMove();
      gameOn = true;
    }
  });

$('.btn').click(function () {
  const userSelectedButton = $(this).attr("id");
  userPattern.push(userSelectedButton);

  playSound(userSelectedButton);
  animatePress(userSelectedButton);

  checkAnswer(userPattern.length - 1);
  console.log(userPattern);
});

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

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    if(gamePattern.length === userPattern.length) {
      setTimeout(function () {
        nextMove();
      },1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    $('#level-title').text('Game Over! Press any key to restart.');
    $('#level-title').addClass('animation');

    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 300);

    startOver();
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

function getRandomIndex(){
  return Math.floor(Math.random() * 4);
}