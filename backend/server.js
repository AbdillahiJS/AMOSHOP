const express =require('express')
const app =express()
const mongoose =require('mongoose')
const cors =require('cors')
const product = require('./Router/product.js')
const cart =require('./Router/cart')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const uri = "mongodb+srv://AMO:AMO@learningpath.wv5hfcq.mongodb.net/MERNECOMMERCE?retryWrites=true&w=majority";


try {
    mongoose.connect(uri)
    console.log('connected to the database');
  } catch (error) {
    console.log(error);
  }

app.use('/products',product)
app.use('/cart',cart)




app.listen(8000,()=>{
    console.log('server running in port 8000');
})