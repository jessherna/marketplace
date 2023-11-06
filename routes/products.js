const express = require('express')
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  deleteProducts,
  updateProduct
} = require('../controllers/productController')

const Product = require('../models/productModel')
const router = express.Router()

// GET all products
router.get('/', getProducts)

// GET a single product
router.get('/:id', getProduct)

// POST a new product
router.post('/', createProduct) 

// DELETE a product
router.delete('/:id', deleteProduct)


// DELETE all products
router.delete('/', deleteProducts)

// UPDATE a product
router.put('/:id', updateProduct)



module.exports = router