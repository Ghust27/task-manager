const jwt = require('jsonwebtoken')

async function authMiddleware (req,res,next){
    try{
        const authHeader = req.headers.authorization    
        if(!authHeader){
            return res.status(401).json({error:"Token não fornecido."})
        }

        const token = authHeader.split(' ')[1]
        if(!token){
            return res.status(401).json({error:"Token não fornecido."})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.userId = decoded.userId 
        next()
        
    }catch(error){
        res.status(401).json({error:"Token invalido ou expirado."})
    }
}

module.exports = authMiddleware