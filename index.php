<?php
header("Cache-Control: private, no-store, must-revalidate");
?>
<!DOCTYPE html>
<html>

<head>
    <title>My Website</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="script.js"></script>
    <script src="service-worker.js"></script>
</head>

<body>
    <h1>Welcome to My Website!</h1>

    <?php
    // Example PHP code
    $name = "John Doe";
    echo "<p>Logged in as: $name</p>";
    echo "<p>test</p>";

    ?>

    <button id="myButton">Click Me</button>
</body>
<script>
    const serviceWorker = true;
    if (serviceWorker == false) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }
</script>

</html>