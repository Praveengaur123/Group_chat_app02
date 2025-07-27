const {Sequelize,DataTypes}=require('sequelize')

const database=require('../util/database')

const userTable=database.define('user',{
id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false,
    unique:true
},
userName:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate: {
        notEmpty: true // Ensures it's not ""
    }
    },
userEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: {
        notEmpty: true // Ensures it's not ""
        }
    },
userPhone:{
    type:DataTypes.STRING(10),
    allowNull:false,
    unique:true,
    validate: {
    notEmpty: true // Ensures it's not ""
    }
},
userPassword:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
        notEmpty: true // Ensures it's not ""
    }
},
})

module.exports=userTable