export function calculateProgressBar(calculateDeliveryProgress) {
  if(calculateDeliveryProgress <= 49){
    document.querySelector('.progress-label-preparing').classList.add('current-status');
  } else if(calculateDeliveryProgress > 49 && calculateDeliveryProgress <= 99){
    document.querySelector('.progress-label-shipped').classList.add('current-status');
  } else {
    document.querySelector('.progress-label-delivered').classList.add('current-status');
  }
}

export function calculateDeliveryTime(currentTime, orderTime, deliveryTime){
  const calculateDeliveryProgress = Math.abs(((currentTime.diff(orderTime))/orderTime.diff(deliveryTime))*100).toFixed();
  return calculateDeliveryProgress;
}