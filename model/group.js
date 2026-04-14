const {Sequelize,DataTypes}=require('sequelize');

const database=require('../util/database');

const groupTable=database.define('group',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    groupName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false
    } // user.id
});

module.exports=groupTable;