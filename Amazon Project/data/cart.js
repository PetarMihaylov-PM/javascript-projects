export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  
  let matchingItem;

      cart.forEach(cartItem => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      if(matchingItem){
        matchingItem.quantity += 1
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
      cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateCartQuantity () {
  document.querySelector(".js-checkout-cart-quantity").innerHTML = calculateCartQuantity();
  saveToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export function clearCart() {
  cart = [];
  saveToStorage();
}
