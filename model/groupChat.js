const {Sequelize,DataTypes}=require('sequelize')

const database=require('../util/database')

const groupChatTable=database.define('groupChat',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    chat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fileUrl:{
        type:DataTypes.STRING,
        allowNull:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    groupId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})


module.exports=groupChatTable