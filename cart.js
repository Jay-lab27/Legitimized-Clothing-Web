// Para sa phone toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.navbar');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Dropdown 
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a'); 

    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return; // 

       
        if (e.target === link || link.contains(e.target)) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
       
    });
});



// Pang close nang menu 
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.querySelector('.cart-items');
    const itemCount = document.getElementById('itemCount');
    const subtotalElement = document.getElementById('subtotal');
    const totalAmountElement = document.getElementById('totalAmount');


    function renderCart() {
        cartItems.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="size">Size: ${item.size}</p>
                    <p class="price">₱${item.total.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" 
                               class="quantity-input" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
            subtotal += item.total;
        });

      
        itemCount.textContent = cart.length;
        subtotalElement.textContent = subtotal.toFixed(2);
        totalAmountElement.textContent = subtotal.toFixed(2);
    }

  
    function updateQuantity(index, newQuantity) {
        cart[index].quantity = newQuantity;
        cart[index].total = cart[index].price * newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

  
    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

   
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            removeItem(index);
        }
        
        if (e.target.classList.contains('minus')) {
            const index = e.target.dataset.index;
            const newQuantity = Math.max(1, cart[index].quantity - 1);
            updateQuantity(index, newQuantity);
        }
        
        if (e.target.classList.contains('plus')) {
            const index = e.target.dataset.index;
            const newQuantity = cart[index].quantity + 1;
            updateQuantity(index, newQuantity);
        }
    });

    //
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.dataset.index;
            const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
            updateQuantity(index, newQuantity);
        }
    });

    
    renderCart();
});