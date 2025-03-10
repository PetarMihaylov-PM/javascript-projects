import { loadProductsFetch } from "../data/products.js";
import { renderPlacedOrders } from "./orders/renderPlacedOrders.js";


async function loadPage() {
  try{
    await loadProductsFetch();

  } catch(error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderPlacedOrders();
}
loadPage();





