require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({message: "Welcome to DressStore Application."})
})
app.use('/api/products', productRoutes)
app.use('/api/categories',categoryRoutes)

// GET all products which name contains 'kw'
app.get('/api/products/search', function(req, res) {
    var name = req.query.name;
    Product.find({name: new RegExp(name, 'i')}, function(err, products) {
        if (err) {
            res.send(err);
        } else {
            res.json(products);
        }
    });
  });
// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


