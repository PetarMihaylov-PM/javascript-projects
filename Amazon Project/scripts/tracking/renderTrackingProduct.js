import { orders } from "../../data/orders.js";
import { getDate } from "../orders/getDate.js";
import { getProduct } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateProgressBar, calculateDeliveryTime } from "./progressBar.js";

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
  
    const [productDeliveryDate] = matchingProduct.estimatedDeliveryTime.split('T');
    const productQuantity = matchingProduct.quantity;


    const currentTime = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);
    const deliveryTime = matchingProduct.estimatedDeliveryTime;

    const calculateDeliveryProgress = calculateDeliveryTime(currentTime, orderTime, deliveryTime);
  
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
          <div class="progress-label-preparing">
            Preparing
          </div>
          <div class="progress-label-shipped">
            Shipped
          </div>
          <div class="progress-label-delivered">
            Delivered
          </div>
        </div>
  
        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${calculateDeliveryProgress}%"></div>
        </div>
      </div>
    `

    document.querySelector('.main').innerHTML = html;
    calculateProgressBar(calculateDeliveryProgress);
}