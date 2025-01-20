
let displayQR = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let input = document.getElementById("input");
let button = document.querySelector(".button");

button.addEventListener("click", generateQR);

function generateQR(){
  if (input.value.trim().length > 0){
    let qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;

    qrImage.src = qrApi;
    displayQR.classList.add("show-img")
  }else {
    input.value = '';
    input.classList.add("error");
    setTimeout(() => {
      input.classList.remove("error");
    }, 1000)
  }
}
 
