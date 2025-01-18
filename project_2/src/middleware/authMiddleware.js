import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){return res.status(401).json({message : "No token Provided"})}

    jwt.verify(token,process.end.JWT_SECRET, (err, decoded)=>{
        
        if(err){return res.status(401).json({message:"Invalid Token"})}
      
        req.userId = decoded.id
        next()
    })

}
export default authMiddleware