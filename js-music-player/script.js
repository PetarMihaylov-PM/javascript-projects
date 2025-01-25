
 
let prograssBar = document.getElementById('progress');
let song = document.getElementById('song');
let playPauseButton = document.getElementById('playPause');
let icon = document.getElementById('icon');

playPauseButton.addEventListener('click', stopStart);

song.onloadedmetadata = function(){
  prograssBar.max = song.duration;
  prograssBar.value = song.currentTime;
}

function stopStart(){
  if(icon.classList.contains("fa-pause")){
    song.pause();
    icon.classList.remove("fa-pause"); 
    icon.classList.add("fa-play"); 
  }
  else{
    song.play();
    if(song.play()){
      setInterval(() => {
        prograssBar.value = song.currentTime;
      },250)
    }
    icon.classList.remove("fa-play"); 
    icon.classList.add("fa-pause"); 
  }
}



prograssBar.onchange = function(){
  song.play();
  song.currentTime = prograssBar.value;
  icon.classList.remove("fa-play"); 
  icon.classList.add("fa-pause"); 
}