const express=require('express')

const loginController=require('../controller/login')

const router=express.Router()

router.get('/login',loginController.getLoginPage)

router.post('/userlogin',loginController.userLogin)

module.exports=router