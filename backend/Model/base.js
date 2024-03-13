const mongoose =require('mongoose')
 const {Schema}=mongoose

const productSchema = new Schema({
    image:String,
    title:String,
    price:Number,
    status:String,
    quantity:{
        type:Number,
        default:1,
    },
     
},{timestamps:true})

// const cartSchema = new Schema({
//     image:String,
//     title:String,
//     price:Number,
//     status:String,
//     quantity:{
//         type:Number,
//         default:1,
//     },
     
// },{timestamps:true})

const registerSchema = new Schema({
    name:String,
    email:String,
    password:Number,
    belongUser:[{
        image:String,
        title:String,
        price:Number,
        status:String,
        quantity:{
            type:Number,
            default:1,
        },
    }]
         
},{timestamps:true})


const OrderSchema =new Schema({
name:String,
email:String,
address:String,
number:Number,
cache:Boolean,
productOrdered:[],
ownerOrder:String,
isOrderFinished:{
    type:Boolean,
    default:false
},
isDelivered:{
    type:Boolean,
    default:false
},
isPaid:{
    type:Boolean,
    default:false
},
total:{
    type:Number,
    default:0
},


},{timestamps:true})

let Product =mongoose.model('Product',productSchema)

let Register =mongoose.model('Register',registerSchema)
let Order =mongoose.model('Order',OrderSchema)

module.exports ={Product,Register,Order}
