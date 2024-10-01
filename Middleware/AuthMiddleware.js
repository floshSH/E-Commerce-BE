import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();





const Authentication=async(req,res,next)=>{
    try{
       
        const token=req.headers.authorization?.split(' ')[1];
       
       
        if(!token){
            return res.status(401).json({msg:"Token is missing"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        if(!req.user.isAdmin){
            next();
        }
    
        else{
            return res.status(401).json({msg:"You are not authorized to perform this action"});
        }
    }catch(err){
        res.status(200).json({msg:"Token is not valid"});
    }
}

export default Authentication;  