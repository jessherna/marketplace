const express = require('express')
const {
  createCategory,
  getCategories,
  getCategory 
} = require('../controllers/categoriesController')

const Category = require('../models/categoriesModel')
const router = express.Router()

// GET all products
router.get('/', getCategories)

// GET a single product
router.get('/:id', getCategory)


// POST a new product
router.post('/', createCategory) 

// DELETE a product
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a product'})
}) 

// DELETE all products
router.delete('/', (req, res) => {
    res.json({message: 'DELETE all products'})
}) 

// UPDATE a product
router.put('/:id', (req, res) => {
    res.json({message: 'UPDATE a product'})
}) 

module.exports = router