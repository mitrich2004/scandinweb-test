<?php
    require("services/ProductService.php");

    class ProductController
    {
        private $productService;
        public function __construct()
        {
            $this->productService = new ProductService();
        }

        public function get()
        {
            $response = $this->productService->getAllProducts();
            echo json_encode($response);  
        }

        public function post()
        {
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if ($path[1] != "")
            {
                $ids = explode(',', $path[1]);
                foreach ($ids as $id)
                {
                    $response = $this->delete($id);
                    
                    if ($response['status'] == 0)
                    {
                        break;
                    }
                }
                echo json_encode($response);
            }
            else
            {
                $data = json_decode(file_get_contents('php://input'), true);
                $response = $this->productService->createProduct($data);
                echo json_encode($response);
            }
        }

        public function delete($id)
        {
            return $this->productService->deleteProduct($id);
        }
    }
?>