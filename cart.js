// Cart Data
let cartItems = [];

// Retrieve cart items from session storage
function getCartItemsFromStorage() {
  const storedCartItems = sessionStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    updateCart();
  }
}

// Save cart items to session storage
function saveCartItemsToStorage() {
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Toggle Cart Visibility
function toggleCart() {
  const cartContainer = document.getElementById('cartContainer');
  cartContainer.classList.toggle('show');
}

// Add item to Cart
function addToCart(item) {
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    const cartItem = {
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    };
    cartItems.push(cartItem);
  }
  saveCartItemsToStorage(); // Save cart items to session storage
  updateCart();

  // Show the cart container
  const cartContainer = document.getElementById('cartContainer');
  cartContainer.classList.add('show');
}

// Update Cart UI
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  
  if (cartItems.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
  }
  
  cartItemsContainer.innerHTML = '';
  cartItemsContainer.innerHTML = '';

  let subtotal = 0;
  let uniqueProducts = 0;

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    const itemTotal = item.price * item.quantity;
    itemDiv.innerHTML = `
      <div class="product-info">
        <img src="${item.image}" alt="${item.name}">
        <div class="product-details">
          <h3>${item.name}</h3>
          <div class="price">Price: ₱${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div class="quantity-remove">
        <div class="quantity-input">
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" style="width: 40px;">
        </div>
        <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="subtotal">Subtotal: ₱${itemTotal.toFixed(2)}</div>
    `;
    cartItemsContainer.appendChild(itemDiv);
    subtotal += itemTotal;
    
    uniqueProducts += 1; // Increment unique products count
  });

  const totalDiv = document.getElementById('total');
  totalDiv.textContent = `Total: ₱${subtotal.toFixed(2)}`;

  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = uniqueProducts;
}

// Update quantity for an item in the cart
function updateQuantity(index, quantity) {
  cartItems[index].quantity = parseInt(quantity);
  saveCartItemsToStorage(); // Save cart items to session storage
  updateCart();
}

// Remove item from cart
function removeItem(index) {
  cartItems.splice(index, 1);
  saveCartItemsToStorage(); // Save cart items to session storage
  updateCart();
}

// Restoring the cart on page load
window.addEventListener('load', getCartItemsFromStorage);

function checkout() {
  window.location.href = "checkout.html";
}

// Retrieve cart items from session storage
// Retrieve cart items from session storage
function getCartItemsFromStorage() {
  const storedCartItems = sessionStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    updateCart();
    if (window.location.pathname.includes('checkout.html')) {
      updateSummary(cartItems);
      calculateTotal(cartItems);
    }
  }
}


// Update the order summary table
function updateSummary(cartItems) {
  const summaryItemsContainer = document.getElementById('summaryItems');

  summaryItemsContainer.innerHTML = '';

  cartItems.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}">
        ${item.name}
      </td>
      <td>&#8369;${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>&#8369;${(item.price * item.quantity).toFixed(2)}</td>
    `;
    summaryItemsContainer.appendChild(row);
  });
}

// Calculate and display the total amount
function calculateTotal(cartItems) {
  const totalAmount = document.getElementById('totalAmount');

  const total = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  totalAmount.innerHTML = `&#8369;${total.toFixed(2)}`;
}

// Process payment (placeholder function)
function processPayment(event) {
  event.preventDefault(); // Prevent the default form submission

  var form = document.getElementById('checkout-form');
  if (form.checkValidity()) {
    // Perform payment processing logic here
    // This is just a placeholder function
    alert('Payment processed successfully!');
    // Clear the cart after successful payment
    cartItems = [];
    saveCartItemsToStorage();
    // Redirect to the homepage or a success page
    window.location.href = 'home.html';
  } else {
    // Trigger the browser's built-in form validation
    form.reportValidity();
  }
}

