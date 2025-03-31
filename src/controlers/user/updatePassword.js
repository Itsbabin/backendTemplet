import Agent from "../../models/Agent.model.js"

export default async function UpdatePasswordControler(req , res) {
try {
   let {password} = req.body
    
   await Agent.findOneAndUpdate({userid : req.user.userid },{
     password : password
   })
   .then((response) =>{
    
    res.status(200).send({
        messeg : "Password updated Successfully"
      });
   })
   .catch(() =>{
    res.status(400).send({
        messeg : "Error occured on changing Password"
      });
   })
} catch (error) {
    res.status(400).send({
        messeg : "Some error occured"
      });
}
}
