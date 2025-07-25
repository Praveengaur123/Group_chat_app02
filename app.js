require('dotenv').config()
const express=require('express')
const Sequelize=require('./util/database')
const app=express()
const userRouter=require('./route/user')

app.use(userRouter)
Sequelize.sync()
.then(response=>{
    app.listen(process.env.PORT,()=>console.log("server starts @ localhost 3030"))
})
.catch(err=>console.log(err))

