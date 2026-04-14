const upload=require('../middleware/upload')

const express=require('express')

const auth=require('../middleware/auth')

const groupController=require('../controller/formGroup')

const router=express.Router()

// posting the message and file like image,pdf and video
// posting the message in group
router.post('/groups/:currentGroupId/message',auth.authenticate,upload.single('file') ,groupController.sendChat)

module.exports=router