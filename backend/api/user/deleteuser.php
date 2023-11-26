<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    $sql = "DELETE FROM User WHERE user_id = ?";
    $stmt = $db->prepare($sql);

    if ($stmt->execute([$userId])) {
        http_response_code(200);
        echo json_encode(array("message" => "Uživatel byl smazán"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Nelze smazat uživatele"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Chybí identifikátor uživatele"));
}
