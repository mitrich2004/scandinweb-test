<?php
    class DVD extends Product
    {
        protected $size;

        public function __construct($data)
        {
            $this->size = $data['size'];
            parent::__construct($data);
        }

        //getters
        public function getSize() { return $this->size; }

        //setters
        public function setSize($size) { $this->size = $size; }

        public function validate()
        {
            if (parent::validate())
            {
                if (is_null($this->size) || $this->size <= 0)
                {
                    return false;
                }

                return true;
            }

            return false;
        }
    }
?>