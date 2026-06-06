// Apply stored theme immediately to avoid flash of light theme
(function () {
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
    '#900056': 'Dark Pink',
    '#c4956a': 'Light Brown',
    '#f5e6c8': 'Light Yellow',
    '#36454f': 'Charcoal',
    '#889c8a': 'Sage Green',
    '#7f94a8': 'Dusty Blue',
    '#d9cdbe': 'Beige'
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
        id: '4', name: 'Stitch Design for Girls', category: 'Regular Tee (Printed)', sections: ['Womens'],
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
        id: '8', name: 'Urban Design Oversized Tee (Printed)', category: 'Oversized Tee (Printed)', sections: ['Womens',],
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
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1790, oldPrice: 1900 },
            'M': { price: 1790, oldPrice: 1900 },
            'L': { price: 1790, oldPrice: 1900 },
            'XL': { price: 1790, oldPrice: 1900 }
        },
        colors: ['#00f2ff'],
        desc: 'Infinity Edition Oversized Tee (Printed) by Python. A refreshing light blue design featuring the iconic infinity motif and premium 220 GSM comfort.'
    },
    {
        id: '11', name: 'GTR Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/jmXL8K9/GTR-Design.png',
            'https://i.ibb.co/N24VB8L1/Chat-GPT-Image-May-20-2026-08-42-05-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'GTR Design Regular Tee (Printed) by Python. Featuring an iconic Nissan GT-R Liberty Walk graphic on the back, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '12', name: 'F30 M3 Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/qLqb4RNj/F30-M3-Design.png',
            'https://i.ibb.co/fzDHqJw6/Chat-GPT-Image-May-20-2026-08-51-35-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'F30 M3 Design Regular Tee (Printed) by Python. Featuring an iconic BMW F30 M3 graphic on the back, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '13', name: 'Samurai Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/35YkhXRs/honor-black-design.png',
            'https://i.ibb.co/p7ftW61/honor-white-design.png',
            'https://i.ibb.co/7NVzPVhv/Chat-GPT-Image-May-20-2026-08-47-42-PM.png',
            'https://i.ibb.co/rK2NP38J/Chat-GPT-Image-May-20-2026-09-03-02-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#000000', '#ffffff'], stock: 10,
        desc: 'Samurai Design Regular Tee (Printed) by Python. A premium 220 GSM streetwear t-shirt featuring a striking Japanese Samurai "Honor" design, available in both black and white.'
    },
    {
        id: '14', name: 'Mustang Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/23M5QKKX/Mustang-desing.png',
            'https://i.ibb.co/JRBp67cp/Chat-GPT-Image-May-20-2026-08-44-29-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Mustang Design Regular Tee (Printed) by Python. Featuring an iconic Ford Mustang graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '15', name: 'Angel Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/hFsMZR7s/angels-design.png',
            'https://i.ibb.co/rR6WpLZC/Chat-GPT-Image-May-20-2026-08-54-03-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Angel Design Regular Tee (Printed) by Python. Featuring a unique angelic graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '16', name: 'Rock Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/gMQPpMfR/rock-desing.png',
            'https://i.ibb.co/zV2z6pj0/Chat-GPT-Image-May-20-2026-08-57-42-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Rock Design Regular Tee (Printed) by Python. Featuring a striking rock-inspired graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '17', name: 'Never Give Up Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/zh9kdHYY/never-give-up-design.png',
            'https://i.ibb.co/fcL3x12/Chat-GPT-Image-May-20-2026-08-49-40-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1600, oldPrice: 1850 },
            'M': { price: 1600, oldPrice: 1850 },
            'L': { price: 1600, oldPrice: 1850 },
            'XL': { price: 1600, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Never Give Up Design Regular Tee (Printed) by Python. Featuring a motivational graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '18', name: 'Waffle T-shirts', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/RTGD6DPx/12.png',
            'https://i.ibb.co/cKzdSStx/23.png'
        ],
        sizeImages: {
            'M': 'https://i.ibb.co/RTGD6DPx/12.png',
            'XL': 'https://i.ibb.co/cKzdSStx/23.png'
        },
        colorSizes: {
            '#c4956a': 'M',
            '#f5e6c8': 'XL'
        },
        sizeChartImg: 'https://i.ibb.co/0RVd9brV/Size-Chart-Waffle-240-GSM-OZ-T-Shirts-01.jpg',
        gsm: '240 GSM', brand: 'Python',
        sizes: {
            'M':  { price: 1450, oldPrice: 1500 },
            'XL': { price: 1450, oldPrice: 1500 }
        },
        colors: ['#c4956a', '#f5e6c8'], stock: 10,
        desc: 'Waffle T-shirts by Python. Premium 240 GSM waffle-knit fabric for a unique texture and superior comfort. Available in Light Brown and Light Yellow. A must-have wardrobe essential.'
    },
    {
        id: '19', name: 'Waffle Printed', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/7JPf15Fw/Chat-GPT-Image-Jun-5-2026-03-26-18-PM78.png',
            'https://i.ibb.co/j9XPBYs8/Chat-GPT-Image-Jun-5-2026-03-26-18-PM24.png',
            'https://i.ibb.co/CK4ZcVpH/Chat-GPT-Image-Jun-5-2026-04-31-07-PM.png',
            'https://i.ibb.co/nNbt6sjK/Chat-GPT-Image-Jun-5-2026-04-29-40-PM.png'
        ],
        sizeImages: {
            'M': 'https://i.ibb.co/7JPf15Fw/Chat-GPT-Image-Jun-5-2026-03-26-18-PM78.png',
            'XL': 'https://i.ibb.co/j9XPBYs8/Chat-GPT-Image-Jun-5-2026-03-26-18-PM24.png'
        },
        colorSizes: {
            '#c4956a': 'M',
            '#f5e6c8': 'XL'
        },
        sizeChartImg: 'https://i.ibb.co/0RVd9brV/Size-Chart-Waffle-240-GSM-OZ-T-Shirts-01.jpg',
        gsm: '240 GSM', brand: 'Python',
        sizes: {
            'M':  { price: 1850, oldPrice: null },
            'XL': { price: 1850, oldPrice: null }
        },
        colors: ['#c4956a', '#f5e6c8'], stock: 10,
        desc: 'Waffle Printed T-shirts by Python. Premium 240 GSM waffle-knit fabric for a unique texture, superior comfort, and clean prints. Features non-clickable sizes selected directly by color dots. Available in Light Brown and Light Yellow.'
    },
    {
        id: '20', name: 'Colour Elephant Design', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/67CjtFx0/Python-Infinity.png',
            'https://i.ibb.co/WWwpQsLR/Chat-GPT-Image-Jun-6-2026-10-02-04-PM.png'
        ],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1790, oldPrice: 1900 },
            'M': { price: 1790, oldPrice: 1900 },
            'L': { price: 1790, oldPrice: 1900 },
            'XL': { price: 1790, oldPrice: 1900 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Colour Elephant Design Oversized Tee (Printed) by Python. Featuring a stunning elephant artwork graphic, crafted from premium 220 GSM fabric for ultimate comfort and design definition.'
    }
];

// --- Cart System ---
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('python_cart')) || [];
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
    cart = [];
    console.error("Failed to load cart from localStorage", e);
}

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
    if(typeof updateFreeDeliveryBar === 'function') updateFreeDeliveryBar();
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

        // Determine wishlist state
        const wished = isInWishlist(p.id);
        const heartColor = wished ? 'color: #DC143C;' : 'color: var(--text-main);';

        grid.innerHTML += `
        <div class="product-card glass ${isOutOfStock ? 'out-of-stock' : ''}" 
             onclick="window.location.href='product-detail.html?id=${p.id}'" 
             onmouseenter="startHoverSlide('${p.id}', this.querySelector('.card-slider'))"
             onmouseleave="stopHoverSlide('${p.id}', this.querySelector('.card-slider'))"
             style="cursor: pointer; animation: fadeIn 0.5s ease forwards; overflow: hidden; display: flex; flex-direction: column; position: relative; ${isOutOfStock ? 'opacity: 0.7;' : ''}">
            <div class="product-image" style="overflow: hidden; position: relative; width: 100%; aspect-ratio: 1/1; border-radius: 15px;">
                ${discountBadge}
                <!-- Wishlist Toggle overlay -->
                <div class="wishlist-overlay-btn" onclick="event.stopPropagation(); handleCardWishlistToggle('${p.id}', this)" 
                     style="position: absolute; top: 15px; right: 15px; background: var(--surface); border: 1px solid var(--border-color); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 12; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
                     title="Add to Wishlist">
                    <i data-lucide="heart" style="width: 18px; height: 18px; ${heartColor}" ${wished ? 'fill="#DC143C"' : ''}></i>
                </div>
                <div class="card-slider" style="display: flex; transition: transform 0.5s ease; height: 100%; width: 100%;">
                    ${p.images.map(img => `<img src="${img}" style="width: 100%; flex-shrink: 0; height: 100%; object-fit: cover;">`).join('')}
                </div>
                ${p.images.length > 1 ? `
                <div class="card-slider-indicators">
                    ${p.images.map((_, idx) => `<div class="card-slider-indicator-dot ${idx === 0 ? 'active' : ''}"></div>`).join('')}
                </div>
                ` : ''}
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
            ${(p.category === 'Oversized Tee (Printed)' && !p.sizeChartImg) || isOutOfStock ? '' : `
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
    const container = sliderElement.parentElement;
    const dots = container.querySelectorAll('.card-slider-indicator-dot');

    hoverIntervals[productId] = setInterval(() => {
        currentIdx = (currentIdx + 1) % p.images.length;
        sliderElement.style.transform = `translateX(-${currentIdx * 100}%)`;
        
        dots.forEach((dot, idx) => {
            if (idx === currentIdx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 1000);
}

function stopHoverSlide(productId, sliderElement) {
    if (hoverIntervals[productId]) {
        clearInterval(hoverIntervals[productId]);
        delete hoverIntervals[productId];
    }
    sliderElement.style.transform = 'translateX(0)';
    
    const container = sliderElement.parentElement;
    const dots = container.querySelectorAll('.card-slider-indicator-dot');
    dots.forEach((dot, idx) => {
        if (idx === 0) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// --- Shop Filtering System ---
let currentSubcategory = 'All';
let searchQuery = '';

function handleSearch(val) {
    searchQuery = val.trim().toLowerCase();
    filterShop();
}

function selectSubcategory(subcat, btn) {
    currentSubcategory = subcat;

    // Update active subcategory styling
    document.querySelectorAll('.filter-btn').forEach(b => {
        if (b.innerText === subcat || (subcat === 'All' && (b.innerText === 'All Subcategories' || b.innerText === 'All T-Shirts')) || (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${subcat}'`))) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    filterShop();
}

function filterShop() {
    let filtered = products;

    // Filter by Subcategory (Regular Tee, Oversized Tee)
    if (currentSubcategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentSubcategory);
    }

    // Filter by Search Query
    if (searchQuery !== '') {
        filtered = filtered.filter(p => {
            const name = p.name.toLowerCase();
            const desc = (p.desc || '').toLowerCase();
            const category = (p.category || '').toLowerCase();
            const sections = (p.sections || []).map(s => s.toLowerCase());

            // 1. Direct includes match
            if (name.includes(searchQuery) || desc.includes(searchQuery) || category.includes(searchQuery)) {
                return true;
            }

            // 2. Synonyms and clothing type mapping
            const isTeeQuery = searchQuery.includes('t shirt') || searchQuery.includes('t-shirt') || searchQuery.includes('tee') || searchQuery.includes('te-shirt') || searchQuery.includes('tshirt');
            const isOversizedQuery = searchQuery.includes('oversize') || searchQuery.includes('oversized');
            const isKidsQuery = searchQuery.includes('kid') || searchQuery.includes('child');
            const isMensQuery = searchQuery.includes('men') || searchQuery.includes('boy');
            const isWomensQuery = searchQuery.includes('women') || searchQuery.includes('girl') || searchQuery.includes('lady') || searchQuery.includes('ladies');
            const isFrockQuery = searchQuery.includes('frock') || searchQuery.includes('dress');

            // If query is for a T-shirt and product is a T-shirt
            if (isTeeQuery && (category.includes('tee') || category.includes('t-shirt') || category.includes('t shirt'))) {
                // If it is also an oversized query, ensure product is oversized
                if (isOversizedQuery && !category.includes('oversized')) {
                    return false;
                }
                // If it's a kids query, check sections
                if (isKidsQuery && !sections.includes('kids')) {
                    return false;
                }
                return true;
            }

            // Kids clothing query
            if (isKidsQuery && sections.includes('kids')) {
                return true;
            }

            // Men's clothing query
            if (isMensQuery && (sections.includes('mens') || sections.includes('unisexs'))) {
                return true;
            }

            // Women's clothing query
            if (isWomensQuery && (sections.includes('womens') || sections.includes('unisexs'))) {
                return true;
            }

            // Frock or dress query
            if (isFrockQuery && (name.includes('frock') || name.includes('dress') || desc.includes('frock') || desc.includes('dress'))) {
                return true;
            }

            return false;
        });
    }

    displayProducts(filtered);

    // Empty State if 0 matching products
    const grid = document.getElementById('product-grid');
    if (grid && filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; animation: fadeIn 0.5s ease;">
                <div class="glass" style="display: inline-block; padding: 40px 60px; border-radius: 24px; border: 1px dashed var(--border-color); max-width: 450px;">
                    <i data-lucide="shopping-bag" style="width: 48px; height: 48px; color: var(--accent-gold); margin-bottom: 20px; stroke-width: 1.5;"></i>
                    <h3 style="margin-bottom: 10px; font-weight: 800; font-size: 1.3rem;">No Products Found</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">We couldn't find any products in this category. Stay tuned for the next drop!</p>
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
        selectSubcategory('All', null);
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
    
    let baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    let whatsappBaseUrl = baseUrl;
    
    if (window.location.protocol === 'file:') {
        // Construct local file path for local preview and testing so localStorage works
        baseUrl = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        baseUrl = 'file:///' + baseUrl.replace(/^\/+/g, '');
        
        // Use production path for the WhatsApp shared link
        whatsappBaseUrl = 'https://onijawathsuka39-arch.github.io/Python.-Store/';
    } else {
        whatsappBaseUrl = baseUrl;
    }
    
    const invoiceUrl = `${baseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;
    const whatsappInvoiceUrl = `${whatsappBaseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;

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

    message += `📄 *View E-Invoice:* ${whatsappInvoiceUrl}\n\n`;
    message += `Thank you for shopping with Python Store!`;

    const whatsappUrl = `https://wa.me/94757218786?text=${encodeURIComponent(message)}`;

    orders.push({ id: orderID, date: now.toLocaleDateString(), items: [...cart], total: grandTotal, userEmail: currentUser ? currentUser.email : 'Guest' });
    localStorage.setItem('python_orders', JSON.stringify(orders));
    localStorage.removeItem('python_free_delivery_active');
    const bar = document.getElementById('free-delivery-bar');
    if (bar) bar.remove();
    cart = []; saveCart();

    // Send order to backend
    fetch('save_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Order logged to backend panel:', data);
        } else {
            console.warn('Backend warning:', data.message);
        }
    })
    .catch(err => {
        console.error('Failed to log order to backend panel:', err);
    })
    .finally(() => {
        // Open WhatsApp immediately to avoid popup blockers
        window.open(whatsappUrl, '_blank');
        showNotification('Order placed successfully! Redirecting...');
        setTimeout(() => { window.location.href = invoiceUrl; }, 1500);
    });
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

// --- Free Delivery Promo Bar ---
function initFreeDeliveryBar() {
    const isShopPage = window.location.pathname.includes('shop.html');
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('offer') === 'freedelivery') {
        localStorage.setItem('python_free_delivery_active', 'true');
        window.history.replaceState({}, document.title, 'shop.html');
    }
    
    const isActive = localStorage.getItem('python_free_delivery_active') === 'true';
    if (isShopPage && isActive) {
        if (!document.getElementById('free-delivery-bar')) {
            const bar = document.createElement('div');
            bar.id = 'free-delivery-bar';
            bar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: var(--primary-dark);
                color: var(--primary-light);
                padding: 15px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
                font-size: 1rem;
                font-weight: 500;
                border-top: 3px solid var(--accent-gold);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            `;
            document.body.appendChild(bar);
            
            if (!document.getElementById('promo-animations')) {
                const style = document.createElement('style');
                style.id = 'promo-animations';
                style.innerHTML = `
                    @keyframes celebrate {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    @keyframes pop {
                        0% { transform: scale(0.9); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        updateFreeDeliveryBar();
    }
}

function updateFreeDeliveryBar() {
    const bar = document.getElementById('free-delivery-bar');
    if (!bar) return;
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (itemCount >= 4) {
        bar.innerHTML = '🎉 <span style="font-weight: 800; letter-spacing: 1px;">Congratulations! You have unlocked FREE DELIVERY!</span> 🚚';
        bar.style.animation = 'celebrate 1s ease 3, pop 0.5s ease-out';
        bar.style.background = 'var(--accent-gold)';
        bar.style.color = '#fff';
        bar.style.borderTop = '3px solid #fff';
    } else {
        const needed = 4 - itemCount;
        bar.innerHTML = `<i data-lucide="shopping-bag" style="width: 20px;"></i> Buy <b style="color: var(--accent-gold); font-size: 1.2rem; margin: 0 5px;">${needed}</b> more item${needed > 1 ? 's' : ''} to get <b style="letter-spacing: 0.5px; margin-left: 5px;">FREE DELIVERY</b> Island Wide! 🚚`;
        bar.style.animation = 'pop 0.3s ease-out';
        bar.style.background = 'var(--primary-dark)';
        bar.style.color = 'var(--primary-light)';
        bar.style.borderTop = '3px solid var(--accent-gold)';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('python_wishlist')) || [];

function toggleWishlist(productId) {
    wishlist = JSON.parse(localStorage.getItem('python_wishlist')) || [];
    const index = wishlist.indexOf(productId);
    let added = false;
    if (index === -1) {
        wishlist.push(productId);
        added = true;
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('python_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Refresh display if we are on the wishlist page
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlist();
    }
    return added;
}

function handleCardWishlistToggle(productId, btnElement) {
    const added = toggleWishlist(productId);
    const heart = btnElement.querySelector('i');
    if (added) {
        heart.setAttribute('fill', '#DC143C');
        heart.style.color = '#DC143C';
        showNotification('Added to Wishlist!');
    } else {
        heart.removeAttribute('fill');
        heart.style.color = 'var(--text-main)';
        showNotification('Removed from Wishlist!');
    }
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlistCount() {
    wishlist = JSON.parse(localStorage.getItem('python_wishlist')) || [];
    const counts = document.querySelectorAll('#wishlist-count');
    counts.forEach(el => {
        el.innerText = wishlist.length;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    updateCartCount();
    updateWishlistCount();
    handleOfferNotification();
    if (window.location.pathname.includes('cart.html')) { renderCart(); }
    if (window.location.pathname.includes('profile.html')) { loadProfile(); }
    if (window.location.pathname.includes('wishlist.html')) { renderWishlist(); }
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
    
    // Initialize Free Delivery Promo Bar if needed
    if (typeof initFreeDeliveryBar === 'function') {
        initFreeDeliveryBar();
    }
});
