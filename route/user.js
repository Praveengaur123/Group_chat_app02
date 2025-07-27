const express=require('express')
const router=express.Router()

const userController=require('../controller/user')

router.get('/',userController.getSignUpPage)

router.post('/signup',userController.createUser)

module.exports=router