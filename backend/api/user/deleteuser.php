<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

// Zkontrolujte, zda byl předán identifikátor uživatele v GET požadavku
if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    // Smažte uživatele s předaným identifikátorem
    $sql = "DELETE FROM User WHERE user_id = ?";
    $stmt = $db->prepare($sql);

    if ($stmt->execute([$userId])) {
        // Uživatel byl úspěšně smazán
        http_response_code(200);
        echo json_encode(array("message" => "Uživatel byl smazán"));
    } else {
        // Pokud došlo k chybě při mazání
        http_response_code(500);
        echo json_encode(array("message" => "Nelze smazat uživatele"));
    }
} else {
    // Pokud nebyl předán identifikátor uživatele
    http_response_code(400);
    echo json_encode(array("message" => "Chybí identifikátor uživatele"));
}
