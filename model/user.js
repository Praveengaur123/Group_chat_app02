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
    },
userEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        
    },
userPhone:{
    type:DataTypes.STRING(10),
    allowNull:false,
    unique:true,
},
userPassword:{
        type:DataTypes.STRING,
        allowNull:false, 
},
status:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
}
})

module.exports=userTable