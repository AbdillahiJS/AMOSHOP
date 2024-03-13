const {Product, Register,Order} =require('../Model/base')
const jwt =require('jsonwebtoken')
const mongoose =require('mongoose')





let  getProducts =async(req,res)=>{

    try {
        let allProducts = await Product.find()
        res.json({allProducts})
    } catch (error) {
        console.log('getProductsError>',error);
    }
};

let postProducts=async(req,res)=>{
   try {
            let product =new Product({
                image:req.file.path,
                title:req.body.title,
                price:req.body.price,
                status:req.body.status,
                quantity:req.body.qty,
            })
            let newProduct = await product.save()
        res.json({success:'File uploaded successfully!',newProduct});
    } catch (error) {
        console.log('postProductError>',error);
}
   
}

let getSingleProduct =async(req,res)=>{
    try {
      let singleProduct = await Product.findById(req.params.id)
      res.json(singleProduct)
    } catch (error) {
        console.log('geSingleProduct > ',error.message);
    }
}


let putSingleProduct =async(req,res)=>{
  
    try {
       
    let productUpdated = await Register.findOneAndUpdate({_id:req.userId,'belongUser._id': req.params.id},
    {$set:{'belongUser.$.quantity':req.body.data}} )
   
      res.json(productUpdated.belongUser)
    } catch (error) {
        console.log('putRequestError>',error);
    }
}
let deletSingleProduct=async(req,res)=>{ 
    try {
       
      await Register.findOneAndUpdate({_id:req.userId,'belongUser._id': req.params.id},{$pull:{'belongUser':{_id:req.params.id}}})

      res.json('Delete this id ')
    } catch (error) {
        console.log('DeleteRequestError>',error);
    }
}






let registerController =async(req,res)=>{
   
    try {
      let registered = new Register(req.body)
      let userSaved =await registered.save()
      res.json(userSaved)
    } catch (error) {
        console.log('RegisterError>',error);
    }
}

let loginController =async(req,res)=>{

    try {
        
      let user = await Register.findOne({email:req.body.email})
      console.log('user ',user);
      let token =jwt.sign({id:user._id},'mysecret')
      
      res.json({user,token})
    } catch (error) {
        console.log('LoginError>',error);
    }
}

let getLoginController =async(req,res)=>{

    try {
      let user = await Register.findById(req.userId)
    
      res.json(user)
    } catch (error) {
        console.log('LoginError>',error);
    }
}

let postOrderController=async(req,res)=>{
    console.log('shipping ',req.body);
    try {
        let userOneShipping =await Register.findById(req.userId)
       
      let order =new Order({
        name:userOneShipping.name,
        email:userOneShipping.email,
        address:req.body.address,
        number:req.body.number,
        cache:req.body.cache,
        productOrdered:userOneShipping.belongUser,
        ownerOrder:req.userId
      })
      let orderAddress =await order.save()
      res.json(orderAddress)
    } catch (error) {
      
    }
    }

let getOrderController=async(req,res)=>{
  
    try {
      let order = await Order.findOne({ownerOrder:req.userId,isOrderFinished:false})
     
      res.json({order})
    } catch (error) {
      console.log('orderDetailsError ',error);
    }

}

let putOrderController=async(req,res)=>{

    try {
      let orderUpdated = await Order.findOneAndUpdate({_id:req.params.id},{$set:{productOrdered:req.body}})
      console.log(orderUpdated);
      res.json('orderUpdated')
    } catch (error) {
      console.log('orderUpdatedError ',error);
    }

}
let putShippingrController=async(req,res)=>{

    try {
      let orderUpdated = await Order.findOneAndUpdate({_id:req.params.id},{$set:{address:req.body.address,number:req.body.number}})
      console.log(orderUpdated);
      res.json('orderUpdated')
    } catch (error) {
      console.log('shippingUpdateError ',error);
    }

}
let getSingleOrderController=async(req,res)=>{
 
    try {
      let SingleOrder = await Order.findOne({_id:req.params.id})
    
      res.json(SingleOrder)
    } catch (error) {
      console.log('SingleOrderError ',error);
    }

}

let postSingleOrderController=async(req,res)=>{

    try {
      await  Register.findOneAndUpdate({_id:req.userId}, { $pull: { belongUser: { $exists: true } } })
      await Order.findOneAndUpdate({_id:req.params.id},{$set:{total:req.body.total,isOrderFinished:req.body.isOrderFinished}})
      
      res.json('SingleOrder')
    } catch (error) {
      console.log('SingleOrderError ',error);
    }

}

let getAllOrderController=async(req,res)=>{
 
  try {
    let allorder = await Order.find()
 
    res.json(allorder)
  } catch (error) {
    console.log('allOrderError ',error);
  }

}



module.exports ={getProducts,postProducts,getSingleProduct,putSingleProduct,registerController,
  loginController,getLoginController,deletSingleProduct,postOrderController,
  getOrderController,putOrderController,putShippingrController,getSingleOrderController,postSingleOrderController,getAllOrderController}