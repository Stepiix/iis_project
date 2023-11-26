<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$blocks = json_decode(file_get_contents("php://input"));

if (isset($blocks->user_id)) {
    $stmtDelete = $db->prepare("DELETE FROM T_Block WHERE t_block_user_id = ?");
    $stmtDelete->execute([$blocks->user_id]); 
    $response = array("message" => "T_Block upraven.");
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode($response);
} else {
    try {
        $db->beginTransaction();

        $stmtDelete = $db->prepare("DELETE FROM T_Block WHERE t_block_user_id = ?");
        $stmtDelete->execute([$blocks[0]->user_id]); 

        $stmtInsert = $db->prepare("INSERT INTO T_Block (t_block_day, t_block_begin, t_block_end, t_block_user_id) VALUES (?, ?, ?, ?)");

        foreach ($blocks as $block) {
            $stmtInsert->execute([$block->day, $block->start, $block->end, $block->user_id]);
        }

        $db->commit();

        $response = array("message" => "T_Block upraven.");
        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode($response);

    } catch (Exception $e) {
        $db->rollBack();

        $response = array("message" => "Chyba při úpravě T_Block: " . $e->getMessage());
        http_response_code(500);
        header("Content-Type: application/json");
        echo json_encode($response);
    }
}
