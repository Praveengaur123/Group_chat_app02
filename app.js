require('dotenv').config()
const express=require('express')
const Sequelize=require('./util/database')
const app=express()
const userRouter=require('./route/user')
const path=require('path')
const cors=require('cors')

// to serve static files from public folder
app.use(express.static(path.join(__dirname,'public')))

app.use(cors({
    origin:'http://localhost:3030'
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended:true})) // for parsing application /www-form-urlencoded

//  router 
app.use(userRouter)
Sequelize.sync({force:true})
.then(response=>{
    app.listen(process.env.PORT,()=>console.log("server starts @ localhost 3030"))
})
.catch(err=>console.log(err))
