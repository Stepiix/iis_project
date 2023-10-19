<?php

declare(strict_types=1);

include '../database.php';

/** @var TYPE_NAME $db */

$user = json_decode(file_get_contents("php://input"));


if (isset($user)) {

    $pwd = password_hash($user->password, PASSWORD_DEFAULT);
//    $user->password = "nazdar";
    $sql = "INSERT INTO User (user_firstname, user_lastname, user_email, user_password, user_role)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $db->prepare($sql);

    $stmt->execute([$user->firstname, $user->lastname, $user->email, $pwd, $user->role]);
}

$response = array("message" => "Uživatel vytvořen");

http_response_code(200);
header("Content-Type: application/json");

//echo json_encode($response);