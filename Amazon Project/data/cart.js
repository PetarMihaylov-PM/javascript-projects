export const cart = [];

export function addToCart(productId){
  
  let matchingItem;

      cart.forEach(cartItem => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      let quantitySelectorValue = document.querySelector(`.js-quantity-selector-${productId}`).value;

      if(matchingItem){
        matchingItem.quantity += Number(quantitySelectorValue);
      } else {
        cart.push({
          productId: productId,
          quantity: Number(quantitySelectorValue)
        });
      }
}