
 
let prograssBar = document.getElementById('progress');
let song = document.getElementById('song');
let playPauseButton = document.getElementById('playPause');

playPauseButton.addEventListener('click', stopStart);

song.onloadedmetadata = function(){
  prograssBar.max = song.duration;
  prograssBar.value = song.currentTime;
}

function stopStart(){
  if(playPauseButton.classList.contains("fa-pause")){
    song.pause();
    playPauseButton.classList.remove("fa-pause"); 
    playPauseButton.classList.add("fa-play"); 
  }
  else{
    song.play();
    playPauseButton.classList.remove("fa-play"); 
    playPauseButton.classList.add("fa-pause"); 
  }
}