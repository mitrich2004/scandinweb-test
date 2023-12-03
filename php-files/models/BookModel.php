<?php
    class Book extends Product
    {
        protected $weight;

        public function __construct($data)
        {
            $this->weight = $data['weight'];
            parent::__construct($data);
        }

        //getters
        public function getWeight() { return $this->weight; }

        //setters
        public function setWeight($weight) { $this->weight = $weight; }

        public function validate()
        {
            if (parent::validate())
            {
                if (is_null($this->weight) || $this->weight <= 0)
                {
                    return false;
                }

                return true;
            }

            return false;
        }
    }
?>