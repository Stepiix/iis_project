<?php

declare(strict_types=1);

$uri = "mysql://avnadmin:AVNS_W7UlG2FIUojsrrK3RU7@mysql-iis-project-iis-project.aivencloud.com:21062/defaultdb?ssl-mode=REQUIRED";

$fields = parse_url($uri);

// build the DSN including SSL settings
$conn = "mysql:";
$conn .= "host=" . $fields["host"];
$conn .= ";port=" . $fields["port"];;
$conn .= ";dbname=defaultdb";
$conn .= ";sslmode=verify-ca;sslrootcert=ca.pem";

try {
    $db = new PDO($conn, $fields["user"], $fields["pass"]);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$sql = 'SHOW TABLES';

$stmt = $db->prepare($sql);
$stmt->execute();

$tables = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo '<pre>';

var_dump($tables);

echo '</pre>';

/*
# Response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

# Database credentials
const DB = [
    'HOSTNAME' => 'mysql-iis-project-iis-project.aivencloud.com',
    'DBNAME' => 'defaultdb',
    'PORT' => 21062,
    'USERNAME' => 'avnadmin',
    'PASSWORD' => 'AVNS_W7UlG2FIUojsrrK3RU7',
];

# Return database connection
function db_connect()
{
    # Specify the connection options
    $dsn = "mysql:host=" . DB['HOSTNAME'] . ";port=" . DB['PORT'] . ";dbname=" . DB['DBNAME'];
    $options = array(
        # Needed in order to connect to the database
        PDO::MYSQL_ATTR_SSL_CA => "../certificates/cacert-2023-08-22.pem",
    );

    # Create a new database connection
    try {
        $conn = new PDO(
            $dsn,
            DB['USERNAME'],
            DB['PASSWORD'],
            $options
        );
    } catch (PDOException $e) {
        echo "Connection error: ".$e->getMessage();
        die();
    }

    return $conn;
}

# Database variable
$db = db_connect();

var_dump($db);*/

/*$sql = "SHOW TABLES";

//Prepare our SQL statement,
$statement = $db->prepare($sql);

//Execute the statement.
$statement->execute();

//Fetch the rows from our statement.
$tables = $statement->fetchAll(PDO::FETCH_NUM);

var_dump($tables);*/
