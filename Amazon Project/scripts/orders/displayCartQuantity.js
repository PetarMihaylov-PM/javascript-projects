import { calculateCartQuantity } from "../../data/cart.js";

export function displayCartQuantity(){
  document.querySelector('.js-orders-cart-quantity').innerHTML = calculateCartQuantity();
}