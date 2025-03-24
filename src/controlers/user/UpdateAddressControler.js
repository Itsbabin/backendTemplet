import Agent from "../../models/Agent.model.js"

export default async function UpdateAddressControler(req , res) {
try {
   let {address , pin} = req.body
   
    
   await Agent.findOneAndUpdate({userid : req.user.userid },{
    address,
    pin
   })
   .then((response) =>{
    res.status(200).send({
        messeg : "Address updated Successfully",
        user : response
      });
   })
   .catch(() =>{
    res.status(400).send({
        messeg : "Error occured on changing Address"
      });
   })
} catch (error) {
    res.status(400).send({
        messeg : "Some error occured"
      });
}
}
