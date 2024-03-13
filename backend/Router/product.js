const express =require('express')
const router =express.Router()
const {getProducts,postProducts, getSingleProduct, putSingleProduct, registerController, 
  loginController,getLoginController,deletSingleProduct,
  postOrderController,getOrderController,putOrderController,
  putShippingrController,getSingleOrderController,postSingleOrderController,getAllOrderController
}  = require('../Controller/productController')
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const jwt =require('jsonwebtoken');
const verifyToken = require('../authMiddleware');

cloudinary.config({ 
    cloud_name: 'dhokshdip', 
    api_key: '438371693249867', 
    api_secret: 'Gl8vCCm22Jb68oOPvCgti1VkHTw' 
  });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'photo',
      format: async (req, file) => 'png',
      public_id: (req, file) => `${Date.now() + '-' + file.originalname}`,
      allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
      resource_type: "auto"
    }
  });
  const upload = multer({ storage: storage });


router.get('/',getProducts)
router.post('/',upload.single('file'),postProducts)
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/login',verifyToken,getLoginController)
router.post('/order',verifyToken,postOrderController)
router.get('/order',verifyToken,getOrderController)
router.get('/allorder',getAllOrderController)
router.get('/order/:id',verifyToken,getSingleOrderController)
router.post('/order/:id',verifyToken,postSingleOrderController)
router.get('/:id',getSingleProduct)
router.put('/:id',verifyToken,putSingleProduct)
router.put('/order/:id',verifyToken,putOrderController)
router.put('/order/shipping/:id',verifyToken,putShippingrController)
router.delete('/:id',verifyToken,deletSingleProduct)




module.exports=router