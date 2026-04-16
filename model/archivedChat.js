const {Sequelize,DataTypes}=require('sequelize')

const dataBase=require('../util/database')

const archivedChat = dataBase.define('archivedChat',{
     userName:{
        type:DataTypes.STRING,
        
    },
    chat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fileUrl:{
        type:DataTypes.STRING,
        
    },
    userId:{
        type:DataTypes.INTEGER,
        
    },
    groupId:{
        type:DataTypes.INTEGER,
    }
},
{
    timestamps:true
})
module.exports=archivedChat