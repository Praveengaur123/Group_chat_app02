const {Sequelize,DataTypes}=require('sequelize')

const database=require('../util/database');

const groupMemberTable=database.define('groupMember',{
//    id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//     },
    groupId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        reference:{
            model:'groups',
            key:'id'
        }
    }, // group.id
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        reference:{
            model:'users',
            key:'id'
        }
    }, // user.id
    
},{
        tableName:'groupMembers'
    })
module.exports=groupMemberTable