const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.get('/',(req,res) => {
  res.send('hii hello')
})

app.post('/products',async (req,res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
CURD.connect("mongodb://localhost:27017/CURD")
.then(() => {
  console.log("DB is connected");
  app.listen(2222,() =>{
    console.log('server is Running');
  });
})
.catch(() => {
  console.log("connection failed")
});