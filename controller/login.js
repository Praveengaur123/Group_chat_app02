const path=require('path')
const userTable=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

function generateToken(id){
    return jwt.sign({userId:id},process.env.JWT_SECRET)
}

exports.userLogin=async(req,res)=>{
    const {userEmail,userPassword}=req.body
    try {
        const user=await userTable.findOne({where:{userEmail}})
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }
    const isCompared=await bcrypt.compare(userPassword,user.userPassword)
    if(isCompared){
        user.status=true
        await user.save()
        return res.status(200).json({userName:user.userName,message:'Logged In Succesfully',redirectUrl:'/chatApp',token:generateToken(user.id)})
    }
    else{
        return res.status(400).json({message:"Email or Password is Incorrect"})
    }
    } catch (error) {
        return res.status(401).json({error:error.message})
    }

}
exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','login.html'))
}

