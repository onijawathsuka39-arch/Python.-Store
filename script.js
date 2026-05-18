// Apply stored theme immediately to avoid flash of light theme
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Centralized Color Configuration (Hex to Name Mapping)
const colorNames = {
    '#ffffff': 'White',
    '#000000': 'Black',
    '#ff0000': 'Red',
    '#DC143C': 'Red',
    '#0000ff': 'Blue',
    '#008000': 'Green',
    '#ffff00': 'Yellow',
    '#808080': 'Gray',
    '#00f2ff': 'Light Blue',
    '#e100ff': 'Pink',
    '#1a2a4a': 'Midnight Blue',
    '#4a90e2': 'Sky Blue',
    '#f0f0f0': 'Off-White',
    '#0A0F1E': 'Dark Navy',
    '#333333': 'Grey',
    '#ff91a4': 'samon pink',
    '#800000': 'Maroon',
    '#900056': 'Dark Pink'
};

const products = [
    {
        id: '1', name: 'Infinity Edition', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
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
        colors: ['#ffffff'], stock: 10,
        desc: 'The Infinity Edition Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '2', name: 'Peace Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/ZzqQ1P97/Python-Peace.png',
            'https://i.ibb.co/QvcG1bRY/Chat-GPT-Image-May-4-2026-03-30-55-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#000000'], stock: 10,
        desc: 'Peace Design Regular Tee (Printed) by Python. Featuring a premium 220 GSM build for a sleek and meaningful streetwear look.'
    },
    {
        id: '3', name: 'Nike Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/XkDb3jmB/Nike.png',
            'https://i.ibb.co/BV3wRfLt/Chat-GPT-Image-Apr-30-2026-04-50-57-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Nike Design Regular Tee (Printed) by Python. A classic aesthetic combined with high-quality 220 GSM fabric for everyday premium style.'
    },
    {
        id: '4', name: 'Stitch Design for Girls', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/20MCs0nk/Python-Scrich.png',
            'https://i.ibb.co/C3SgXz87/Python-Srtich-balck.png',
            'https://i.ibb.co/Qj1hcz4D/Gemini-Generated-Image-9ngc6s9ngc6s9ngc.png',
            'https://i.ibb.co/sdC39Jz8/Gemini-Generated-Image-rgqfm7rgqfm7rgqf.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#000000', '#ffffff'],
        desc: 'Stitch Design for Girls Regular Tee (Printed) by Python. Cute and stylish aesthetic combined with high-quality 220 GSM fabric for everyday premium style.'
    },
    {
        id: '5', name: 'BMW Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/gLS0w69Y/Python-BMW.png',
            'https://i.ibb.co/m5mSZSSB/Chat-GPT-Image-Apr-30-2026-02-48-53-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'],
        desc: 'BMW Design Regular Tee (Printed) by Python. Iconic automotive styling paired with premium 220 GSM comfort.'
    },
    {
        id: '6', name: 'Space Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/jZ8BbSM2/Python-Space.png',
            'https://i.ibb.co/j9SNvjhp/Chat-GPT-Image-Apr-30-2026-12-19-43-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'],
        desc: 'Space Design Regular Tee (Printed) by Python. Explore the cosmos in style with this premium 220 GSM graphic tee.'
    },
    {
        id: '7', name: 'Air Jordan Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/yFQVXd3p/Chat-GPT-Image-Apr-29-2026-10-04-36-PM.png',
            'https://i.ibb.co/fdyjtDZY/Chat-GPT-Image-Apr-30-2026-05-36-29-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#000000'], stock: 10,
        desc: 'Air Jordan Design Regular Tee (Printed) by Python. Iconic basketball-inspired aesthetic meets premium 220 GSM comfort.'
    },
    {
        id: '8', name: 'Urban Design Oversized Tee (Printed)', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/G4Nb8tRV/OVERSIZE-190-python.png',
            'https://i.ibb.co/cSvDHTyx/Chat-GPT-Image-Apr-30-2026-05-10-31-PM.png'
        ],
        gsm: '190 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1700, oldPrice: 1900 },
            'M': { price: 1700, oldPrice: 1900 },
            'L': { price: 1700, oldPrice: 1900 },
            'XL': { price: 1700, oldPrice: 1900 }
        },
        colors: ['#c803a4ff'],
        desc: 'Urban Oversized Tee (Printed) by Python. A bold, relaxed fit in a refreshing light blue hue, crafted from premium 190 GSM fabric for the ultimate streetwear vibe.'
    },
    {
        id: '9', name: 'Nike Design Oversized Tee (Printed) ', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/7d7g8Hmd/190gsm-python-nike-yellow.png',
            'https://i.ibb.co/Y7hJ3Mjy/Chat-GPT-Image-Apr-30-2026-04-53-45-PM.png'
        ],
        gsm: '190 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1700, oldPrice: 1900 },
            'M': { price: 1700, oldPrice: 1900 },
            'L': { price: 1700, oldPrice: 1900 },
            'XL': { price: 1700, oldPrice: 1900 }
        },
        colors: ['#ffff00'],
        desc: 'Nike Design Oversized Tee (Printed) by Python. A high-energy, vibrant yellow design featuring iconic streetwear aesthetics and premium 190 GSM comfort.'
    },
    {
        id: '10', name: 'Infinity Edition Oversized Tee (Printed)', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/yFmFFkG0/Python-Infinity-B.png',
            'https://i.ibb.co/Y7dvR0vH/Chat-GPT-Image-Apr-30-2026-12-07-41-PM.png'
        ],
        gsm: '190 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1700, oldPrice: 1900 },
            'M': { price: 1700, oldPrice: 1900 },
            'L': { price: 1700, oldPrice: 1900 },
            'XL': { price: 1700, oldPrice: 1900 }
        },
        colors: ['#00f2ff'],
        desc: 'Infinity Edition Oversized Tee (Printed) by Python. A refreshing light blue design featuring the iconic infinity motif and premium 190 GSM comfort.'
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

        // Calculate discount percentage
        let discountBadge = '';
        if (displayOldPrice && displayOldPrice > displayPrice) {
            const discountPercent = Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100);
            discountBadge = `<span style="position: absolute; top: 15px; left: 15px; background: #DC143C; color: white; padding: 5px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 800; z-index: 10; box-shadow: 0 4px 10px rgba(220, 20, 60, 0.3);">${discountPercent}% OFF</span>`;
        }

        const isOutOfStock = p.stock === 0;
        const stockBadge = isOutOfStock 
            ? `<span style="background: #fdf2f2; color: #9b1c1c; padding: 2px 8px; border-radius: 4px; font-size: 0.6rem; font-weight: 800; display: inline-block; margin-left: 8px; vertical-align: middle; border: 1px solid #fbd5d5;">OUT OF STOCK</span>`
            : `<span style="background: #f3faf7; color: #03543f; padding: 2px 8px; border-radius: 4px; font-size: 0.6rem; font-weight: 800; display: inline-block; margin-left: 8px; vertical-align: middle; border: 1px solid #def7ec;">IN STOCK</span>`;

        grid.innerHTML += `
        <div class="product-card glass ${isOutOfStock ? 'out-of-stock' : ''}" 
             onclick="window.location.href='product-detail.html?id=${p.id}'" 
             onmouseenter="startHoverSlide('${p.id}', this.querySelector('.card-slider'))"
             onmouseleave="stopHoverSlide('${p.id}', this.querySelector('.card-slider'))"
             style="cursor: pointer; animation: fadeIn 0.5s ease forwards; overflow: hidden; display: flex; flex-direction: column; position: relative; ${isOutOfStock ? 'opacity: 0.7;' : ''}">
            <div class="product-image" style="overflow: hidden; position: relative; width: 100%; aspect-ratio: 1/1; border-radius: 15px;">
                ${discountBadge}
                <div class="card-slider" style="display: flex; transition: transform 0.5s ease; height: 100%; width: 100%;">
                    ${p.images.map(img => `<img src="${img}" style="width: 100%; flex-shrink: 0; height: 100%; object-fit: cover;">`).join('')}
                </div>
            </div>
            <div class="product-info">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                    <span style="font-size: 0.7rem; color: #DC143C; font-weight: 800;">${p.category || ''}</span>
                    ${stockBadge}
                </div>
                <h3 style="margin-top: 0;">${p.name}</h3>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <p class="price">Rs. ${displayPrice.toLocaleString()}.00</p>
                    ${displayOldPrice ? `<p style="text-decoration: line-through; color: var(--text-muted); font-size: 0.8rem;">Rs. ${displayOldPrice.toLocaleString()}</p>` : ''}
                </div>
            </div>
            ${isOutOfStock ? '' : `
            <div class="add-to-cart" onclick="event.stopPropagation(); addToCart('${p.name}', ${displayPrice}, '${p.images[0]}')">
                <i data-lucide="plus"></i>
            </div>
            `}
            ${p.category === 'Oversized Tee (Printed)' || isOutOfStock ? '' : `
            <div class="size-chart-card-btn" onclick="event.stopPropagation(); openSizeChart()" title="Size Chart" style="position: absolute; bottom: 20px; right: 75px; width: 45px; height: 45px; border-radius: 50%; background: #fff; border: 1px solid #ddd; color: #000; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(20px); transition: 0.3s; cursor: pointer; z-index: 10;">
                <i data-lucide="ruler" style="width: 20px; height: 20px;"></i>
            </div>
            `}
        </div>`;
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

let hoverIntervals = {};

function startHoverSlide(productId, sliderElement) {
    const p = products.find(prod => prod.id === productId);
    if (!p || !p.images || p.images.length <= 1) return;

    let currentIdx = 0;
    hoverIntervals[productId] = setInterval(() => {
        currentIdx = (currentIdx + 1) % p.images.length;
        sliderElement.style.transform = `translateX(-${currentIdx * 100}%)`;
    }, 1000);
}

function stopHoverSlide(productId, sliderElement) {
    if (hoverIntervals[productId]) {
        clearInterval(hoverIntervals[productId]);
        delete hoverIntervals[productId];
    }
    sliderElement.style.transform = 'translateX(0)';
}

// --- Two-Level Shop Filtering System ---
let currentSection = 'All';
let currentSubcategory = 'All';

function selectSection(section, btn) {
    currentSection = section;
    currentSubcategory = 'All'; // Reset subcategory when switching sections
    
    // Update active tab styling
    document.querySelectorAll('.tab-btn').forEach(b => {
        if (b.innerText === section || (section === 'Unisexs' && b.innerText === 'Unisexs')) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    
    // Reset subcategory active tab
    document.querySelectorAll('.filter-btn').forEach(b => {
        if (b.innerText === 'All Subcategories') {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    
    filterShop();
}

function selectSubcategory(subcat, btn) {
    currentSubcategory = subcat;
    
    // Update active subcategory styling
    document.querySelectorAll('.filter-btn').forEach(b => {
        if (b.innerText === subcat || (subcat === 'All' && b.innerText === 'All Subcategories') || (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${subcat}'`))) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    
    filterShop();
}

function filterShop() {
    // 0. Dynamic Visibility of Subcategory Bar (Only show when an active gender/unisex section is chosen or subcategory filter is active)
    const subcatContainer = document.querySelector('.category-filter');
    if (subcatContainer) {
        if ((currentSection === 'All' && currentSubcategory === 'All') || currentSection === 'Kids') {
            subcatContainer.style.display = 'none';
        } else {
            subcatContainer.style.display = 'flex';
        }
    }

    let filtered = products;
    
    // 1. Filter by Primary Section (All, Kids, Mens, Womens, Unisexs)
    if (currentSection !== 'All') {
        filtered = filtered.filter(p => {
            const sections = p.sections || ['Mens', 'Womens', 'Unisexs'];
            return sections.includes(currentSection);
        });
    }
    
    // 2. Filter by Subcategory (Regular Tee, Oversized Tee)
    if (currentSubcategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentSubcategory);
    }
    
    displayProducts(filtered);
    
    // 3. Empty State for Kids or sections with 0 matching products
    const grid = document.getElementById('product-grid');
    if (grid && filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; animation: fadeIn 0.5s ease;">
                <div class="glass" style="display: inline-block; padding: 40px 60px; border-radius: 24px; border: 1px dashed var(--border-color); max-width: 450px;">
                    <i data-lucide="shopping-bag" style="width: 48px; height: 48px; color: var(--accent-gold); margin-bottom: 20px; stroke-width: 1.5;"></i>
                    <h3 style="margin-bottom: 10px; font-weight: 800; font-size: 1.3rem;">Coming Soon</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">Our premium Kids T-Shirt Collection is currently in production. Stay tuned for the drop!</p>
                </div>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function filterProducts(category) {
    if (category === 'Regular Tee (Printed)' || category === 'Oversized Tee (Printed)') {
        selectSubcategory(category, null);
    } else {
        selectSection(category, null);
    }
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

    // Calculate dynamic delivery fee
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const deliveryFee = itemCount > 3 ? 0 : 450;

    // Prepare data for the E-Invoice
    const orderData = {
        id: orderID,
        name: currentUser ? currentUser.name : 'Guest',
        phone: phone,
        address: `${address}, ${city}`,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: cart.map(item => {
            const p = products.find(prod => prod.name === item.name) || {};
            return {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                color: colorNames[item.color] || item.color,
                image: item.image || (p.images ? p.images[0] : ''),
                isCustom: item.isCustom || (item.id && String(item.id).startsWith('custom-')) || false,
                customStickers: item.customStickers || []
            };
        }),
        delivery: deliveryFee
    };

    // Encode order data for the URL (Safe for Unicode/Sinhala)
    const jsonStr = JSON.stringify(orderData);
    const encodedData = btoa(unescape(encodeURIComponent(jsonStr)));
    const baseUrl = 'https://onijawathsuka39-arch.github.io/Python.-Store/';
    const invoiceUrl = `${baseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;

    let message = `🔴 *NEW ORDER CONFIRMATION: ${orderID}*\n\n`;
    message += `👤 *Customer:* ${orderData.name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Address:* ${orderData.address}\n`;
    message += `📅 *Date:* ${orderData.date} | ${orderData.time}\n\n`;
    message += `📦 *Items Ordered:*\n`;

    let subtotal = 0;
    cart.forEach((item) => {
        const colorName = colorNames[item.color] || item.color;
        message += `• *${item.name}* (${item.size} | ${colorName})\n`;
        message += `  Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n`;
        subtotal += item.price * item.quantity;
    });

    const grandTotal = subtotal + deliveryFee;
    message += `\n💵 *Subtotal:* Rs. ${subtotal.toLocaleString()}.00\n`;
    message += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : 'Rs. ' + deliveryFee.toLocaleString() + '.00'}\n`;
    message += `💰 *Grand Total: Rs. ${grandTotal.toLocaleString()}.00*\n\n`;

    message += `📄 *View E-Invoice:* ${invoiceUrl}\n\n`;
    message += `Thank you for shopping with Python Store!`;

    const whatsappUrl = `https://wa.me/94757218786?text=${encodeURIComponent(message)}`;

    orders.push({ id: orderID, date: now.toLocaleDateString(), items: [...cart], total: grandTotal, userEmail: currentUser ? currentUser.email : 'Guest' });
    localStorage.setItem('python_orders', JSON.stringify(orders));
    cart = []; saveCart();

    // Open WhatsApp immediately to avoid popup blockers
    window.open(whatsappUrl, '_blank');

    showNotification('Order placed successfully! Redirecting...');

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
    @keyframes pulse-red { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.7); } 70% { transform: scale(1.2); box-shadow: 0 0 0 10px rgba(220, 20, 60, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0); } }
    .btn-qty { background: white; border: 1px solid #ddd; color: #000; width: 25px; height: 25px; border-radius: 5px; cursor: pointer; transition: 0.2s; font-weight: bold; }
    .btn-qty:hover { background: #000; color: white; }
    .offer-dot { position: absolute; top: -2px; right: -10px; width: 8px; height: 8px; background: #DC143C; border-radius: 50%; animation: pulse-red 2s infinite; }
`;
document.head.appendChild(styleSheet);

function handleOfferNotification() {
    const offerViewed = localStorage.getItem('python_offer_viewed_v2');
    const isOfferPage = window.location.pathname.includes('offers.html');
    if (isOfferPage) { localStorage.setItem('python_offer_viewed_v2', 'true'); }
    if (!offerViewed && !isOfferPage) {
        document.querySelectorAll('a[href="offers.html"]').forEach(link => {
            if (!link.querySelector('.offer-dot')) {
                link.style.position = 'relative';
                const dot = document.createElement('span');
                dot.className = 'offer-dot';
                link.appendChild(dot);
            }
        });
    }
}

// Centralized Light/Dark Theme System
function initThemeToggle() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // 1. Desktop Navbar Toggle
    let navIcons = document.querySelector('.nav-icons');
    if (!navIcons) {
        const nav = document.getElementById('navbar');
        if (nav) {
            navIcons = document.createElement('div');
            navIcons.className = 'nav-icons';
            nav.appendChild(navIcons);
        }
    }
    if (navIcons) {
        if (!document.getElementById('theme-toggle')) {
            const toggleBtn = document.createElement('a');
            toggleBtn.href = '#';
            toggleBtn.id = 'theme-toggle';
            toggleBtn.style.cursor = 'pointer';
            toggleBtn.style.display = 'flex';
            toggleBtn.style.alignItems = 'center';
            toggleBtn.setAttribute('title', 'Toggle Dark/Light Mode');
            toggleBtn.innerHTML = `<i data-lucide="${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
            
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                navIcons.insertBefore(toggleBtn, mobileMenuBtn);
            } else {
                navIcons.appendChild(toggleBtn);
            }
            
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const activeTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                toggleBtn.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
                const mobileToggle = document.getElementById('mobile-theme-toggle');
                if (mobileToggle) {
                    mobileToggle.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i> Theme: ${newTheme === 'dark' ? 'Light' : 'Dark'}`;
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }
    
    // 2. Mobile Drawer Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !document.getElementById('mobile-theme-toggle')) {
        const mobileToggle = document.createElement('a');
        mobileToggle.href = '#';
        mobileToggle.id = 'mobile-theme-toggle';
        mobileToggle.style.display = 'flex';
        mobileToggle.style.alignItems = 'center';
        mobileToggle.style.gap = '15px';
        mobileToggle.style.marginTop = '30px';
        mobileToggle.style.padding = '12px 18px';
        mobileToggle.style.borderRadius = '15px';
        mobileToggle.style.background = 'var(--border-light)';
        mobileToggle.style.color = 'var(--primary-dark)';
        mobileToggle.style.fontSize = '1.1rem';
        mobileToggle.style.fontWeight = '600';
        mobileToggle.style.textDecoration = 'none';
        mobileToggle.style.border = '1px solid var(--border-color)';
        mobileToggle.innerHTML = `<i data-lucide="${currentTheme === 'dark' ? 'sun' : 'moon'}"></i> Theme: ${currentTheme === 'dark' ? 'Light' : 'Dark'}`;
        
        // Append to the list/menu block in mobile sidebar
        const listContainer = mobileMenu.querySelector('ul');
        if (listContainer) {
            const li = document.createElement('li');
            li.style.marginTop = '20px';
            li.appendChild(mobileToggle);
            listContainer.appendChild(li);
        } else {
            mobileMenu.appendChild(mobileToggle);
        }
        
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const activeTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const mainToggle = document.getElementById('theme-toggle');
            if (mainToggle) {
                mainToggle.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
            }
            mobileToggle.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i> Theme: ${newTheme === 'dark' ? 'Light' : 'Dark'}`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    updateCartCount();
    handleOfferNotification();
    if (window.location.pathname.includes('cart.html')) { renderCart(); }
    if (window.location.pathname.includes('profile.html')) { loadProfile(); }
    if (window.location.pathname.includes('shop.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('category');
        catParam ? filterProducts(catParam) : filterProducts('All');
    }
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') { displayProducts(products.slice(0, 4)); }
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
