<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

if (!isset($_GET['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing order ID.']);
    exit;
}

$orderId = $_GET['id'];
$file = 'orders.json';

if (!file_exists($file)) {
    echo json_encode(['status' => 'Pending']); // Fallback default
    exit;
}

$content = file_get_contents($file);
$orders = json_decode($content, true);

if (!is_array($orders)) {
    echo json_encode(['status' => 'Pending']);
    exit;
}

foreach ($orders as $order) {
    if (isset($order['id']) && $order['id'] === $orderId) {
        echo json_encode(['status' => $order['status']]);
        exit;
    }
}

echo json_encode(['status' => 'Pending']);
?>
