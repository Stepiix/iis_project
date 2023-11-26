<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$blocks = json_decode(file_get_contents("php://input"));

var_dump($blocks);

if (isset($blocks->user_id)) {
    $stmtDelete = $db->prepare("DELETE FROM A_Block WHERE a_block_teacher = ?");
    $stmtDelete->execute([$blocks->user_id]); 
    $response = array("message" => "T_Block upraven.");
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode($response);
} else {
    try {
        $db->beginTransaction();

       
        $stmtDelete = $db->prepare("DELETE FROM A_Block WHERE a_block_teacher = ?");
        $stmtDelete->execute([$blocks[0]->a_block_user_id]); 


        $stmtInsert = $db->prepare("INSERT INTO A_Block
        (a_block_day, a_block_begin, a_block_end, a_block_activity_id, a_block_confirmed, a_block_teacher)
        VALUES (?, ?, ?, ?, ?, ?)");

        foreach ($blocks as $block) {
            $stmtInsert->execute([$block->a_block_day, $block->a_block_begin, $block->a_block_end, $block->a_block_activity_id,
                                  0, $block->a_block_user_id]);
        }

        $db->commit();

        $response = array("message" => "A_Block upraven.");
        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode($response);

    } catch (Exception $e) {
        $db->rollBack();

        $response = array("message" => "Chyba při úpravě A_Block: " . $e->getMessage());
        http_response_code(500);
        header("Content-Type: application/json");
        echo json_encode($response);
    }
}
