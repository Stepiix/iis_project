<?php
declare(strict_types=1);

include '../database.php';

try {
    $sql = "SELECT user_id, user_firstname, user_lastname, user_email, user_role FROM User"; // Přidáno user_id do SQL dotazu
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    header("Content-Type: application/json");

    echo json_encode(array("records" => $users));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodařilo se načíst uživatele.", "error" => $e->getMessage()));
}
