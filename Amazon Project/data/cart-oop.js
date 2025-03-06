const cart = {
  cartItems: undefined,
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
  
    if(!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  },

  saveToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  addToCart(productId){
    let matchingItem;

    this.cartItems.forEach(cartItem => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += 1
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }
}

loadFromStorage();







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