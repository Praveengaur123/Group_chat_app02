const Sequelize=require('sequelize')
const dbName=process.env.DB_NAME
const dbPassword=process.env.DB_PASSWORD
const dbUser=process.env.DB_USER

const sequilize=new Sequelize(dbName,dbUser,dbPassword,{
    dialect:process.env.DIALECT,
    host:process.env.RDS_ENDPOINT,
    loggin:false
})
console.log('Connected to Database')
module.exports=sequilize