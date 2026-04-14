const path=require('path')
const user=require('../model/user')

const Group=require('../model/group')
const groupMember=require('../model/groupMembers')
const sequelize=require('../util/database')
const groupChatTable = require('../model/groupChat')


// get html page to create groups
exports.getFromGroupPage=async(req,res)=>{
    console.log("form group")    
    res.sendFile(path.join(__dirname,'../views','group.html'))
   
}
// getting group chat page
exports.getGroupChatPage=async(req,res)=>{
    console.log("group chat page")
    res.sendFile(path.join(__dirname,'../views','groupChat.html'))
}
// getting the members name
exports.getUserName=async(req,res)=>{
try {
    // console.log("userNames")
    const userName= await user.findAll({attributes:['id','userName']})
    res.json({user:userName})

} catch (error) {
    res.json({error:error})
}
}
// creating group and add members
exports.createGroup=async(req,res)=>{
    const t=await sequelize.transaction()
    try {
        const userId=req.user.id
        if(!userId) return res.status(401).json({error:'unauthenticated because of creator id'});
        const{groupName,memberIds}=req.body
        if(!groupName||! Array.isArray(memberIds)||memberIds.length===0){
            return res.status(400).json({ error: 'groupName and memberIds are required' });
        }
        // console.log(groupName,memberIds)
         
        //  create the group
            const group=await Group.create({
                groupName:groupName,
                createdBy:userId
            },{transaction:t})

        // add group members 
        const allMembers=[...new Set([...memberIds])]
        const groupMembers=allMembers.map(uId=>({
            groupId:group.id,
            userId:uId
        }))
        const s=await groupMember.bulkCreate(groupMembers,{transaction:t});
        // console.log(s)
        // commit transaction
        await t.commit()
        res.status(201).json({message:'Group Created Succesfully',group})
    } 
   
    catch (error) {
        await t.rollback();
        console.log(error.errors)
        return res.status(500).json({error:error})
    }
}

// get all groups current user is part of 
exports.getMyGroup=async(req,res)=>{
    try {
        const userId=req.user.id
        console.log(userId)
        // find all group id from groupmember table
        const groupLinks=await groupMember.findAll({
            where:{userId},
            attributes:['groupId']
        })
        const groupIds=groupLinks.map(link=>link.groupId)
        if(groupIds.length==0) return res.status(200).json({groups:[]});

        // fetch group detail
        const groups=await Group.findAll({
            where:{id:groupIds},
            attributes:['id','groupName','createdBy']
        })

        // console.log('groups',groups)
        res.status(200).json({groups})
    } catch (error) {
        console.log("error in schema",error)
        res.status(500).json({error:'Failed to fetch from schema'})
    }

}
// get the group only while fetching the id
exports.getGroupData=async(req,res)=>{
    try
    {
        const id=req.params.Id
        console.log("only group id",id)
        const groupData=await Group.findOne({
            where :{id},
            attributes:['id','groupName','createdBy']
        })
        
        res.status(200).json({groupData})
    }
    catch(error){
        console.log("error in groupData while opening the group",error)
        res.status(500).json({error:'Failed to open the group'})
    }
}
// get all members of a group
exports.getGroupMembers=async(req,res)=>{
    try{
    const {groupId}=req.params
    
    const members=await user.findAll({
        include:[
            {
                model:Group,
                where:{id:groupId},
                through:{attributes:[]}
            }
        ],
        attributes:['id','userName']
    }) 

    res.status(200).json({members})
}
catch(err){
    console.error("error fetching group member:",err)
    res.status(500).json({error:'failed to fetch members of group'})
}
}

// send chat in a group
exports.sendChat=async(req,res)=>{
    try {
        const groupId=req.params.currentGroupId
        const {chat}=req.body
        // console.log(req.body)
        const userId=req.user.id
        console.log("while sending chat",userId,chat)
        
        const fileUrl=(req.file)? `/uploads/group_${groupId}/${req.file.filename}`:null;

        console.log("user Id in group message",userId)
        // if user is part of the group
        const isMember=await groupMember.findOne({where:{groupId,userId}})
        
        if(!isMember) return res.status(403).json({error:'You are not member of the group'});
        
        else{
            console.log("member name")
            const userDeatails=await user.findOne({where:{id:userId},
            attributes:['userName']
            })
            var memberName=userDeatails.get().userName
        }
        const groupChat=await groupChatTable.create({
            chat,
            fileUrl,
            userName:memberName,
            userId,groupId,
        })

        res.status(201).json({chat:groupChat})
    } catch (error) {
        console.error('error sending message',error)
        return res.status(500).json({error:'failed to send message'})
    }
}
// fetching message
exports.getGroupMessage=async(req,res)=>{
try {
    const groupId=req.params.groupId
    console.log("result",groupId)
    const message=await groupChatTable.findAll({
    where:{groupId},
    include:[
        {
            model:user,
            attributes:['id','userName']
        }
    ],
    order:[['createdAT','ASC']]
})
return res.status(200).json({message:message})

} catch (error) {
    console.error('error fetching message',error)
    return res.status(500).json({error:'failed to fetch message'})
}    
}
