import { cart, removeFromCart, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";  
import { renderPaymentSummary } from "./paymentSummary.js";

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){

  let cartSummaryHTML = '';
  updateCartQuantity();

  cart.forEach(cartItem => {

    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
            <div class="cart-item-container
            js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                      ${cartItem.quantity}
                      </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-input link-primary js-save-link" data-product-id="${matchingProduct.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
    `;
  });

  function deliveryOptionsHTML (matchingProduct, cartItem) {
    let HTML = '';


    deliveryOptions.forEach(deliveryOption => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      HTML += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id=${deliveryOption.id}>
        <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    });
    return HTML;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link")
    .forEach(link => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantity();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll(".js-update-link")
      .forEach(link => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add("is-editing-quantity");
        });
      });

      document.querySelectorAll(".js-save-link")
      .forEach(link => {
        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        link.addEventListener('click', () => {
          handleUpdateQuantity(productId,quantityInput);
          renderPaymentSummary();
        });

        quantityInput.addEventListener('keydown', event => {
          if(event.key === "Enter"){
            handleUpdateQuantity(productId, quantityInput);
            renderPaymentSummary();
          }
        });
        
      });
  
      function handleUpdateQuantity(productId, quantityInput){
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

          container.classList.remove("is-editing-quantity");
          
          const newQuantity = Number(quantityInput.value);
          
          const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

          if(newQuantity > 0 && newQuantity < 1000) {
            cart.forEach(cartItem => {
              if(cartItem.productId === productId){
                cartItem.quantity = newQuantity;
                quantityLabel.innerHTML = newQuantity;
              }
            });
          } else {
            alert(`Quantity must be at least 1 and less than 1000`);
            return;
          }
          updateCartQuantity();
      }


      document.querySelectorAll('.js-delivery-option').
        forEach(element => {
          element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
          })
        });
};