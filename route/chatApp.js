const express=require('express')

const router=express.Router()

const chatAppController=require('../controller/chatApp')

router.get('/chatApp',chatAppController.getChatAppPage)

module.exports=router