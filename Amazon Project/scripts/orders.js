import { orders } from "../data/orders.js";
import { getProduct, products, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  try{
    await loadProductsFetch();
    const value = await new Promise((resolve) => {
    loadCart(() => {
      resolve();
      });
    });

  } catch(error) {
    console.log('Unexpected error. Please try again later.');
  }

  let html = '';

  console.log(orders);

  orders.forEach(order => {

    const orderId = order.id;
    const orderDate = order.orderTime; // have to modify
    console.log(orderId , orderDate)

    const orderProducts = order.products;

    orderProducts.forEach(product => {
      
      const productId = product.productId;
      const deliveryDateProduct = product.estimatedDeliveryTime.split('T')[0];
      const formatedDeliveryDate = dayjs(deliveryDateProduct).format('MMMM D');
      console.log(formatedDeliveryDate)
      
      
      const quantity = product.quantity;
      
      let matchingProduct = getProduct(productId);
      

      html += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${formatedDeliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      `
    });

  });
}
loadPage();



