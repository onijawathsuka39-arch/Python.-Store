// Local Storage Logic for Python Brand Website

// --- Cart System ---
let cart = JSON.parse(localStorage.getItem('python_cart')) || [];

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(name, price, image = '') {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
    }
    
    saveCart();
    showNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('python_cart', JSON.stringify(cart));
    updateCartCount();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div style="text-align: center; padding: 50px;">Your cart is empty.</div>';
        if (totalElement) totalElement.innerText = 'Rs. 0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item glass" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="width: 60px; height: 60px; background: #151b2d; border-radius: 10px;"></div>
                    <div>
                        <h4 style="margin: 0;">${item.name}</h4>
                        <p style="color: #0A0F1E; margin: 5px 0 0;">Rs. ${item.price.toLocaleString()}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <button onclick="updateQuantity(${index}, -1)" class="btn-qty">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="btn-qty">+</button>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4444; cursor: pointer; margin-left: 20px;">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    if (totalElement) totalElement.innerText = `Rs. ${total.toLocaleString()}.00`;
    lucide.createIcons();
}

// --- Auth System ---
let currentUser = JSON.parse(localStorage.getItem('python_user')) || null;

function login(email, password) {
    // In a real app, you'd check credentials. For local storage, we'll just simulate.
    const storedUsers = JSON.parse(localStorage.getItem('python_all_users')) || [];
    const user = storedUsers.find(u => u.email === email);
    
    if (user) {
        localStorage.setItem('python_user', JSON.stringify(user));
        currentUser = user;
        window.location.href = 'profile.html';
    } else {
        alert('User not found. Please sign up first.');
    }
}

function signup(name, email, password) {
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    const user = { name: name, email: email, password: password };
    
    // Save to all users (simulating a DB)
    const storedUsers = JSON.parse(localStorage.getItem('python_all_users')) || [];
    storedUsers.push(user);
    localStorage.setItem('python_all_users', JSON.stringify(storedUsers));
    
    // Set as current user
    localStorage.setItem('python_user', JSON.stringify(user));
    currentUser = user;
    
    showNotification('Account created successfully!');
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}

function logout() {
    localStorage.removeItem('python_user');
    currentUser = null;
    window.location.href = 'login.html';
}

function showNotification(message) {
    const note = document.createElement('div');
    note.className = 'glass';
    note.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 30px;
        border-left: 4px solid var(--accent-gold);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    note.innerText = message;
    document.body.appendChild(note);
    
    setTimeout(() => {
        note.style.opacity = '0';
        note.style.transition = '0.5s';
        setTimeout(() => note.remove(), 500);
    }, 3000);
}

// --- Order System ---
let orders = JSON.parse(localStorage.getItem('python_orders')) || [];

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        items: [...cart],
        total: cart.reduce((t, i) => t + (i.price * i.quantity), 0),
        userEmail: currentUser ? currentUser.email : 'Guest'
    };
    
    orders.push(newOrder);
    localStorage.setItem('python_orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    saveCart();
    
    showNotification('Order placed successfully!');
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

function clearOrderHistory() {
    if (confirm('Are you sure you want to clear your order history?')) {
        // Only clear orders for the current user
        orders = orders.filter(o => o.userEmail !== currentUser.email);
        localStorage.setItem('python_orders', JSON.stringify(orders));
        loadProfile();
        showNotification('Order history cleared.');
    }
}

function loadProfile() {
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const initialEl = document.getElementById('profile-initial');
    const orderCountEl = document.getElementById('order-count');
    const historyEl = document.getElementById('order-history');
    
    if (currentUser) {
        if (nameEl) nameEl.innerText = currentUser.name;
        if (emailEl) emailEl.innerText = currentUser.email;
        if (initialEl) initialEl.innerText = currentUser.name.charAt(0).toUpperCase();
        
        // Load user specific orders
        const userOrders = orders.filter(o => o.userEmail === currentUser.email);
        if (orderCountEl) orderCountEl.innerText = userOrders.length;
        
        if (historyEl) {
            if (userOrders.length === 0) {
                historyEl.innerHTML = '<p style="color: var(--text-muted);">No orders found.</p>';
            } else {
                historyEl.innerHTML = userOrders.reverse().map(o => `
                    <div class="glass" style="padding: 20px; margin-bottom: 15px; text-align: left;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="font-weight: 800;">Order #${o.id.toString().slice(-6)}</span>
                            <span style="color: var(--text-muted);">${o.date}</span>
                        </div>
                        <div style="font-size: 0.9rem; margin-bottom: 10px;">
                            ${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </div>
                        <div style="font-weight: 800; color: var(--accent-gold);">Total: Rs. ${o.total.toLocaleString()}.00</div>
                    </div>
                `).join('');
            }
        }
    } else {
        if (window.location.pathname.includes('profile.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .btn-qty {
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--glass-border);
        color: var(--primary-dark);
        width: 30px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.2s;
    }
    .btn-qty:hover {
        background: var(--accent-gold);
        color: white;
    }
`;
document.head.appendChild(styleSheet);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
    if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) && currentUser) {
        window.location.href = 'profile.html';
    }
    
    // Initialize icons if lucide is available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('close-menu');

    if (menuBtn && mobileMenu && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
        });

        const closeHandler = () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        };

        overlay.addEventListener('click', closeHandler);
        if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    }
});
