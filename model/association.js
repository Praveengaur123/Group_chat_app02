const userTable=require('./user')

const chatTable=require('./chat')

userTable.hasMany(chatTable,{
    foreignKey:'userId'
})
chatTable.belongsTo(userTable,{
    foreignKey:'userId'
})

module.exports={userTable,chatTable}