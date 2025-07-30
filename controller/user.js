const userTable=require('../model/user')
const bcrypt=require('bcrypt')
const path =require('path')
exports.createUser=async(req,res)=>{
    try {
        const {userName,userEmail,userPhone,userPassword}=req.body
        const hasehedPassword=await bcrypt.hash(userPassword,10)

        const userDetail=await userTable.create({
            userName:userName,userEmail:userEmail,
            userPhone:userPhone,userPassword:hasehedPassword
        })
        return res.json({userDetail:userDetail,message:'Succesfully Signed In'})
    } catch (error) {
        // if dup entry
        if(error.name=='SequelizeUniqueConstraintError'){
            return res.status(409).json({message:"User already exist:Please LogIn"})
        }
        console.log(error)
        return res.json({error:error})
        
    }
}
exports.getSignUpPage=async(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','signup.html'))
}