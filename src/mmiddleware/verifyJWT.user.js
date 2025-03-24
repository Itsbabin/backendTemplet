import jwt from "jsonwebtoken";
import Agent from "../models/Agent.model.js";
import OfficeStalf from "../models/Officestalf.js";

async function verifyJwtUser(req, res, next) {
    
    try {
        
    let token = req.header("token");

    if (!token) {
      res.status(300).send( {messeg : "token not exist"});
    }

    let isVerified =  jwt.verify(token,process.env.SECRET)
   
    let user =  await Agent.findOne({userid : isVerified?.userid})

    if(!user){
        let user2 =  await OfficeStalf.findOne({userid : isVerified?.userid})
        if(!user2){
                 res.status(400).json({messeg : 'user not found'}); 
            }
        else{
            req.user = user2;
            next();
        }
     }else{

            req.user = user;
            
            next();
        }
       
    } catch (error) {
        console.log(error);
        
        res.status(400).json({messeg : "some error ocurred"}); 
    }

}

export default verifyJwtUser;
