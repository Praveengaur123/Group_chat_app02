const userTable=require('../model/user')
const bcrypt=require('bcrypt')

exports.createUser=async(req,res)=>{
    try {
        const {userName,userEmail,userphone,userPassword}=req.body
        const hasehedPassword=await bcrypt.hash(userPassword,10)

        const userDetail=await userTable.create({userName:userName,userEmail:userEmail,userphone:userphone,userPassword:hasehedPassword})
        return res.json({userDetail:userDetail})
    } catch (error) {
        
        console.log(error)
        return res.json({error:error})
        
    }
    

}