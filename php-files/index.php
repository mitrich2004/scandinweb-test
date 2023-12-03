<?php    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require("controllers/ProductController.php");

    $controller = new ProductController();
    
    switch ($_SERVER['REQUEST_METHOD'])
    {
        case 'GET': $controller->get(); break;
        case 'POST': $controller->post(); break;
    }
?>