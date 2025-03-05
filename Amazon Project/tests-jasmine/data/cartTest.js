import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Test suit: addToCart', () => {
  it('adds an existing product to the cart', () => {

  });

  it('adds an new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    
    loadFromStorage();
    
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
  });
});