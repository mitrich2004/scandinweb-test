<?php
    require("repositories/ProductRepository.php");
    require("models/ProductModel.php");
    require("models/DVDModel.php");
    require("models/BookModel.php");
    require("models/FurnitureModel.php");

    class ProductService
    {   
        public $db;

        public function __construct()
        {
            $this->db = new ProductRepository();
        }
        
        public function getAllProducts()
        {     
            return $this->db->getAllProducts();
        }

        public function createProduct($data)
        {
            switch ($data['productType'])
            {
                case 0: $newProduct = new DVD($data); break;
                case 1: $newProduct = new Book($data); break;
                case 2: $newProduct = new Furniture($data); break;
            }
            if ($newProduct->validate())
            {
                return $this->db->createProduct($newProduct);
            }
            else
            {
                $response = ['status' => 0, 'msg' => 'Failed to create a product', 'err' => 'Invalid data'];
                return $response;
            }
        }

        public function deleteProduct($id)
        {
            return $this->db->deleteProduct($id); 
        }
    }
?>