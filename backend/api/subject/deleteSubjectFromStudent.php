<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

if (isset($_GET['subject_code']) && isset($_GET['user_id'])) {
    $sbj_code = $_GET['subject_code'];
    $usr_id = $_GET['user_id'];

    $sql = "DELETE FROM Subject_Student WHERE subject_code = ? AND user_id = ?";
    $stmt = $db->prepare($sql);

    if ($stmt->execute([$sbj_code, $usr_id])) {
        http_response_code(200);
        echo json_encode(array("message" => "Studentovi byl predmet odebran"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Nelze odebrat uzivatele"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Chybi subject_code nebo user_id"));
}
?>