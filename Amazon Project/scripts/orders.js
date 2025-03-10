import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";


let html = '';

console.log(orders);

orders.forEach(order => {

  const orderId = order.id;
  const orderDate = order.orderTime; // have to modify
  console.log(orderId , orderDate)

  const products = order.products;
  products.forEach(product => {

    const productId = product.productId;
    const quantity = product.quantity;
    const matchingProduct = getProduct(productId);

    html += `
    <div class="product-image-container">
      <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
    </div>

    <div class="product-details">
      <div class="product-name">
        Black and Gray Athletic Cotton Socks - 6 Pairs
      </div>
      <div class="product-delivery-date">
        Arriving on: August 15
      </div>
      <div class="product-quantity">
        Quantity: 1
      </div>
      <button class="buy-again-button button-primary js-buy-again-button">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=123&productId=456">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
    `
  });
});

