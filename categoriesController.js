const Category = require('../models/categoriesModel')
const mongoose = require('mongoose')

// get all categories
const getCategories = async (req, res) => {
    const categories = await Category.find({}).sort({createdAt: -1})

    res.status(200).json(categories)
}
// get a single category
const getCategory = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such category'})
    }
    const category = await Category.findById(id)

    if (!category) {
        return res.status(404).json({error: 'No such category'})
    }

    res.status(200).json(category)
}
// create new category
const createCategory = async (req, res) => {
    const {name} = req.body

    // add doc to db
    try {
        const category = await Category.create({name})
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a product

// delete all products

// update a product

// find a product

module.exports = {
    createCategory,
    getCategories,
    getCategory
}