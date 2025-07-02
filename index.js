const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 2222
const app = express()
// middleware
app.use(express.json())

// Genderal route 
app.get('/',(req,res) => {
  res.send('hii hello')
})
// Add-prod
app.post('/api/products',async (req,res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  // console.log(req.body);
  // res.send(req.body)
})
// Reviwe the all-prod
app.get('/api/productsview',async (req,res) => {
  try {
    const product = await Product.find({})
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

// review using id
app.get('/api/product/:id',async (req,res) => {
  try {
  const product = await Product.findById(req.params.id)
  if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

// Update prod
app.put('/api/product/:id',async (req,res) => {
  try {
    const {id} =req.params
    const product =await Product.findByIdAndUpdate(id,req.body)
    if (!product) {
      return res.status(404).json({message:"Product not found"})
    }
    const updateProduct = await Product.findById(id)
    res.status(200).json(updateProduct)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

// delete prod
app.delete('/api/product/:id',async (req,res) => {
  try {
    const {id} = req.params
    const product =await Product.findByIdAndDelete(id)  
  if (!product) {
    return res.status(404).json({message:"Product not found"})
  }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
// Sort prod
app.get('/api/products',async (req,res) => {
  try {
    const sortField = req.query.sortBy || 'name'
    const sortObj = {}
    sortObj[sortField] = 1;
    const product = await Product.find().sort(sortObj)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
// DataBase
mongoose.connect("mongodb://localhost:27017/CURD")
.then(() => {
  console.log("DB is connected");
  app.listen(port,() =>{
    console.log('server is Running');
  });
})
.catch(() => {
  console.log("connection failed")
});