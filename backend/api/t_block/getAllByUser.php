<?php

include '../database.php';

/** @var PDO $db */

$requestBody = json_decode(file_get_contents("php://input"));
$user_id = $requestBody->user_id;


try {
    $sql = "SELECT * FROM T_Block WHERE t_block_user_id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$user_id]);

    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(array("records" => $subjects));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodařilo se načíst místnosti.", "error" => $e->getMessage()));
}
