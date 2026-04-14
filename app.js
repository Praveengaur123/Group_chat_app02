require('dotenv').config({override:true})
const express=require('express')
const Sequelize=require('./util/database')
const app=express()

const {userTable,chatTable,groupTable,groupMemberTable,groupChatTable}=require('./model/association')

const path=require('path')
const cors=require('cors')

// router
const userRouter=require('./route/user')
const loginRouter=require('./route/login')
const chatAppRouter=require('./route/chatApp')
const formGroupRouter=require('./route/formGroup')
const uploadRouter=require('./route/upload')
// to serve static files from public folder
app.use(express.static(path.join(__dirname,'public')))
app.use('/css',express.static(path.join(__dirname,'views/css')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use(cors({
    // origin:'http://localhost:3030'
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended:true})) // for parsing application /www-form-urlencoded

//  router 
app.use(userRouter)
app.use(loginRouter)
app.use(chatAppRouter)
app.use(formGroupRouter)
app.use(uploadRouter,express.static('uploads'))

Sequelize.sync()
.then(response=>{
    app.listen(process.env.PORT,()=>console.log("server starts @ localhost 3030"))
})
.catch(err=>console.log(err))
