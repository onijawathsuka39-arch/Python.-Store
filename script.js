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
    // Mock login
    const user = { email: email, name: email.split('@')[0] };
    localStorage.setItem('python_user', JSON.stringify(user));
    currentUser = user;
    window.location.href = 'profile.php';
}

function signup(name, email, password) {
    // Mock signup
    const user = { name: name, email: email };
    localStorage.setItem('python_user', JSON.stringify(user));
    currentUser = user;
    window.location.href = 'profile.php';
}

function logout() {
    localStorage.removeItem('python_user');
    currentUser = null;
    window.location.href = 'login.php';
}

// --- UI Helpers ---
function showNotification(message) {
    const note = document.createElement('div');
    note.className = 'glass';
    note.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 30px;
        border-left: 4px solid #0A0F1E;
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

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .btn-qty {
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--glass-border);
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.2s;
    }
    .btn-qty:hover {
        background: var(--accent-gold);
        color: var(--primary-dark);
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('cart.php')) {
        renderCart();
    }
});
