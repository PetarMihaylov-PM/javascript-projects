const buttons = document.querySelectorAll('.drum');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const key = this.innerHTML;

    addAnimation(key);
    makeSound(key);
  });
});

document.addEventListener('keydown', function(event) {
  makeSound(event.key);
  addAnimation(event.key);
});


function makeSound(key) {
  switch (key) {
    case 'w': 
      const tone = new Audio('sounds/crash.mp3');
      tone.play();
      break;

    case 'a': 
      const tone2 = new Audio('sounds/kick-bass.mp3');
      tone2.play();
      break;
      
    case 's': 
      const tone3 = new Audio('sounds/snare.mp3');
      tone3.play();
      break;

    case 'd': 
      const tone4 = new Audio('sounds/tom-1.mp3');
      tone4.play();
      break;

    case 'j': 
      const tone5 = new Audio('sounds/tom-2.mp3');
      tone5.play();
      break;

    case 'k': 
      const tone6 = new Audio('sounds/tom-3.mp3');
      tone6.play();
      break;

    case 'l': 
      const tone7 = new Audio('sounds/tom-4.mp3');
      tone7.play();
      break;
  }
}



function addAnimation(key) {
  const currentKey = document.querySelector(`.${key}`);
  currentKey.classList.add("pressed");
  
  setTimeout(() => {
    currentKey.classList.remove("pressed");
  }, 100);
  
}