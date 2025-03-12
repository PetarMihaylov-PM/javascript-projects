import { loadProductsFetch } from "../data/products.js";
import { renderTrackingProduct } from "./tracking/renderTrackingProduct.js";
import { calculateCartQuantity } from "../data/cart.js";

async function loadPage() {
  try{
    await loadProductsFetch();

  } catch(error) {
    console.log('Unexpected error. Please try again later.');
  }
calculateCartQuantity();
renderTrackingProduct();
}
loadPage();

