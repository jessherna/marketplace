const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}
// get a single product
const getProduct = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }
    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}
// create new product
const createProduct = async (req, res) => {
    const {name, description, price, quantity, category} = req.body
    
    let emptyFields = []

    if(!name) {
        emptyFields.push('name')
    }

    if(!price) {
        emptyFields.push('price')
    }

    if(!quantity) {
        emptyFields.push('quantity')
    }

    if(!category) {
        emptyFields.push('category')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in the required fields', emptyFields})
    }

    // add doc to db
    try {
        const product = await Product.create({name, description, 
            price, quantity, category})
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndDelete({_id: id})

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}
// delete all products
const deleteProducts = async (req, res) => {
    const products = await Product.deleteMany({})

    res.status(200).json(products)
}

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

// find a product

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    deleteProducts,
    updateProduct
}