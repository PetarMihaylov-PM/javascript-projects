import { orders } from "../../data/orders.js";
import { getDate } from "../orders/getDate.js";
import { getProduct } from "../../data/products.js";

export function renderTrackingProduct() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');


  let matchingOrder;
    orders.forEach(order => {
    if(order.id === orderId){
      matchingOrder = order;
    }
    });
  
    let matchingProduct;
    matchingOrder.products.forEach(product => {
      if(product.productId === productId){
        matchingProduct = product;
      }
    });
  
    const product = getProduct(productId);
    console.log(product)
  
    console.log(matchingProduct)
    const [productDeliveryDate] = matchingProduct.estimatedDeliveryTime.split('T');
    const productQuantity = matchingProduct.quantity;
  
    let html = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
  
        <div class="delivery-date">
          Arriving on ${getDate(productDeliveryDate)}
        </div>
  
        <div class="product-info">
          ${product.name}
        </div>
  
        <div class="product-info">
          Quantity: ${productQuantity}
        </div>
  
        <img class="product-image" src="${product.image}">
  
        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>
  
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `
      
    document.querySelector('.main').innerHTML = html;



}