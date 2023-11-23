<?php

declare(strict_types=1);

include '../database.php';

/** @var TYPE_NAME $db */

$user = json_decode(file_get_contents("php://input"));


if (isset($user)) {


    // $sql = "INSERT INTO User (user_firstname, user_lastname, user_email, user_role)
    //         VALUES (?, ?, ?, ?, ?)";
    $sql = "UPDATE User
        SET user_firstname = ?,
            user_lastname = ?,
            user_email = ?,
            user_role = ?
        WHERE user_id = ?";

    $stmt = $db->prepare($sql);

    $stmt->execute([$user->firstname, $user->lastname, $user->email, $user->role, $user->id]);
}

$response = array("message" => "Uzivatel upraven");

http_response_code(200);
header("Content-Type: application/json");