// Adding products and quantity
export const cart = [{
    // normalizing the data
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

// -----------------------------------------------------------------
// Adds a product to the cart.
// If the product is already in the cart, its quantity is increased by 1.
// If it is not in the cart yet, a new cart item is created with quantity 1.
// -----------------------------------------------------------------
export function addToCart(productId){

   // Will store the cart item if we find a matching product
    let matchingItem; 

    // Loop through all items currently in the cart
    cart.forEach((cartItem) => {
        
        // Check if this cart imen matches the product we´re adding
        if(productId === cartItem.productId){
            matchingItem = cartItem; // Save the match

        }   
    })

    // If the product was already in the cart…    
    if(matchingItem){
       
        // …increase its quantity by 1
        matchingItem.quantity += 1;
    } else{

        // Otherwise: add the product to the cart as a new entry
        cart.push({
        productId: productId,
        quantity: 1
    });
    }
}
