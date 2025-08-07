const jwt =require('jsonwebtoken')

const User=require('../model/user')

const jwtSecret=process.env.JWT_SECRET // your secret key

exports.authenticate=(req,res,next)=>{
    try {
        const token= req.header('Authorization') // get token from header
        if(!token) return res.status(401).json({message:"Not Authorized:token is null"});
        const userData=jwt.verify(token,jwtSecret) // decode and verify
        // find user by primary key
        const user=User.findByPk(userData.userId)
        .then(user=>{
            req.user=user
            next()
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:'bad request from middleware'})
    }

}

