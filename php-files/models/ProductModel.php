<?php
    abstract class Product implements JsonSerializable
    {
        protected $id;
        protected $sku;
        protected $name;
        protected $price;
        protected $productType;

        public function __construct($data)
        {
            $this->id = (isset($data['id'])) ? $data['id'] : null;
            $this->sku = $data['sku'];
            $this->name = $data['name'];
            $this->price = $data['price'];
            $this->productType = $data['productType'];
        }

        //getters
        public function getSku() { return $this->sku; }
        public function getName() { return $this->name; }
        public function getPrice() { return $this->price; }
        public function getProductType() { return $this->productType; }

        //setters
        public function setSku($sku) { $this->sku = $sku; }
        public function setName($name) { $this->name = $name; }
        public function setPrice($price) { $this->price = $price; }
        public function setProductType($productType) { $this->productType = $productType; }

        public function validate()
        {
            if (is_null($this->sku) || ctype_space($this->sku) || $this->sku == '')
            {
                return false;
            } 

            if (is_null($this->name) || ctype_space($this->name) || $this->name == '')
            {
                return false;
            } 

            if (is_null(!$this->price) || $this->price <= 0)
            {
                return false;
            }

            if (is_null($this->productType) || $this->productType > 2 || $this->productType < 0)
            {
                return false;
            }

            return true;
        }

        public function jsonSerialize() {
            return (object) get_object_vars($this);
        }
    }
?>