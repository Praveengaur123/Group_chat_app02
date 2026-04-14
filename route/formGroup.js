const express=require('express')

const router=express.Router()

const groupController=require('../controller/formGroup')

const auth=require('../middleware/auth')

router.get('/formGroup',groupController.getFromGroupPage)
// getting the members name
router.get('/userName',groupController.getUserName)
// creating the groups
router.post('/createGroup',auth.authenticate,groupController.createGroup)

// getting the groups current user is part of
router.get('/getMyGroup',auth.authenticate,groupController.getMyGroup)

// getting the group data current user want to open
router.get('/getMyGroup/:Id',auth.authenticate,groupController.getGroupData)


// getting the group members
router.get('/groups/:groupId/members',auth.authenticate,groupController.getGroupMembers)


//getting groups message
router.get('/groups/:groupId/message',auth.authenticate,groupController.getGroupMessage)

// getting group chat page with group name
router.get('/groupChat',groupController.getGroupChatPage)
module.exports=router