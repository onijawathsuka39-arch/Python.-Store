// Centralized Product Data with Color Mapping
const colorNames = {
    '#fff': 'White', '#000': 'Black', '#DC143C': 'Red', '#1a2a4a': 'Midnight Blue',
    '#4a90e2': 'Sky Blue', '#f0f0f0': 'Off-White', '#0A0F1E': 'Dark Navy', '#333': 'Grey'
};

const products = [
    { 
        id: '1', name: 'Infinity Edition', category: 'Regular Tee (Printed)', 
        images: [
            'https://i.ibb.co/4w34h3hZ/Python-Infinity-w.png',
            'https://i.ibb.co/NnswC8R5/Chat-GPT-Image-Apr-30-2026-12-01-14-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#fff'],
        desc: 'The Infinity Edition Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric for ultimate comfort and durability.'
    }
];

// --- Cart System ---
let cart = JSON.parse(localStorage.getItem('python_cart')) || [];

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(name, price, image = '', size = 'Free', color = 'Default', quantity = 1) {
    const existingItem = cart.find(item => item.name === name && item.size === size && item.color === color);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({ name: name, price: price, quantity: parseInt(quantity), image: image, size: size, color: color });
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
    if (cart[index].quantity <= 0) removeFromCart(index);
    else { saveCart(); renderCart(); }
}

function saveCart() {
    localStorage.setItem('python_cart', JSON.stringify(cart));
    updateCartCount();
}

function displayProducts(filteredProducts) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    filteredProducts.forEach((p) => {
        const hasSizes = p.sizes && typeof p.sizes === 'object';
        const displayPrice = hasSizes ? Object.values(p.sizes)[0].price : p.price;
        const displayOldPrice = hasSizes ? Object.values(p.sizes)[0].oldPrice : p.oldPrice;

        grid.innerHTML += `
        <div class="product-card glass" onclick="window.location.href='product-detail.html?id=${p.id}'" style="cursor: pointer; animation: fadeIn 0.5s ease forwards;">
            <div class="product-image">
                ${displayOldPrice && p.id === '1' ? `<span style="position: absolute; top: 15px; left: 15px; background: #DC143C; color: white; padding: 5px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 800; z-index: 10;">15% OFF</span>` : ''}
                <img src="${p.images[0]}" alt="${p.name}">
            </div>
            <div class="product-info">
                <span style="font-size: 0.7rem; color: #DC143C; font-weight: 800;">${p.category || ''}</span>
                <h3>${p.name}</h3>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <p class="price">Rs. ${displayPrice.toLocaleString()}.00</p>
                    ${displayOldPrice ? `<p style="text-decoration: line-through; color: var(--text-muted); font-size: 0.8rem;">Rs. ${displayOldPrice.toLocaleString()}</p>` : ''}
                </div>
            </div>
            <div class="add-to-cart" onclick="event.stopPropagation(); addToCart('${p.name}', ${displayPrice}, '${p.images[0]}')">
                <i data-lucide="plus"></i>
            </div>
            <div class="size-chart-card-btn" onclick="event.stopPropagation(); openSizeChart()" title="Size Chart" style="position: absolute; bottom: 20px; right: 75px; width: 45px; height: 45px; border-radius: 50%; background: #fff; border: 1px solid #ddd; color: #000; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(20px); transition: 0.3s; cursor: pointer; z-index: 10;">
                <i data-lucide="ruler" style="width: 20px; height: 20px;"></i>
            </div>
        </div>`;
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.innerText === category ? btn.classList.add('active') : btn.classList.remove('active'));
    category === 'All' ? displayProducts(products) : displayProducts(products.filter(p => p.category === category));
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!cartContainer) return;
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div style="text-align: center; padding: 50px; color: var(--text-muted);">Your cart is empty.</div>';
        if (totalElement) totalElement.innerText = 'Rs. 0.00';
        return;
    }
    let html = '', total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item glass" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                    <div>
                        <h4 style="margin: 0;">${item.name}</h4>
                        <p style="color: var(--text-muted); font-size: 0.8rem; margin: 2px 0;">Size: ${item.size} | Color: ${colorNames[item.color] || item.color}</p>
                        <p style="color: #000; font-weight: 800; margin: 5px 0 0;">Rs. ${itemTotal.toLocaleString()}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.05); padding: 5px 10px; border-radius: 8px;">
                        <button onclick="updateQuantity(${index}, -1)" class="btn-qty">-</button>
                        <span style="min-width: 20px; text-align: center; font-weight: 800;">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="btn-qty">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4444; cursor: pointer;"><i data-lucide="trash-2" style="width: 18px;"></i></button>
                </div>
            </div>`;
    });
    cartContainer.innerHTML = html;
    if (totalElement) totalElement.innerText = `Rs. ${total.toLocaleString()}.00`;
    lucide.createIcons();
}

// --- Auth System ---
let currentUser = JSON.parse(localStorage.getItem('python_user')) || null;

function login(email, password) {
    const user = (JSON.parse(localStorage.getItem('python_all_users')) || []).find(u => u.email === email && u.password === password);
    if (user) { localStorage.setItem('python_user', JSON.stringify(user)); currentUser = user; window.location.href = 'profile.html'; }
    else alert('Invalid credentials');
}

function signup(name, email, password) {
    const user = { name, email, password };
    const all = JSON.parse(localStorage.getItem('python_all_users')) || [];
    all.push(user);
    localStorage.setItem('python_all_users', JSON.stringify(all));
    localStorage.setItem('python_user', JSON.stringify(user));
    currentUser = user;
    showNotification('Account created!');
    setTimeout(() => { window.location.href = 'profile.html'; }, 1000);
}

function logout() { localStorage.removeItem('python_user'); currentUser = null; window.location.href = 'login.html'; }

function showNotification(message) {
    const note = document.createElement('div');
    note.className = 'glass';
    note.style.cssText = `position: fixed; bottom: 20px; right: 20px; padding: 15px 30px; border-left: 4px solid #DC143C; z-index: 10001; background: white;`;
    note.innerText = message;
    document.body.appendChild(note);
    setTimeout(() => { note.style.opacity = '0'; note.style.transition = '0.5s'; setTimeout(() => note.remove(), 500); }, 3000);
}

// --- Order System ---
let orders = JSON.parse(localStorage.getItem('python_orders')) || [];

function placeOrder() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }

    const address = document.getElementById('checkout-address')?.value || 'N/A';
    const city = document.getElementById('checkout-city')?.value || 'N/A';
    const phone = document.getElementById('checkout-phone')?.value || 'N/A';

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}`;

    // Get next order count
    const totalOrdersCount = (orders.length + 1).toString().padStart(3, '0');
    const orderID = `ORD-PS-${dateStr}${totalOrdersCount}`;

    let message = `*Order Confirmation: ${orderID}*\n\n`;
    message += `*Customer:* ${currentUser ? currentUser.name : 'Guest'}\n`;
    message += `*Phone:* ${phone}\n`;
    message += `*Address:* ${address}, ${city}\n\n`;
    message += `*Items:*\n`;

    let total = 0;
    cart.forEach((item) => {
        const p = products.find(prod => prod.name === item.name) || {};
        const colorName = colorNames[item.color] || item.color;
        message += `• *${item.name}* (${item.size} | ${p.gsm || '-'} | ${colorName})\n`;
        message += `  Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n\n`;
        total += item.price * item.quantity;
    });

    message += `*Total: Rs. ${total.toLocaleString()}*\n\n`;

    if (currentUser) {
        message += `*Signup Details:*\n`;
        message += `Name: ${currentUser.name}\n`;
        message += `Email: ${currentUser.email}\n\n`;
    }

    message += `Thank you for shopping with us!`;

    const whatsappUrl = `https://wa.me/94757218786?text=${encodeURIComponent(message)}`;

    orders.push({ id: orderID, date: now.toLocaleDateString(), items: [...cart], total, userEmail: currentUser ? currentUser.email : 'Guest' });
    localStorage.setItem('python_orders', JSON.stringify(orders));
    cart = []; saveCart();
    window.open(whatsappUrl, '_blank');
    setTimeout(() => { window.location.href = 'profile.html'; }, 2000);
}

function clearOrderHistory() {
    if (confirm('Are you sure you want to clear your order history?')) {
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
                            ${o.items.map(i => `${i.name} (${i.size}, ${i.quantity}x)`).join(', ')}
                        </div>
                        <div style="font-weight: 800; color: #DC143C;">Total: Rs. ${o.total.toLocaleString()}.00</div>
                    </div>
                `).join('');
            }
        }
    } else {
        if (window.location.pathname.includes('profile.html')) { window.location.href = 'login.html'; }
    }
}

// Animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .btn-qty { background: white; border: 1px solid #ddd; color: #000; width: 25px; height: 25px; border-radius: 5px; cursor: pointer; transition: 0.2s; font-weight: bold; }
    .btn-qty:hover { background: #000; color: white; }
`;
document.head.appendChild(styleSheet);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) { renderCart(); }
    if (window.location.pathname.includes('profile.html')) { loadProfile(); }
    if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) && currentUser) {
        window.location.href = 'profile.html';
    }
    if (typeof lucide !== 'undefined') { lucide.createIcons(); }

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
