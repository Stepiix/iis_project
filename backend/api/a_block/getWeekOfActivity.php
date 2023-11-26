<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
    if (isset($_GET['a_block_id'])) {
        $a_block_id = $_GET['a_block_id'];

        $sql = "SELECT Activity.activity_week
        FROM A_Block
        JOIN Activity ON A_Block.a_block_activity_id = Activity.activity_id
        WHERE A_Block.a_block_id = ?";

        $stmt = $db->prepare($sql);
        $stmt->execute([$a_block_id]);

        $a_blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode(array("records" => $a_blocks));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodarilo se nacist tyden", "error" => $e->getMessage()));
}
