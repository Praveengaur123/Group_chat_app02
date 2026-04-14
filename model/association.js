const userTable=require('./user')

const chatTable=require('./chat')

const groupChatTable=require('./groupChat')

const groupTable=require('./group')

const groupMemberTable=require('./groupMembers')

userTable.hasMany(chatTable,{
    foreignKey:'userId'
})
chatTable.belongsTo(userTable,{
    foreignKey:'userId'
})
// user chat
userTable.hasMany(chatTable,{foreignKey:'userId'})
chatTable.belongsTo(userTable,{foreignKey:'userId'})

// one user can send many message
userTable.hasMany(groupChatTable,{foreignKey:'userId'})
// group chat table belongs to one user
groupChatTable.belongsTo(userTable,{foreignKey:'userId'})


// group has many chats
groupTable.hasMany(groupChatTable,{foreignKey:'groupId'})
groupChatTable.belongsTo(groupTable,{foreignKey:'groupId'})
// a user can create many group
userTable.hasMany(groupTable,{foreignKey:"createdBy"})
groupTable.belongsTo(userTable,{foreignKey:"createdBy"})

// a group can have many users and a user can join many group
groupTable.belongsToMany(userTable,{
    through:groupMemberTable,
    foreignKey:"groupId",
    otherKey:'userId'
})

userTable.belongsToMany(groupTable,{
    through:groupMemberTable,
    foreignKey:'userId',
    otherKey:'groupId'
})
module.exports={userTable,chatTable,groupTable,groupMemberTable,groupChatTable}