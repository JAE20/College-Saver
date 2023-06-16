function getCartItemsFromStorage() {
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      updateSummary(cartItems);
      calculateTotal(cartItems);
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
  function processPayment() {
    // Perform payment processing logic here
    // This is just a placeholder function
    alert('Payment processed successfully!');
    // Clear the cart after successful payment
    cartItems = [];
    saveCartItemsToStorage();
    // Redirect to the homepage or a success page
    window.location.href = 'home.html';
  }
  
  // Populate the summary when the page loads
  window.addEventListener('load', populateSummary);