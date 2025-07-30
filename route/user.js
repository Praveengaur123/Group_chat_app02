const express=require('express')
const router=express.Router()

const userController=require('../controller/user')

router.get('/signup',userController.getSignUpPage)

router.post('/newUser',userController.createUser)

module.exports=router