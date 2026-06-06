const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure directories exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads', { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----------------------------------------------------
// 1. ORDER LOG ENDPOINT (save_order.php emulation)
// ----------------------------------------------------
const ordersFile = path.join(__dirname, 'orders.json');

app.post(['/save_order.php', '/save_order'], (req, res) => {
    try {
        const orderData = req.body;
        if (!orderData || !orderData.id) {
            return res.status(400).json({ status: 'error', message: 'Invalid order data.' });
        }

        let orders = [];
        if (fs.existsSync(ordersFile)) {
            const content = fs.readFileSync(ordersFile, 'utf8');
            try {
                orders = JSON.parse(content);
                if (!Array.isArray(orders)) orders = [];
            } catch (e) {
                orders = [];
            }
        }

        // Check duplicate Order ID
        const exists = orders.some(o => o.id === orderData.id);
        if (!exists) {
            if (!orderData.status) {
                orderData.status = 'Pending';
            }
            // Add to the beginning of the list
            orders.unshift(orderData);
            fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
            return res.json({ status: 'success', message: 'Order saved successfully.', order_id: orderData.id });
        } else {
            return res.json({ status: 'success', message: 'Order already logged.', order_id: orderData.id });
        }
    } catch (err) {
        console.error('Error saving order:', err);
        return res.status(500).json({ status: 'error', message: 'Server error saving order: ' + err.message });
    }
});

// ----------------------------------------------------
// 2. ORDER UPDATE/DELETE ENDPOINT (update_order_status.php emulation)
// ----------------------------------------------------
app.post(['/update_order_status.php', '/update_order_status'], (req, res) => {
    try {
        const { action, id, status } = req.body;
        if (!action || !id) {
            return res.status(400).json({ status: 'error', message: 'Missing action or order ID.' });
        }

        if (!fs.existsSync(ordersFile)) {
            return res.status(404).json({ status: 'error', message: 'Orders database not found.' });
        }

        const content = fs.readFileSync(ordersFile, 'utf8');
        let orders = JSON.parse(content);
        if (!Array.isArray(orders)) {
            return res.status(500).json({ status: 'error', message: 'Corrupt orders database.' });
        }

        let success = false;

        if (action === 'update_status') {
            if (!status) {
                return res.status(400).json({ status: 'error', message: 'Status value missing.' });
            }
            const allowedStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ status: 'error', message: 'Invalid status code.' });
            }

            for (let i = 0; i < orders.length; i++) {
                if (orders[i].id === id) {
                    orders[i].status = status;
                    success = true;
                    break;
                }
            }
        } else if (action === 'delete') {
            const initialCount = orders.length;
            orders = orders.filter(o => o.id !== id);
            if (orders.length < initialCount) {
                success = true;
            }
        } else {
            return res.status(400).json({ status: 'error', message: 'Unknown action.' });
        }

        if (success) {
            fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
            return res.json({ status: 'success', message: 'Database updated successfully.' });
        } else {
            return res.status(404).json({ status: 'error', message: 'Order ID not found.' });
        }
    } catch (err) {
        console.error('Error updating order:', err);
        return res.status(500).json({ status: 'error', message: 'Server error updating order: ' + err.message });
    }
});

// ----------------------------------------------------
// 3. FILE UPLOAD ENDPOINT (upload.php emulation)
// ----------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) || '.png';
        const uniqueSuffix = 'sticker_' + Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only standard images are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

app.post(['/upload.php', '/upload'], (req, res) => {
    const uploadSingle = upload.single('sticker');
    
    uploadSingle(req, res, function (err) {
        if (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }
        
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
        }

        const relativeUrl = 'uploads/' + req.file.filename;
        const fullUrl = req.protocol + '://' + req.get('host') + '/' + relativeUrl;

        return res.json({
            status: 'success',
            url: relativeUrl,
            full_url: fullUrl
        });
    });
});

// Serve static website files from the current root folder
app.use(express.static(__dirname));

// Redirect slash or base to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`===================================================`);
    console.log(`⚡ Python Store Server runs successfully!`);
    console.log(`👉 Access on this laptop: http://localhost:${PORT}`);
    console.log(`👉 Access on local network: Find your laptop IP`);
    console.log(`===================================================`);
});
