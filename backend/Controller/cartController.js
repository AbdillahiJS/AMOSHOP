
const {Register, Product} =require('../Model/base')


let postCartController =async(req,res)=>{

try {
  
 await Register.updateOne(
        {
          _id: req.userId, 
          "belongUser._id": { $not: { $eq: req.body._id } }
        },
        {
          $push: {
            "belongUser": {
                _id:req.body._id,
                image:req.body.image,
                title:req.body.title,
                price:req.body.price,
                status:req.body.status,
                quantity:req.body.quantity,
            }
          }
        }
      );
   
    res.json('cartAdd')
    
} catch (error) {
    
}
}

let getCartController =async(req,res)=>{
 
try {
    let updateUser = await Register.findById(req.userId)

    res.json(updateUser?.belongUser)
    
} catch (error) {
    console.log("getCartError",error);
}
}


        
   


module.exports ={postCartController,getCartController}