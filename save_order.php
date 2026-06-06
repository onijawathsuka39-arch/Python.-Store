<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

// Get the raw POST content
$rawInput = file_get_contents('php://input');
$orderData = json_decode($rawInput, true);

if (!$orderData || !isset($orderData['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid order data.']);
    exit;
}

$file = 'orders.json';
$orders = [];

if (file_exists($file)) {
    $content = file_get_contents($file);
    $orders = json_decode($content, true);
    if (!is_array($orders)) {
        $orders = [];
    }
}

// Check if this order ID already exists to prevent duplicate entries
$exists = false;
foreach ($orders as $order) {
    if (isset($order['id']) && $order['id'] === $orderData['id']) {
        $exists = true;
        break;
    }
}

if (!$exists) {
    // Inject default status if not set
    if (!isset($orderData['status'])) {
        $orderData['status'] = 'Pending';
    }
    // Append or prepend the order. We'll prepend to keep new orders at the top.
    array_unshift($orders, $orderData);
    
    // Save back to JSON file
    if (file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT), LOCK_EX) !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Order saved successfully.', 'order_id' => $orderData['id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save order to disk. Check folder permissions.']);
    }
} else {
    echo json_encode(['status' => 'success', 'message' => 'Order already logged.', 'order_id' => $orderData['id']]);
}
?>
