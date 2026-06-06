<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !isset($data['action']) || !isset($data['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing action or order ID.']);
    exit;
}

$action = $data['action'];
$orderId = $data['id'];
$file = 'orders.json';

if (!file_exists($file)) {
    echo json_encode(['status' => 'error', 'message' => 'Orders database not found.']);
    exit;
}

$content = file_get_contents($file);
$orders = json_decode($content, true);

if (!is_array($orders)) {
    echo json_encode(['status' => 'error', 'message' => 'Corrupt orders database.']);
    exit;
}

$success = false;

if ($action === 'update_status') {
    if (!isset($data['status'])) {
        echo json_encode(['status' => 'error', 'message' => 'Status value missing.']);
        exit;
    }
    
    $newStatus = $data['status'];
    $allowedStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
    
    if (!in_array($newStatus, $allowedStatuses)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid status code.']);
        exit;
    }
    
    for ($i = 0; $i < count($orders); $i++) {
        if (isset($orders[$i]['id']) && $orders[$i]['id'] === $orderId) {
            $orders[$i]['status'] = $newStatus;
            $success = true;
            break;
        }
    }
} elseif ($action === 'delete') {
    $initialCount = count($orders);
    $orders = array_values(array_filter($orders, function($order) use ($orderId) {
        return !(isset($order['id']) && $order['id'] === $orderId);
    }));
    
    if (count($orders) < $initialCount) {
        $success = true;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Unknown action.']);
    exit;
}

if ($success) {
    if (file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT), LOCK_EX) !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Database updated successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to write updates to disk. Check permissions.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Order ID not found.']);
}
?>
