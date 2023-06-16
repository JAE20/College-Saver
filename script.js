// Filter products by category
const categoryButtons = document.querySelectorAll('.category-button');
const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchMessage = document.getElementById('search-message');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    // Show all cards if the category is "all"
    if (category === 'all') {
      cards.forEach(card => {
        card.style.display = 'block';
      });
    } else {
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.display = cardCategory === category ? 'block' : 'none';
      });
    }
  });
});

// Sort products by price
const sortSelect = document.getElementById('sort-select');
const productsContainer = document.querySelector('.products');

sortSelect.addEventListener('change', () => {
  const selectedValue = sortSelect.value;
  const cardsArray = Array.from(cards);

  if (selectedValue === 'price-low-high') {
    cardsArray.sort((a, b) => {
      const aPrice = parseInt(a.querySelector('.price').textContent.replace('₱', ''));
      const bPrice = parseInt(b.querySelector('.price').textContent.replace('₱', ''));
      return aPrice - bPrice;
    });
  } else if (selectedValue === 'price-high-low') {
    cardsArray.sort((a, b) => {
      const aPrice = parseInt(a.querySelector('.price').textContent.replace('₱', ''));
      const bPrice = parseInt(b.querySelector('.price').textContent.replace('₱', ''));
      return bPrice - aPrice;
    });
  }

  // Remove existing cards
  cards.forEach(card => {
    card.remove();
  });

  // Append sorted cards
  cardsArray.forEach(card => {
    productsContainer.appendChild(card);
  });
});

// Search products
searchButton.addEventListener('click', () => {
  const searchText = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    const category = card.querySelector('.cty').textContent.toLowerCase();

    if (title.includes(searchText) || category.includes(searchText)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  if (searchText === '') {
    searchMessage.textContent = '';
  } else if (document.querySelectorAll('.card[style="display: block;"]').length === 0) {
    searchMessage.textContent = `No product is named '${searchText}'`;
  } else {
    searchMessage.textContent = '';
  }
});

// Update product display as you type
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    const category = card.querySelector('.cty').textContent.toLowerCase();

    if (searchText === '') {
      card.style.display = 'block'; // Restore original state
    } else if (title.includes(searchText) || category.includes(searchText)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  if (searchText === '') {
    searchMessage.textContent = '';
  } else if (document.querySelectorAll('.card[style="display: block;"]').length === 0) {
    searchMessage.textContent = `No product is named '${searchText}'`;
  } else {
    searchMessage.textContent = '';
  }
});






