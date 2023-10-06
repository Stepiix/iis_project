<?php

declare(strict_types=1);

# Response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

# Database credentials
const DB = [
    'HOSTNAME' => 'aws.connect.psdb.cloud',
    'NAME' => 'iis-project',
    'USERNAME' => 'm0os5f2qhayafe74mxkx',
    'PASSWORD' => 'pscale_pw_r4O6fgA9JkKQDBQZmxKU8xJRJ4zkawoiSVXC70UqnAP',
];

# Return database connection
function db_connect()
{
    # Specify the connection options
    $dsn = "mysql:host=" . DB['HOSTNAME'] . ";dbname=" . DB['NAME'];
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

var_dump($db);

/*$sql = "SHOW TABLES";

//Prepare our SQL statement,
$statement = $db->prepare($sql);

//Execute the statement.
$statement->execute();

//Fetch the rows from our statement.
$tables = $statement->fetchAll(PDO::FETCH_NUM);

var_dump($tables);*/
