<?php
    class Furniture extends Product
    {
        protected $height;
        protected $width;
        protected $length;

        public function __construct($data)
        {
            $this->height = $data['height'];
            $this->width = $data['width'];
            $this->length = $data['length'];
            parent::__construct($data);
        }

        //getters
        public function getHeight() { return $this->height; }
        public function getWidth() { return $this->width; }
        public function getLength() { return $this->length; }

        //getters
        public function setHeight($height) { $this->height = $height; }
        public function setWidth($width) { $this->width = $width; }
        public function setLength($length) { $this->length = $length; }

        public function validate()
        {
            if (parent::validate())
            {
                if (is_null($this->height) || $this->height <= 0)
                {
                    return false;
                }

                if (is_null($this->width) || $this->width <= 0)
                {
                    return false;
                }

                if (is_null($this->length) || $this->length <= 0)
                {
                    return false;
                }

                return true;
            }

            return false;
        }
    }
?>