document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
        { id: 4, name: "Product 4", price: 70.99 },
    ];

    const cart = [];
    const elements = {
        productList: document.getElementById('product-list'),
        cartItems: document.getElementById('cart-items'),
        emptyCartMessage: document.getElementById('empty-cart'),
        totalItemsCart: document.getElementById('cart-total'),
        totalPriceDisplay: document.getElementById('total-price'),
        checkoutButton: document.getElementById('checkout-btn')
    };

    function renderProductList() {
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <span>${product.name} - $${product.price.toFixed(2)}</span>
                <button data-id="${product.id}">Add to Cart</button>
            `;
            elements.productList.appendChild(productDiv);
        });
    }

    function addToCart(productID) {
        const product = products.find((p) => p.id === productID);
        if (product) {
            cart.push(product);
            updateCartDisplay();
        }
    }

    function updateCartDisplay() {
        elements.cartItems.innerHTML = cart
            .map((item) => `<li>${item.name} - $${item.price.toFixed(2)}</li>`)
            .join('');
        elements.totalPriceDisplay.textContent = `$${calculateTotalPrice().toFixed(2)}`;

        // Toggle visibility and state based on cart contents
        elements.emptyCartMessage.style.display = cart.length === 0 ? 'block' : 'none';
        elements.totalItemsCart.style.display = cart.length === 0 ? 'none' : 'block';
        elements.checkoutButton.disabled = cart.length === 0;
    }

    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    function checkout() {
        if (cart.length > 0) {
            alert("Thank you for your purchase!");
            cart.length = 0; // Clear the cart
            updateCartDisplay(); // Refresh the cart display
        }
    }

    elements.productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productID = parseInt(e.target.getAttribute('data-id'));
            addToCart(productID);
        }
    });

    elements.checkoutButton.addEventListener('click', checkout);

    renderProductList();
});
