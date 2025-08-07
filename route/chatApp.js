const express=require('express')

const router=express.Router()

const auth=require('../middleware/auth')

const chatAppController=require('../controller/chatApp')

router.get('/chatApp',chatAppController.getChatAppPage)

router.get('/logout',auth.authenticate,chatAppController.logOut)

router.get('/showUser',auth.authenticate,chatAppController.showUser)

router.post('/sendChat',auth.authenticate,chatAppController.postChat)

router.get('/chatHistory',auth.authenticate,chatAppController.getChat)

module.exports=router