const path=require('path')
exports.getChatAppPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','chatApp.html'))
}