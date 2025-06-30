const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema(
  {
    name:{type:string,required:[true,"name is important"],unique:true},
    price:{type:Number,required:[true,"price is important"],default:0},
    quantity:{type:Number,required:[true,"quantity is important"],default:0}
  },{
    timestamps:true
  }
)
const Product = mongoose.model('Product',ProductSchema)

module.exports = Product