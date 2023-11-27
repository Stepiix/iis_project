<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
    if (isset($_GET['id'])) {
        $user = $_GET['id'];

        // Query to get the user's role
        $roleQuery = "SELECT user_role FROM User WHERE user_id = ?";
        $roleStmt = $db->prepare($roleQuery);
        $roleStmt->execute([$user]);
        $userData = $roleStmt->fetch(PDO::FETCH_ASSOC);

        if (!$userData) {
            http_response_code(404);
            echo json_encode(array("message" => "User not found."));
            exit;
        }

        $userRole = $userData['user_role'];

        // Adjust the SQL query based on the user's role
        if ($userRole == 'student') {
            $sql = "SELECT
                        a_block.*,
                        Subject.*,
                        Activity.*
                    FROM
                        A_Block a_block
                            JOIN
                        Activity ON a_block.a_block_activity_id = Activity.activity_id
                            JOIN
                        Subject_Student ON Activity.activity_subject_code = Subject_Student.subject_code
                            JOIN
                        Subject ON Activity.activity_subject_code = Subject.subject_code
                    WHERE
                            a_block.a_block_confirmed = TRUE
                      AND Subject_Student.user_id = ?;";
        } elseif ($userRole == 'teacher') {
            $sql = "SELECT
                        a_block.*,
                        Subject.*,
                        Activity.*
                    FROM
                        A_Block a_block
                            JOIN
                        Activity ON a_block.a_block_activity_id = Activity.activity_id
                            JOIN
                        Subject_Teacher ON Activity.activity_subject_code = Subject_Teacher.subject_code
                            JOIN
                        Subject ON Activity.activity_subject_code = Subject.subject_code
                    WHERE
                            a_block.a_block_confirmed = TRUE
                      AND a_block.a_block_teacher = ?;";
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Invalid role for the user."));
            exit;
        }

        $stmt = $db->prepare($sql);
        $stmt->execute([$user]);

        $a_blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("records" => $a_blocks));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Missing 'id' parameter in the request."));
    }

    http_response_code(200);
    header("Content-Type: application/json");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodařilo se načíst uživatele.", "error" => $e->getMessage()));
}
