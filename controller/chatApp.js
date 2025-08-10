const path=require('path')
const user=require('../model/user')

const chatTable=require('../model/chat')

exports.getChatAppPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','chatApp.html'))
}

exports.logOut=async(req,res)=>{
    try {
        const userId=req.user.id
        const User=await user.findOne({
            where:{id:userId}
        })
        User.status=false
        await User.save()
        return res.status(200).json({succes:true,message:'Log Out Successfully',redirectUrl:'/login'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({succes:false,message:'Log Out Error'})
    }
}

exports.showUser=async(req,res)=>{
    try {
        const User=await user.findAll({
            where:{status:true},
            attributes:['userName','userEmail','status'],
            order:[['updatedAt','ASC']]
        })
        return res.json({succes:true,User:User})
    } catch (error) {
        return res.json({error:error})
    }
}

const fs=require('fs');

exports.postChat=async(req,res)=>{
    const id=req.user.id
    const chat=req.body.message

    const userName= await user.findOne(
        {where:{id},
        attributes:['userName']
    })
    const postChat=await chatTable.create({userName:userName.userName,chat:chat,userId:id})
    res.json({succes:true,chat:postChat})

}

exports.getChat=async(req,res)=>{
    const id=req.user.id
    const chat =await chatTable.findAll()
    res.json({chat:chat,redirectUrl:'/chatApp'})
}
