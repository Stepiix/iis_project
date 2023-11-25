<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
    // Check if 'id' parameter is set in the GET request
    if (isset($_GET['id'])) {
        $garant = $_GET['id'];
        $sql = "SELECT a.activity_id, a.activity_type, a.activity_length, a.activity_week, a.activity_subject_code
            FROM Activity a INNER JOIN Subject s ON a.activity_subject_code = s.subject_code WHERE
            s.subject_guarantor = ?";

        $stmt = $db->prepare($sql);
        $stmt->execute([$garant]);

        $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("records" => $activities));
    } else {
        // If 'id' parameter is not set, return a response indicating the issue
        http_response_code(400);
        echo json_encode(array("message" => "Missing 'id' parameter in the request."));
    }

    http_response_code(200);
    header("Content-Type: application/json");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodařilo se načíst uživatele.", "error" => $e->getMessage()));
}
