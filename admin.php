<?php
// PHP Admin Panel for order management (Compatible with XAMPP/Apache)
$file = 'orders.json';
$orders = [];
if (file_exists($file)) {
    $content = file_get_contents($file);
    $orders = json_decode($content, true);
    if (!is_array($orders)) {
        $orders = [];
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python Admin Console | Order Management</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --primary-dark: #F8FAFC;
            --primary-light: #0A0F1E;
            --text-main: #F8FAFC;
            --text-muted: rgba(248, 250, 252, 0.6);
            --glass: rgba(19, 25, 43, 0.85);
            --glass-border: rgba(220, 20, 60, 0.25);
            --surface: #13192B;
            --border-color: rgba(255, 255, 255, 0.1);
            --border-light: rgba(255, 255, 255, 0.05);
            --shadow-color: rgba(0, 0, 0, 0.4);
        }

        body {
            background-color: #050811;
            background-image: 
                radial-gradient(at 0% 0%, rgba(220, 20, 60, 0.08) 0, transparent 50%),
                radial-gradient(at 100% 100%, rgba(220, 20, 60, 0.05) 0, transparent 50%);
            background-attachment: fixed;
            min-height: 100vh;
            color: var(--text-main);
            padding: 40px 5%;
        }

        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            border-bottom: 1px solid var(--glass-border);
            padding-bottom: 20px;
        }

        .admin-logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .admin-logo img {
            height: 55px;
            width: auto;
        }

        .admin-logo h1 {
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 2px;
            color: var(--primary-dark);
            margin: 0;
            text-transform: uppercase;
        }

        .admin-logo span {
            color: var(--accent-gold);
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: var(--glass);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 30px var(--shadow-color);
            transition: var(--transition-smooth);
            position: relative;
            overflow: hidden;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            border-color: rgba(220, 20, 60, 0.5);
        }

        .stat-card h3 {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-muted);
            margin-bottom: 10px;
        }

        .stat-card .value {
            font-size: 2.2rem;
            font-weight: 900;
            color: var(--text-main);
        }

        .stat-card .stat-icon {
            position: absolute;
            right: 20px;
            bottom: 20px;
            opacity: 0.15;
            color: var(--accent-gold);
        }

        /* Import Order Section */
        .import-section {
            background: var(--glass);
            border: 1px solid var(--glass-border);
            padding: 25px;
            border-radius: 24px;
            margin-bottom: 40px;
            box-shadow: 0 15px 35px var(--shadow-color);
        }

        .import-section h3 {
            font-size: 1rem;
            font-weight: 900;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--primary-dark);
        }

        .import-box {
            display: flex;
            gap: 15px;
        }

        .import-box input {
            flex-grow: 1;
            padding: 15px 20px;
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: 14px;
            color: #fff;
            font-size: 0.9rem;
            outline: none;
            transition: 0.3s;
        }

        .import-box input:focus {
            border-color: var(--accent-gold);
            box-shadow: 0 0 15px rgba(220, 20, 60, 0.2);
        }

        .btn-import {
            background: var(--accent-gold);
            color: #fff;
            border: none;
            padding: 0 30px;
            border-radius: 14px;
            font-weight: 800;
            cursor: pointer;
            transition: 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-import:hover {
            background: #b30e30;
            transform: translateY(-2px);
        }

        /* Controls / Search Bar */
        .search-filter-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
            justify-content: space-between;
            align-items: center;
        }

        .search-box {
            position: relative;
            min-width: 300px;
            flex-grow: 1;
            max-width: 500px;
        }

        .search-box input {
            width: 100%;
            padding: 15px 20px 15px 50px;
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: 50px;
            color: #fff;
            font-size: 0.95rem;
            transition: 0.3s;
            outline: none;
        }

        .search-box input:focus {
            border-color: var(--accent-gold);
            box-shadow: 0 0 15px rgba(220, 20, 60, 0.25);
        }

        .search-box i {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }

        .filter-tabs {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .filter-tab {
            padding: 10px 20px;
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: 50px;
            color: var(--text-muted);
            font-weight: 800;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.85rem;
        }

        .filter-tab.active, .filter-tab:hover {
            background: var(--accent-gold);
            color: #fff;
            border-color: var(--accent-gold);
        }

        /* Orders Container */
        .orders-container {
            display: grid;
            gap: 25px;
        }

        .order-card {
            background: var(--glass);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 30px;
            box-shadow: 0 15px 35px var(--shadow-color);
            transition: var(--transition-smooth);
            position: relative;
        }

        .order-card:hover {
            box-shadow: 0 20px 45px rgba(220, 20, 60, 0.08);
            border-color: rgba(220, 20, 60, 0.4);
        }

        .order-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .order-meta h2 {
            font-size: 1.3rem;
            font-weight: 900;
            color: var(--text-main);
            margin: 0 0 5px 0;
        }

        .order-meta span {
            font-size: 0.8rem;
            color: var(--text-muted);
            font-weight: 600;
        }

        .status-badge {
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
        }

        .status-Pending { background: rgba(255, 165, 0, 0.15); color: #FFA500; border: 1px solid rgba(255, 165, 0, 0.3); }
        .status-Processing { background: rgba(0, 191, 255, 0.15); color: #00BFFF; border: 1px solid rgba(0, 191, 255, 0.3); }
        .status-Completed { background: rgba(50, 205, 50, 0.15); color: #32CD32; border: 1px solid rgba(50, 205, 50, 0.3); }
        .status-Cancelled { background: rgba(220, 20, 60, 0.15); color: #DC143C; border: 1px solid rgba(220, 20, 60, 0.3); }

        .order-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 30px;
        }

        @media (max-width: 900px) {
            .order-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Items Section */
        .order-items-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .order-item-row {
            display: flex;
            gap: 15px;
            align-items: center;
            background: rgba(255, 255, 255, 0.02);
            padding: 15px;
            border-radius: 16px;
            border: 1px solid var(--border-light);
        }

        .order-item-img {
            width: 70px;
            height: 70px;
            object-fit: contain;
            background: #fff;
            border-radius: 12px;
            padding: 5px;
            border: 1px solid var(--border-color);
        }

        .order-item-info {
            flex-grow: 1;
        }

        .order-item-title {
            font-size: 0.95rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 4px;
        }

        .order-item-meta {
            font-size: 0.78rem;
            color: var(--text-muted);
            font-weight: 600;
            display: flex;
            gap: 12px;
        }

        .order-item-price {
            font-weight: 800;
            color: var(--accent-gold);
            font-size: 0.95rem;
        }

        /* Customer Details Box */
        .customer-details-card {
            background: rgba(255, 255, 255, 0.015);
            border: 1px solid var(--border-light);
            padding: 20px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            height: fit-content;
        }

        .detail-line {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .detail-line label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            font-weight: 800;
        }

        .detail-line span {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--text-main);
        }

        .detail-line a {
            color: #00BFFF;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-weight: 800;
            transition: 0.2s;
        }

        .detail-line a:hover {
            color: var(--accent-gold);
            text-decoration: underline;
        }

        /* Order Card Actions Footer */
        .order-card-footer {
            margin-top: 25px;
            border-top: 1px solid var(--border-light);
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .total-amount-box {
            font-size: 1.3rem;
            font-weight: 900;
        }

        .total-amount-box span {
            color: var(--accent-gold);
        }

        .action-buttons {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .btn-status-action {
            padding: 10px 18px;
            border-radius: 50px;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            border: none;
            transition: 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-process { background: #00BFFF; color: #000; }
        .btn-process:hover { background: #0099cc; }
        .btn-complete { background: #32CD32; color: #000; }
        .btn-complete:hover { background: #28a728; }
        .btn-cancel { background: rgba(220, 20, 60, 0.2); color: #DC143C; border: 1px solid rgba(220, 20, 60, 0.4); }
        .btn-cancel:hover { background: rgba(220, 20, 60, 0.4); }
        .btn-delete { background: none; color: var(--text-muted); border: 1px solid var(--border-color); border-radius: 50%; width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .btn-delete:hover { background: rgba(220, 20, 60, 0.2); color: #DC143C; border-color: #DC143C; }

        /* Auto refresh controls */
        .refresh-status-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            font-weight: 800;
            color: var(--text-muted);
            background: var(--surface);
            padding: 8px 16px;
            border-radius: 50px;
            border: 1px solid var(--border-color);
        }

        .pulse-dot {
            width: 8px;
            height: 8px;
            background: #32CD32;
            border-radius: 50%;
            box-shadow: 0 0 0 0 rgba(50, 205, 50, 0.7);
            animation: pulse-green 1.5s infinite;
        }

        @keyframes pulse-green {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(50, 205, 50, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(50, 205, 50, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(50, 205, 50, 0); }
        }

        /* Empty message styling */
        .empty-orders-view {
            text-align: center;
            padding: 80px 20px;
            background: var(--glass);
            border: 1px dashed var(--glass-border);
            border-radius: 24px;
        }

        .empty-orders-view i {
            color: var(--text-muted);
            opacity: 0.3;
            margin-bottom: 20px;
        }

        .empty-orders-view h3 {
            font-size: 1.3rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 8px;
        }

        .empty-orders-view p {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        /* Invoice T-shirt Preview */
        .inv-preview {
            position: relative;
            width: 70px;
            height: 70px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            flex-shrink: 0;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }
        .inv-t-base {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            -webkit-mask-image: url('https://i.ibb.co/NnQrQr7y/T-Shirt.png');
            mask-image: url('https://i.ibb.co/NnQrQr7y/T-Shirt.png');
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
        }
        .inv-t-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            pointer-events: none;
            mix-blend-mode: multiply;
            position: relative;
            z-index: 1;
        }
        .inv-sticker {
            position: absolute;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 10;
        }
    </style>
</head>
<body>
    <div class="admin-header">
        <div class="admin-logo">
            <img src="logo.png" alt="Python Logo">
            <h1>Python <span>Admin Console</span></h1>
        </div>
        <div style="display: flex; gap: 15px; align-items: center;">
            <div class="refresh-status-badge">
                <span class="pulse-dot"></span>
                <span>Live Refresh Active</span>
            </div>
            <button onclick="playNotificationSound()" class="filter-tab" style="padding: 8px 15px; display: inline-flex; align-items: center; gap: 5px;">
                <i data-lucide="volume-2" style="width: 16px;"></i> Test Sound
            </button>
        </div>
    </div>

    <!-- Import WhatsApp Order Section -->
    <div class="import-section">
        <h3><i data-lucide="download" style="width: 18px;"></i> Import Order from WhatsApp Invoice Link</h3>
        <div class="import-box">
            <input type="text" id="import-link-input" placeholder="Paste the invoice link here (e.g. https://.../invoice.html?data=...)">
            <button class="btn-import" onclick="importWhatsAppOrder()">
                <i data-lucide="plus-circle" style="width: 18px;"></i> Import Order
            </button>
        </div>
        <div id="import-feedback" style="margin-top: 10px; font-size: 0.85rem; font-weight: 800; display: none;"></div>
    </div>

    <!-- Stats summary section -->
    <div class="stats-grid">
        <div class="stat-card">
            <h3>Total Orders</h3>
            <div class="value" id="stat-total-count">0</div>
            <i class="stat-icon" data-lucide="shopping-bag" style="width: 45px; height: 45px;"></i>
        </div>
        <div class="stat-card">
            <h3>Total Sales</h3>
            <div class="value" id="stat-total-sales">Rs. 0</div>
            <i class="stat-icon" data-lucide="dollar-sign" style="width: 45px; height: 45px;"></i>
        </div>
        <div class="stat-card">
            <h3>Pending Orders</h3>
            <div class="value" id="stat-pending-count" style="color: #FFA500;">0</div>
            <i class="stat-icon" data-lucide="clock" style="width: 45px; height: 45px;"></i>
        </div>
        <div class="stat-card">
            <h3>Completed</h3>
            <div class="value" id="stat-completed-count" style="color: #32CD32;">0</div>
            <i class="stat-icon" data-lucide="check-circle" style="width: 45px; height: 45px;"></i>
        </div>
    </div>

    <!-- Controls panel -->
    <div class="search-filter-bar">
        <div class="search-box">
            <i data-lucide="search" style="width: 18px; height: 18px;"></i>
            <input type="text" id="admin-search-input" placeholder="Search by Order ID, Customer Name, Phone..." oninput="applyFilters()">
        </div>
        <div class="filter-tabs">
            <div class="filter-tab active" data-filter="all" onclick="selectFilter('all', this)">All Orders</div>
            <div class="filter-tab" data-filter="Pending" onclick="selectFilter('Pending', this)">Pending</div>
            <div class="filter-tab" data-filter="Processing" onclick="selectFilter('Processing', this)">Processing</div>
            <div class="filter-tab" data-filter="Completed" onclick="selectFilter('Completed', this)">Completed</div>
            <div class="filter-tab" data-filter="Cancelled" onclick="selectFilter('Cancelled', this)">Cancelled</div>
        </div>
    </div>

    <!-- Orders Feed -->
    <div class="orders-container" id="admin-orders-container">
        <!-- Order cards will populate here dynamically -->
    </div>

    <script>
        // Track the current orders to detect new additions
        let currentOrdersList = [];
        let currentFilterStatus = 'all';
        let initialLoadCompleted = false;

        // Custom chime generator using Web Audio API (no dependencies)
        function playNotificationSound() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                
                // Note 1
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                gain1.gain.setValueAtTime(0.1, ctx.currentTime);
                gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                osc1.start(ctx.currentTime);
                osc1.stop(ctx.currentTime + 0.2);

                // Note 2
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
                gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc2.start(ctx.currentTime + 0.1);
                osc2.stop(ctx.currentTime + 0.35);
            } catch (e) {
                console.error("Web Audio API blocked by browser policy.", e);
            }
        }

        // Fetch orders from local JSON database
        function fetchOrders() {
            fetch('orders.json?t=' + Date.now())
                .then(res => {
                    if (!res.ok) throw new Error('No orders database found on server.');
                    return res.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) data = [];
                    processOrdersData(data);
                })
                .catch(err => {
                    console.warn(err.message);
                    renderEmptyView();
                });
        }

        const stickerMap = {
            'S1': 'https://i.ibb.co/gMrCJPnN/A3-1.png', 'S2': 'https://i.ibb.co/QFRLTykz/A3-2.png',
            'S3': 'https://i.ibb.co/S7f8ZfJs/A3-3.png', 'S4': 'https://i.ibb.co/tMccn0qh/A3-4.png',
            'S5': 'https://i.ibb.co/B5s9qhyX/A3-5.png', 'S6': 'https://i.ibb.co/bj43Hcks/A3-6.png',
            'S7': 'https://i.ibb.co/7B5DZmx/A3-7.png', 'S8': 'https://i.ibb.co/SXdG9PTc/A3-8.png',
            'S9': 'https://i.ibb.co/tp3krXPp/A3-9.png', 'S10': 'https://i.ibb.co/VY90dG3G/A3-10.png',
            'S11': 'https://i.ibb.co/1JQ00QMd/A3-11.png', 'S12': 'https://i.ibb.co/XkDb3jmB/Nike.png',
            'S13': 'https://i.ibb.co/gLS0w69Y/Python-BMW.png', 'S14': 'https://i.ibb.co/4w34h3hZ/Python-Infinity-w.png',
            'S15': 'https://i.ibb.co/84sH5Qvb/Chat-GPT-Image-Apr-29-2026-10-06-33-PM.png',
            'S16': 'https://i.ibb.co/NdBPMyjn/Chat-GPT-Image-Apr-30-2026-02-22-11-PM.png',
            'S17': 'https://i.ibb.co/0VKQ1GX2/download-23.png',
            'S18': 'https://i.ibb.co/pvszmzQC/Whats-App-Image-2026-04-28-at-16-06-29-1.png',
            'S19': 'https://i.ibb.co/XfbrZJLh/Whats-App-Image-2026-04-28-at-16-06-31.png',
            'S20': 'https://i.ibb.co/8g3YLLRP/download-25.png',
            'S21': 'https://i.ibb.co/rf382jbv/download-26.png',
            'S22': 'https://i.ibb.co/gFXHwFCX/download-27.png',
            'S23': 'https://i.ibb.co/rGGMkwkb/Ford-Mustang-Built-to-Be-Legendary.png',
            'S24': 'https://i.ibb.co/Sw7MG9wS/Kids-The-Flintstones-Fred-And-Barney-Let-s-Rock-Png-Fred-And-Barney-The-Flintstones-Fred-Barney.png',
            'S25': 'https://i.ibb.co/MyV1gShG/download-28.png',
            'S26': 'https://i.ibb.co/k2V8LGH8/download-29.png',
            'S27': 'https://i.ibb.co/XfMfT2Pc/download-30.png',
            'S28': 'https://i.ibb.co/v9nFCm5/download-31.png',
            'S29': 'https://i.ibb.co/0jNxLvYv/Believe.png',
            'S30': 'https://i.ibb.co/jnJPTYN/download-34.png',
            'S31': 'https://i.ibb.co/prLnyfzg/download-35.png',
            'S32': 'https://i.ibb.co/WW2ZJCcC/download-36.png',
            'S33': 'https://i.ibb.co/35ZHqgy3/Chat-GPT-Image-May-20-2026-07-59-26-PM.png',
            'S34': 'https://i.ibb.co/YTcqN8B8/Chat-GPT-Image-May-20-2026-08-08-16-PM.png',
            'S35': 'https://i.ibb.co/Pv9K2vTz/Ford-Mustang-Built-to-Be-Legendary.png',
            'S36': 'https://i.ibb.co/4ZnJMRK2/Kids-The-Flintstones-Fred-And-Barney-Let-s-Rock-Png-Fred-And-Barney-The-Flintstones-Fred-Barney.png',
            'S37': 'https://i.ibb.co/2Ys8HnPd/Whats-App-Image-2026-05-20-at-17-27-58-1-copy.png',
            'S38': 'https://i.ibb.co/BHf6fLxr/Whats-App-Image-2026-05-20-at-17-27-59.png',
            'S39': 'https://i.ibb.co/zHGbqMn0/honor-design.png'
        };

        const colorNames = {
            '#ffffff': 'White',
            '#1a1a1a': 'Black',
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
            '#ff91a4': 'Salmon Pink',
            '#800000': 'Maroon',
            '#900056': 'Dark Pink'
        };

        const resolveStickerUrl = (u) => {
            const originalUrl = stickerMap[u] || u;
            const localHd = localStorage.getItem('hd_mapping_' + originalUrl);
            return localHd || originalUrl;
        };

        function processOrdersData(data) {
            // Check for new orders
            if (initialLoadCompleted && data.length > currentOrdersList.length) {
                const existingIds = currentOrdersList.map(o => o.id);
                const hasNewOrder = data.some(o => !existingIds.includes(o.id));
                
                if (hasNewOrder) {
                    playNotificationSound();
                }
            }

            // Inject total if missing
            data.forEach(order => {
                if (order.total === undefined || order.total === null) {
                    const itemsSubtotal = (order.items || []).reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)), 0);
                    order.total = itemsSubtotal + (parseFloat(order.delivery) || 0);
                }
            });

            currentOrdersList = data;
            initialLoadCompleted = true;
            
            // Calculate stats
            updateStatistics(data);

            // Apply filter
            applyFilters();
        }

        function updateStatistics(data) {
            let totalSales = 0;
            let pending = 0;
            let completed = 0;

            data.forEach(order => {
                const total = parseFloat(order.total) || 0;
                const status = order.status || 'Pending';

                if (status !== 'Cancelled') {
                    totalSales += total;
                }
                if (status === 'Pending') {
                    pending++;
                } else if (status === 'Completed') {
                    completed++;
                }
            });

            document.getElementById('stat-total-count').innerText = data.length;
            document.getElementById('stat-total-sales').innerText = 'Rs. ' + totalSales.toLocaleString();
            document.getElementById('stat-pending-count').innerText = pending;
            document.getElementById('stat-completed-count').innerText = completed;
        }

        function selectFilter(status, btn) {
            document.querySelectorAll('.filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            currentFilterStatus = status;
            applyFilters();
        }

        function applyFilters() {
            const searchQuery = document.getElementById('admin-search-input').value.toLowerCase().trim();
            const container = document.getElementById('admin-orders-container');
            
            const filteredOrders = currentOrdersList.filter(order => {
                const orderId = (order.id || '').toLowerCase();
                const clientName = (order.name || '').toLowerCase();
                const clientPhone = (order.phone || '').toLowerCase();
                const orderStatus = order.status || 'Pending';

                const matchesStatus = (currentFilterStatus === 'all' || orderStatus === currentFilterStatus);
                const matchesSearch = (!searchQuery || 
                    orderId.includes(searchQuery) || 
                    clientName.includes(searchQuery) || 
                    clientPhone.includes(searchQuery)
                );

                return matchesStatus && matchesSearch;
            });

            if (filteredOrders.length === 0) {
                renderEmptyView();
                return;
            }

            // Render matching orders
            container.innerHTML = filteredOrders.map(order => {
                const status = order.status || 'Pending';
                const itemsCount = (order.items || []).reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);
                const clientPhoneFormatted = (order.phone || '').replace(/[^0-9]/g, '');

                let statusActionsHtml = '';
                if (status === 'Pending') {
                    statusActionsHtml = `
                        <button class="btn-status-action btn-process" onclick="updateOrderStatus('${order.id}', 'Processing')">
                            <i data-lucide="play" style="width: 14px; height: 14px;"></i> Accept & Process
                        </button>
                        <button class="btn-status-action btn-cancel" onclick="updateOrderStatus('${order.id}', 'Cancelled')">
                            Cancel
                        </button>
                    `;
                } else if (status === 'Processing') {
                    statusActionsHtml = `
                        <button class="btn-status-action btn-complete" onclick="updateOrderStatus('${order.id}', 'Completed')">
                            <i data-lucide="check" style="width: 14px; height: 14px;"></i> Mark Completed
                        </button>
                        <button class="btn-status-action btn-cancel" onclick="updateOrderStatus('${order.id}', 'Cancelled')">
                            Cancel
                        </button>
                    `;
                } else if (status === 'Completed' || status === 'Cancelled') {
                    statusActionsHtml = `
                        <button class="btn-status-action btn-cancel" style="background: var(--surface); color: var(--text-muted); border: 1px solid var(--border-color);" onclick="updateOrderStatus('${order.id}', 'Pending')">
                            Reset to Pending
                        </button>
                    `;
                }

                const dateDisplay = order.date ? `${order.date} ${order.time ? '| ' + order.time : ''}` : 'N/A';

                return `
                    <div class="order-card" id="card-${order.id}">
                        <div class="order-card-header">
                            <div class="order-meta">
                                <h2>#${order.id}</h2>
                                <span>Ordered: ${dateDisplay}</span>
                            </div>
                            <div>
                                <span class="status-badge status-${status}">${status}</span>
                            </div>
                        </div>
                        
                        <div class="order-grid">
                            <!-- Items Section -->
                            <div class="order-items-list">
                                <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 5px;">Ordered Items (${itemsCount})</h4>
                                ${(order.items || []).map(item => {
                                    const itemImage = item.image || 'https://i.ibb.co/NnQrQr7y/T-Shirt.png';
                                    let previewHtml = `<img src="${itemImage}" class="order-item-img" alt="${item.name}">`;
                                    let customDetails = '';

                                    if (item.isCustom && item.customStickers && item.customStickers.length > 0) {
                                        const colorNameClean = (item.color || "").trim().toLowerCase();
                                        const bgColor = (item.color && item.color.startsWith('#')) ? item.color :
                                                       Object.keys(colorNames).find(key => colorNames[key].trim().toLowerCase() === colorNameClean) || '#ffffff';

                                        const isWaffle = item.name.includes('Waffle');
                                        let baseImgSrc = 'https://i.ibb.co/NnQrQr7y/T-Shirt.png';
                                        let baseStyles = `background-color: ${bgColor};`;
                                        let imgStyles = `mix-blend-mode: multiply;`;

                                        if (isWaffle) {
                                            const isBrown = bgColor === '#c4956a' || colorNameClean.includes('brown');
                                            baseImgSrc = isBrown ? 'https://i.ibb.co/RTGD6DPx/12.png' : 'https://i.ibb.co/cKzdSStx/23.png';
                                            baseStyles = 'background-color: transparent; -webkit-mask-image: none; mask-image: none;';
                                            imgStyles = 'mix-blend-mode: normal;';
                                        }

                                        const resolveWidth = (w, containerPx) => {
                                            if (!w) return containerPx * 0.29 + 'px';
                                            const ws = String(w);
                                            if (ws.endsWith('%')) return ws;
                                            const px = parseFloat(ws) || 0;
                                            return (px / 4) + 'px';
                                        };

                                        previewHtml = `
                                            <div class="inv-preview">
                                                <div class="inv-t-base" style="${baseStyles}">
                                                    <img src="${baseImgSrc}" class="inv-t-img" style="${imgStyles}">
                                                    ${item.customStickers.map(s => {
                                                        const url = resolveStickerUrl(s.u);
                                                        const rot = s.r || 0;
                                                        const w = resolveWidth(s.w, 70);
                                                        return `<img src="${url}" class="inv-sticker" style="top: ${s.t}; left: ${s.l}; width: ${w}; transform: translate(-50%, -50%) rotate(${rot}deg);">`;
                                                    }).join('')}
                                                </div>
                                            </div>
                                        `;

                                        customDetails = `
                                            <div style="margin-top: 10px; padding: 10px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; border: 1px solid var(--border-light); width: 100%;">
                                                <div style="font-size: 0.72rem; font-weight: 800; color: #00BFFF; margin-bottom: 8px; display: flex; align-items: center; gap: 5px;">
                                                    <i data-lucide="palette" style="width: 12px; height: 12px;"></i> Custom Stickers Specs:
                                                </div>
                                                ${item.customStickers.map((s, idx) => {
                                                    const resolvedUrl = resolveStickerUrl(s.u);
                                                    return `
                                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; font-size: 0.7rem; border-bottom: 1px dashed rgba(255,255,255,0.05); padding-bottom: 6px;">
                                                            <img src="${resolvedUrl}" style="width: 30px; height: 30px; object-fit: contain; background: #fff; border-radius: 4px; padding: 2px;">
                                                            <div style="flex-grow: 1;">
                                                                <span style="font-weight: 800;">Sticker #${idx+1} (${s.sz || 'A3'})</span>
                                                                <span style="display: block; font-size: 0.65rem; color: var(--text-muted);">Size: ${s.sz || 'A3'} | Price: Rs. ${s.p || 0}</span>
                                                            </div>
                                                            <a href="${resolvedUrl}" target="_blank" style="font-size: 0.65rem; color: #32CD32; text-decoration: none; font-weight: 800;">Open HD</a>
                                                        </div>
                                                    `;
                                                }).join('')}
                                            </div>
                                        `;
                                    }

                                    return `
                                        <div class="order-item-row" style="flex-wrap: wrap;">
                                            <div style="display: flex; gap: 15px; align-items: center; width: 100%;">
                                                ${previewHtml}
                                                <div class="order-item-info">
                                                    <div class="order-item-title">${item.name}</div>
                                                    <div class="order-item-meta">
                                                        <span>Size: <b>${item.size || 'Free'}</b></span>
                                                        <span>Color: <b>${item.color || 'Default'}</b></span>
                                                        <span>Qty: <b>${item.quantity || 1}</b></span>
                                                    </div>
                                                </div>
                                                <div class="order-item-price">Rs. ${(parseFloat(item.price) || 0).toLocaleString()}</div>
                                            </div>
                                            ${customDetails}
                                        </div>
                                    `;
                                }).join('')}
                            </div>

                            <!-- Customer Information Details -->
                            <div class="customer-details-card">
                                <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 5px;">Delivery Details</h4>
                                <div class="detail-line">
                                    <label>Customer Name</label>
                                    <span>${order.name || 'Guest User'}</span>
                                </div>
                                <div class="detail-line">
                                    <label>Phone Number</label>
                                    <span>
                                        ${order.phone || 'N/A'}
                                        ${order.phone ? `<a href="https://wa.me/${clientPhoneFormatted}" target="_blank" style="margin-left: 10px;"><i data-lucide="message-circle" style="width: 14px; height: 14px;"></i> WhatsApp Chat</a>` : ''}
                                    </span>
                                </div>
                                <div class="detail-line">
                                    <label>Shipping Address</label>
                                    <span>${order.address || 'N/A'}</span>
                                </div>
                                <div class="detail-line">
                                    <label>Invoice View</label>
                                    <span>
                                        <a href="invoice.html?id=${order.id}&local_fallback=true" onclick="openInvoicePage(event, '${order.id}', '${btoa(unescape(encodeURIComponent(JSON.stringify(order))))}')" target="_blank">
                                            <i data-lucide="file-text" style="width: 14px; height: 14px;"></i> Open E-Invoice
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="order-card-footer">
                            <div class="total-amount-box">
                                Total: <span>Rs. ${(parseFloat(order.total) || 0).toLocaleString()}.00</span>
                                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; display: block;">Delivery Fee: ${order.delivery == 0 ? 'FREE' : 'Rs. ' + order.delivery}</span>
                            </div>
                            <div class="action-buttons">
                                ${statusActionsHtml}
                                <button class="btn-delete" title="Delete Order Record" onclick="deleteOrderRecord('${order.id}')">
                                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            lucide.createIcons();
        }

        function renderEmptyView() {
            const container = document.getElementById('admin-orders-container');
            container.innerHTML = `
                <div class="empty-orders-view">
                    <i data-lucide="inbox" style="width: 60px; height: 60px;"></i>
                    <h3>No matching orders found</h3>
                    <p>Paste customer's WhatsApp invoice links above to import orders, or place orders locally to see them here.</p>
                </div>
            `;
            lucide.createIcons();
        }

        // Action updates status via update_order_status.php AJAX request
        function updateOrderStatus(id, status) {
            fetch('update_order_status.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update_status', id: id, status: status })
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const orderIdx = currentOrdersList.findIndex(o => o.id === id);
                    if (orderIdx !== -1) {
                        currentOrdersList[orderIdx].status = status;
                    }
                    processOrdersData(currentOrdersList);
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(err => {
                console.error("AJAX error updating status:", err);
                alert("Failed to update status on server.");
            });
        }

        // Delete order record
        function deleteOrderRecord(id) {
            if (confirm("Are you sure you want to permanently delete order #" + id + "? This action cannot be undone.")) {
                fetch('update_order_status.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id: id })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        currentOrdersList = currentOrdersList.filter(o => o.id !== id);
                        processOrdersData(currentOrdersList);
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(err => {
                    console.error("AJAX error deleting order:", err);
                    alert("Failed to delete order on server.");
                });
            }
        }

        // Pasting invoice link parsing function
        function importWhatsAppOrder() {
            const input = document.getElementById('import-link-input');
            const feedback = document.getElementById('import-feedback');
            const linkVal = input.value.trim();

            if (!linkVal) {
                showFeedback('Please paste a link first.', 'red');
                return;
            }

            try {
                // Parse the link query parameters
                const url = new URL(linkVal);
                const dataParam = url.searchParams.get('data');

                if (!dataParam) {
                    showFeedback('Invalid Link. Could not find order data payload (?data=...).', 'red');
                    return;
                }

                // Decode base64
                const jsonStr = decodeURIComponent(escape(atob(dataParam)));
                const orderData = JSON.parse(jsonStr);

                if (!orderData || !orderData.id) {
                    showFeedback('Invalid order payload structure inside link.', 'red');
                    return;
                }

                showFeedback('Sending order to local database...', 'gold');

                // POST to save_order.php
                fetch('save_order.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                })
                .then(res => res.json())
                .then(resData => {
                    if (resData.status === 'success') {
                        showFeedback(`Successfully imported Order #${orderData.id}!`, 'green');
                        input.value = '';
                        fetchOrders(); // Reload orders grid
                    } else {
                        showFeedback('Failed: ' + resData.message, 'red');
                    }
                })
                .catch(err => {
                    console.error('Server error saving order:', err);
                    showFeedback('Failed to contact local server: ' + err.message, 'red');
                });

            } catch (err) {
                console.error(err);
                showFeedback('Failed to parse link: ' + err.message, 'red');
            }
        }

        function showFeedback(text, colorHex) {
            const feedback = document.getElementById('import-feedback');
            feedback.innerText = text;
            feedback.style.display = 'block';
            if (colorHex === 'red') {
                feedback.style.color = '#DC143C';
            } else if (colorHex === 'green') {
                feedback.style.color = '#32CD32';
            } else {
                feedback.style.color = '#FFA500';
            }
        }

        function openInvoicePage(event, orderId, base64Data) {
            event.preventDefault();
            const targetUrl = 'invoice.html?data=' + encodeURIComponent(base64Data);
            window.open(targetUrl, '_blank');
        }

        // Start polling loop
        window.onload = () => {
            fetchOrders();
            lucide.createIcons();
            
            // Loop check every 5 seconds
            setInterval(fetchOrders, 5000);
        };
    </script>
</body>
</html>
