const multer =require('multer');
const fs=require('fs');
const path=require('path');

const uploadPath=path.join(__dirname,'../uploads')

const storage=multer.diskStorage({
    
    destination:(req,file,cb)=>{
        const groupId=req.params.currentGroupId;
        const groupFolder=path.join(uploadPath,`group_${groupId}`);
        // create folder if not exist
        fs.mkdirSync(groupFolder,{recursive:true})
        cb(null,groupFolder)
    },
    filename:(req, file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    }
})
const upload=multer({storage})

module.exports=upload