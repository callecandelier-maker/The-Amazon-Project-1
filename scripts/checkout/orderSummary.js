
//Named export
import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//import { deliveryOptions } from '..data/deliveryOptions.js';
import { deliveryOptions, getDeliveryOption } from '../../data/DeliveryOptions.js';


export function renderOrderSummary(){

  // Stores all generated checkout HTML before rendering it
  let cartSummaryHTML = '';

 
  // Loop through every item currently in the cart
  cart.forEach((cartItem) => {
      // Get the product id stored in this cart item
      const productId = cartItem.productId

      // This will store the product object that matches the cart item
      const matchingProduct = getProduct(productId);

      // Loop through all products denna rad har tegits 
      // hamnat i en funktion


      // Stop processing if no matching product was found
      if (!matchingProduct) {
        return;
      }
      // Get the selected delivery option id for this cart item
      const deliveryOptionId = cartItem.deliveryOptionId;

      // Will store the matching delivery option object
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      // Calculate the delivery date based on the selected option
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      // Convert the date into a readable string
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      // Generate the HTML for one cart item
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
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary 
                    js-delete-link" data-product-id="${matchingProduct.id}">
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


  function deliveryOptionsHTML(matchingProduct, 
    cartItem) {
    
    // Stores the HTML for all delivery options
    let html = '';
    
    // Calculate the delivery date for this option
    deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      // Format the delivery date into a readable string
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      // Show FREE for free shipping, otherwise show the shipping cost
      const priceString = deliveryOption.priceCents 
      === 0 
      ? 'FREE' 
      : `$${formatCurrency(deliveryOption.
        priceCents)} - `;
      
    // Check if this delivery option is currently selected    
    const isChecked =
      deliveryOption.id === cartItem.deliveryOptionId;

      
      
      // Generate the radio button and delivery option HTML
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}" 
          data-delivery-option-id="${deliveryOption.id}">
          
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
    
    // Return all generated delivery option HTML
    return html


    
  }

  // Render all generated cart HTML onto the page
  document.querySelector('.js-order-summary')
      .innerHTML = cartSummaryHTML;

  // Add delete functionality to every delete link
  document.querySelectorAll('.js-delete-link')
      .forEach((link) => {

          // Listen for clicks on the delete link
          link.addEventListener('click', () => {

              // remove the product from the cart
              const productId = link.dataset.productId;
              removeFromCart(productId);

              // update the HTML
              const container = document.querySelector(`
                  .js-cart-item-container-${productId}`);
              // Remove the cart item from the page
              container.remove(); 
          } );
      });

      document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          //recursion
          renderOrderSummary();
        });
      });
}

