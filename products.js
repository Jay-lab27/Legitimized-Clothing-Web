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


let currentProduct = null;
let selectedSize = null;
let currentPrice = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productItem = e.target.closest('.product-item');
        currentProduct = {
            name: productItem.querySelector('h3').textContent,
            price: parseFloat(productItem.querySelector('.price').textContent.replace('₱', '')),
            category: productItem.closest('.product-category').id,
            image: productItem.querySelector('img').src
        };
        
        showModal();
    });
});

function showModal() {
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'block';
    document.getElementById('modalProductName').textContent = currentProduct.name;
    
    // Set size 
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';
    
    const sizes = currentProduct.category === 'sandals' ? 
        ['41', '42', '43', '44'] : ['S', 'M', 'L', 'XL'];
    
    sizes.forEach(size => {
        const sizeBtn = document.createElement('div');
        sizeBtn.className = 'size-option';
        sizeBtn.textContent = size;
        sizeBtn.addEventListener('click', () => selectSize(sizeBtn, size));
        sizeOptions.appendChild(sizeBtn);
    });
    
    // Quantity 
    document.getElementById('quantity').addEventListener('input', updateTotalPrice);
    updateTotalPrice();
}

function selectSize(button, size) {
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedSize = size;
}

function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const total = currentProduct.price * quantity;
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Modal buttons
document.querySelector('.cancel-btn').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
    resetModal();
});

document.querySelector('.confirm-btn').addEventListener('click', () => {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    addToCart({
        ...currentProduct,
        size: selectedSize,
        quantity: quantity,
        total: currentProduct.price * quantity
    });
    
    document.getElementById('modalOverlay').style.display = 'none';
    resetModal();
    window.location.href = 'cart.html';
});

function resetModal() {
    selectedSize = null;
    document.getElementById('quantity').value = 1;
    currentProduct = null;
}

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
} 