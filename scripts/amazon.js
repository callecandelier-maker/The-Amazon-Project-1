//imorting via the attribute module
import {cart} from '../data/cart.js';

// Data structure: linked from products.js 
// a list where we save the data about the products 

// combing all the html together
  let productsHTML = '';

// Loop through every product in the "products" list
products.forEach((product) => {
    // Add (append) HTML for this product to the "productsHTML" string
    // (+= means we are adding to the existing string — not replacing it)
    productsHTML += `
    
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary js-add-to-cart"
          data-product-id="${product.id}"> 
            Add to Cart
          </button>
        </div>
    `;

});
// using the DOM to generate all the html
document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;


// Select ALL elements on the page with the class "ja-add-to-cart"
// querySelectorAll returns a list (NodeList) of matching elements
document.querySelectorAll('.js-add-to-cart')
// forEach loops through the list — one button at a time
    .forEach((button) => {
    // For each button, we add a "click" event listener
      button.addEventListener('click', () => {
        // add the product and the quantity to the cart
        // data atribute it allows to attach any information to an element
        // Get the attribute from the button and displays it
        // productId converts from kebab-case to Camel-case 
        // from the data attribbute in the DOM button
        const productId = button.dataset.productId;
        // a global variable that we use to store the value that is item
        let matchingItem; 

        cart.forEach((item) => {
            // Checking if we already have this product in the cart
            if(productId === item.productId){
                matchingItem = item;
            }   
        })

        if(matchingItem){
            // if we got a matchingItem increase its quantity by 1
            matchingItem.quantity += 1;
        } else{
            //If not:
            // place the chossen object in the list when we push a button
            cart.push({
            productId: productId,
            quantity: 1
        });
        }

        // Variable that we use to store the total quantity
        let cartQuantity = 0;

        // Calculate the total quantity
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        })

        document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
      });  
    });



