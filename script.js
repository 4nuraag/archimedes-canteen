// Menu Data
const menuItems = [
    { id: 1, name: "Biryani", price: 200, image: "biryani.png" },
    { id: 2, name: "Idly", price: 70, image: "idly.png" },
    { id: 3, name: "Dosa", price: 70, image: "dosa.png" },
    { id: 4, name: "Roti", price: 40, image: "roti.png" },
    { id: 5, name: "Pizza", price: 250, image: "pizza.jpg" },
    { id: 6, name: "Burger", price: 150, image: "burger.jpg" },
    { id: 7, name: "Rolls", price: 100, image: "rolls.jpg" },
    { id: 8, name: "Rice & Curry", price: 120, image: "curry.jpg" }
];

// Cart State
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const orderItemsContainer = document.getElementById('order-items');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartDisplay();
});

// Render Menu
function renderMenu() {
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-card">
            <img src="${item.image}" alt="${item.name}" class="menu-img" onerror="this.src='https://via.placeholder.com/150'">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <button class="btn-add" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus-circle"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '';
        updateTotals(0);
        return;
    }

    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" onerror="this.src='https://via.placeholder.com/40'">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span class="price">₹${item.price}</span>
            </div>
            <div class="cart-item-qty">
                <span>QUANTITY</span>
                <div class="qty-val">${item.quantity}</div>
            </div>
        </div>
    `).join('');

    // Calculate Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateTotals(subtotal);
}

// Update Totals
function updateTotals(subtotal) {
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    subtotalEl.innerText = `₹${subtotal.toFixed(0)}`;
    taxEl.innerText = `₹${tax.toFixed(0)}`;
    totalEl.innerText = `₹${total.toFixed(0)}`;

    // Update Mobile Sticky Cart
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateStickyCart(total, totalCount);
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// Send Order (Simulation)
function sendOrder() {
    if (cart.length === 0) {
        alert("Please add items to your order first.");
        return;
    }
    alert("Order Sent Successfully! Order #12564879");
    clearCart();
}

// Navigation Logic
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    // Handle Section Mapping
    // Assumes id pattern: [sectionId]-section
    const targetId = sectionId + '-section';

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    } else {
        console.error(`Section with ID ${targetId} not found.`);
    }
}

function scrollToMenu() {
    showSection('consumer');
}

// Mobile Menu Logic
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');

    // Also close any open dropdowns
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}

function toggleMobileDropdown(event) {
    event.preventDefault(); // Always prevent link click
    event.stopPropagation(); // Stop bubbling
    const dropdown = event.target.closest('.dropdown');

    // Close other dropdowns
    document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
    });

    const isActive = dropdown.classList.toggle('active');

    // GHOST CLICK PREVENTION: Disable interaction for 400ms
    if (isActive) {
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
            content.style.pointerEvents = 'none';
            setTimeout(() => {
                content.style.pointerEvents = 'auto';
            }, 400);
        }
    }
}

// Mobile Sticky Cart Logic
function updateStickyCart(total, count) {
    const stickyBtn = document.getElementById('sticky-cart-btn');
    const countEl = document.getElementById('sticky-count');
    const totalEl = document.getElementById('sticky-total');

    if (count > 0 && window.innerWidth <= 768) {
        stickyBtn.classList.remove('hidden');
        countEl.innerText = `${count} Items`;
        totalEl.innerText = `₹${total.toFixed(0)}`;
    } else {
        stickyBtn.classList.add('hidden');
    }
}

function scrollToCartMobile() {
    const cartSection = document.querySelector('.order-sidebar');
    cartSection.scrollIntoView({ behavior: 'smooth' });
}

// Chat Bot Logic
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('hidden');
}
