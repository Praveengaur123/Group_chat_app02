const {Sequelize,DataTypes}=require('sequelize')

const database=require('../util/database')

const userTable=database.define('user',{
id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    notNull:true,
    unique:true
},
userName:{
        type:DataTypes.TEXT,
        notNull:true
    },
userEmail:{
        type:DataTypes.STRING,
        notNull:true,
        unique:true
    },
userPhone:{
    type:DataTypes.INTEGER,
    notNull:true,
    unique:true
},
userPassword:{
        type:DataTypes.STRING,
        notNull:true
    },
})

module.exports=userTable