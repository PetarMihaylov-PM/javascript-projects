import { orders } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDate } from "./getDate.js";


export function renderPlacedOrders(){
    let ordersHtml = ``;

    orders.forEach(order => {
    
      let productsHtml = ``;
      const orderId = order.id;
      const orderDate = getDate(order.orderTime);
      const totalCostCents = order.totalCostCents;

      const orderProducts = order.products;

      orderProducts.forEach(product => {
        
        const productId = product.productId;
        const [deliveryDateProduct] = product.estimatedDeliveryTime.split('T');
        
        const quantity = product.quantity;
        
        let matchingProduct = getProduct(productId);

        productsHtml += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${getDate(deliveryDateProduct)}
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
        </div>
        `
      });

      ordersHtml += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        ${productsHtml}

      </div>
      `
    });

    document.querySelector('.orders-grid').innerHTML = ordersHtml;
  }