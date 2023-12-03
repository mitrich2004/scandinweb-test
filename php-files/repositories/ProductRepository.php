<?php
    class ProductRepository
    {
        //private server
        //private dbname
        //private user
        //private password
        private $connection;

        public function __construct()
        {
            $this->connect();
        }

        private function connect()
        {
            try
            {
                //I did not include my db credentials into the GitHub version of this file, for safety reasons
                
                $connectionString = 'mysql:host=' . $this->server . ';dbname=' . $this->dbname;
                $this->connection = new PDO($connectionString, $this->user, $this->password);
            } 
            catch (PDOException $e)
            {
                echo 'Database Error' . $e->getMessage();
            }
        }

        public function getAllProducts()
        {
            $query = "SELECT * FROM products";

            try 
            {
                $statement = $this->connection->prepare($query);
                $statement->execute();
                $data = $statement->fetchAll(PDO::FETCH_ASSOC);

                $products = [];
                foreach ($data as $product)
                {
                    switch ($product['productType'])
                    {
                        case 0: $product = new DVD($product); break;
                        case 1: $product = new Book($product); break;
                        case 2: $product = new Furniture($product); break;
                    }
                    array_push($products, $product);
                }
            
                $response = ['status' => 1, 'msg' => 'Data fetched successfully', 'data' => $products];
            }
            catch (PDOException $e)
            {
                $response = ['status' => 0, 'msg'=> 'Data fetch failed', 'err' => $e->getMessage()];
            }

            return $response;
        }

        public function createProduct($product)
        {
            $query = "INSERT INTO products(id, sku, name, price, productType, size, weight, height, width, length) 
                VALUES(null, :sku, :name, :price, :productType, :size, :weight, :height, :width, :length)";

            //product class properties
            $sku = $product->getSku();
            $name = $product->getName();
            $price = $product->getPrice();
            $productType = $product->getProductType();
            
            //specific properties
            $size = (method_exists($product, 'getSize')) ? $product->getSize() : null;
            $weight = (method_exists($product, 'getWeight')) ? $product->getWeight() : null;
            $height = (method_exists($product, 'getHeight')) ? $product->getHeight() : null;
            $width = (method_exists($product, 'getWidth')) ? $product->getWidth() : null;
            $length = (method_exists($product, 'getLength')) ? $product->getLength() : null;
                
            $statement = $this->connection->prepare($query);
            
            $statement->bindParam(':sku', $sku);
            $statement->bindParam(':name', $name);
            $statement->bindParam(':price', $price);
            $statement->bindParam(':productType', $productType);
            $statement->bindParam(':size', $size);
            $statement->bindParam(':weight', $weight);
            $statement->bindParam(':height', $height);
            $statement->bindParam(':width', $width);
            $statement->bindParam(':length', $length);
            
            try 
            {
                $statement->execute();
                $response = ['status' => 1, 'msg' => 'Created a product successfully'];
            }
            catch (PDOException $e)
            {
                $response = ['status' => 0, 'msg' => 'Failed to create a product', 'err' => $e->getMessage()];
            }

            return $response;
        }

        public function deleteProduct($id)
        {
            $query = 'DELETE FROM products WHERE id = :id';

            try
            {
                $statement = $this->connection->prepare($query);
                $statement->bindParam(':id', $id);
                $statement->execute(); 
                $response = ['status' => 1, 'msg' => 'Products deleted successfully'];
            }
            catch (PDOException $e)
            {   
                $response = ['status' => 0, 'msg' => 'Failed to delete products', 'err' => $e->getMessage()];
            }   

            return $response;
        }
    }
?>