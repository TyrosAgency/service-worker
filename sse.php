<?php

// set_time_limit(0);

// date_default_timezone_set("Europe/Tirane");
// header("Cache-Control: no-store");
// header("Content-Type: text/event-stream");

// $fileToCheck = "moussa.txt";

// $fh = fopen("lastmodified.txt", "r");
// $lastModified = fread($fh, filesize("lastmodified.txt"));
// fclose($fh);

// if($lastModified < filemtime($fileToCheck))
// {
//     $lastModified = filemtime($fileToCheck);
//     $fh = fopen("lastmodified.txt", "w");
//     fwrite($fh, $lastModified);
//     fclose($fh);
//     // Clear the cache or perform other operations
//     // Send SSE event to the client
//     echo "event: cache-cleared\ndata: Cache cleared successfully.\n\n";
//     echo "retry: 15000\n\n"; // Reconnect after 15 seconds (in milliseconds)
// }



/////////////////////////////////////////////////////////////////////////////////////////////////
// set_time_limit(0);

// date_default_timezone_set("Europe/Tirane");
// header("Cache-Control: no-store");
// header("Content-Type: text/event-stream");

// $fileToCheck = "moussa.txt";

// $lastModified = file_get_contents("lastmodified.txt");

// if ($lastModified < filemtime($fileToCheck)) {
//     $lastModified = filemtime($fileToCheck);
//     file_put_contents("lastmodified.txt", $lastModified);
//     // Clear the cache or perform other operations
//     // Send SSE event to the client
//     echo "event: cache-cleared\ndata: Cache cleared successfully.\n\n";
//     echo "retry: 15000\n\n"; // Reconnect after 15 seconds (in milliseconds)
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////
set_time_limit(0);

date_default_timezone_set("Europe/Tirane");
header("Cache-Control: no-store");
header("Content-Type: text/event-stream");

// try {
//     $fileToCheck = "moussa.txt";

//     $lastModified = file_get_contents("lastmodified.txt");

//     if ($lastModified !== false && $lastModified < filemtime($fileToCheck)) {
//         $lastModified = filemtime($fileToCheck);
//         file_put_contents("lastmodified.txt", $lastModified);
//         // Clear the cache or perform other operations
//         // Send SSE event to the client
//         echo "event: cache-cleared\ndata: Cache cleared successfully.\n\n";
//         echo "retry: 15000\n\n"; // Reconnect after 15 seconds (in milliseconds)

//     }
// } catch (Exception $e) {
//     // Handle any exceptions that occur during file operations
//     // Log the error or perform appropriate error handling
//     echo "event: error\n";
//     echo "data: An error occurred: " . $e->getMessage() . "\n\n";

// }




set_time_limit(0);

date_default_timezone_set("Europe/Tirane");
header("Cache-Control: no-store");
header("Content-Type: text/event-stream");

try {
    $fileToCheck = "styles.css";
    $lastModifiedFile = "lastmodified.txt";
    // Check if the file exists
    if (!file_exists($lastModifiedFile)) {
        // If the file doesn't exist, create it
        $file = fopen($lastModifiedFile, "w");
        if ($file) {
            // Write something to the file (e.g., an initial timestamp)
            $initialContent = "Initial content\n";
            fwrite($file, $initialContent);
            fclose($file);
            echo "File created successfully with initial content.";
        } else {
            echo "Failed to create the file.";
        }
    } else {
        $lastModified = file_get_contents($lastModifiedFile);

        $currentFileModifiedTime = filemtime($fileToCheck);

        if ($lastModified !== false && $lastModified < $currentFileModifiedTime) {
            $lastModified = $currentFileModifiedTime;
            file_put_contents($lastModifiedFile, $lastModified);
            // Clear the cache or perform other operations
            // Send SSE event to the client
            echo "event: cache-cleared\ndata: Cache cleared successfully.\n\n";
            echo "retry: 15000\n\n"; // Reconnect after 15 seconds (in milliseconds)
        }
    }
} catch (Exception $e) {
    // Handle any exceptions that occur during file operations
    // Log the error or perform appropriate error handling
    echo "event: error\n";
    echo "data: An error occurred: " . $e->getMessage() . "\n\n";
}
