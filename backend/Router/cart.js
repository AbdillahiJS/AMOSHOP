const express =require('express')
const verifyToken= require('../authMiddleware.js')
const { postCartController, getCartController } = require('../Controller/cartController')
const router =express.Router()

router.post('/',verifyToken,postCartController)
router.get('/',verifyToken,getCartController)



module.exports =router