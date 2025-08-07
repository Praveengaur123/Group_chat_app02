const {Sequelize,DataTypes}=require('sequelize')

const database=require('../util/database')

const chatTable=database.define('chat',{
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
    }
})

module.exports=chatTable