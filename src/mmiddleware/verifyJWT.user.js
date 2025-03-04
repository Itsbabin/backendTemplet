import jwt from "jsonwebtoken";
import Agent from "../models/Agent.model.js";

async function verifyJwtUser(req, res, next) {
    
    try {
        
    let token = req.header("token");

    if (!token) {
      throw new ApiResponse(false, "we cant get token", null);
    }

    let isVerified =  jwt.verify(token,process.env.SECRET)
   
    let user =  await Agent.findOne({userid : isVerified?.userid})

    if(!user){
        
        res.status(400).json({messeg : 'user not found'}); 
    }

    req.user = user;

    next();
       
    } catch (error) {
        res.status(400).json(new ApiResponse(false, "some error ocurred", {error})); 
    }

}

export default verifyJwtUser;
