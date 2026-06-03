//in objectoriented programming we use PascalCase for 
//things that generate objects
function Cart(localStorageKey) {
    const cart = {
        cartItems:  undefined,

        loadFromStorage (){
            // using "this" we access the outer object in this case "cartItem"
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

                if (!this.cartItems){
                    this.cartItems = [{
                    // normalizing the data 
                    
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                    
                }]; 
            }
        },
        
        //console.log('Cart in cart.js:', cart);//
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        // -----------------------------------------------------------------
        // Adds a product to the cart.
        // If the product is already in the cart, its quantity is increased by 1.
        // If it is not in the cart yet, a new cart item is created with quantity 1.
        // -----------------------------------------------------------------
        addToCart(productId){

        // Will store the cart item if we find a matching product
            let matchingItem; 

            // Loop through all items currently in the cart
            this.cartItems.forEach((cartItem) => {
                
                // Check if this cart imen matches the product we´re adding
                if(productId === cartItem.productId){
                    matchingItem = cartItem; // Save the match

                }   
            });

            // If the product was already in the cart…    
            if(matchingItem){
            
                // …increase its quantity by 1
                matchingItem.quantity += 1;
            } else{

                // Otherwise: add the product to the cart as a new entry
                this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
            }

        this.saveToStorage();
    },

        // ----------------------------------------------------------
        // This function removes an item from the cart.
        // It does this by creating a new cart that contains
        // every cart item EXCEPT the one with the matching productId.
        // ----------------------------------------------------------
        removeFromCart(productId){
            const newCart = [];

            // Only keep the items whose productId does NOT match
            this.cartItems.forEach((cartItem) => {

                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;

            this.saveToStorage();

        },


        updateDeliveryOption(productId, deliveryOptionId){

            // Will store the cart item if we find a matching product
            let matchingItem; 

            // Loop through all items currently in the cart
            this.cartItems.forEach((cartItem) => {
                
                // Check if this cart imen matches the product we´re adding
                if(productId === cartItem.productId){
                    matchingItem = cartItem; // Save the match

                }   
            });
            
            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage();
        }


    };

    return cart;
}


const cart = Cart('cart-oop');
const businessCart = Cart();

// Adding products and quantity
cart.loadFromStorage('cart-business');

// Adding products and quantity
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);