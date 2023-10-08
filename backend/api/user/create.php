<?php

declare(strict_types=1);

include '../database.php';

/** @var TYPE_NAME $db */

$data = json_decode(file_get_contents("php://input"));

$response = array("message" => "Uživatel vytvořen");

http_response_code(200);
header("Content-Type: application/json");

echo json_encode($response);