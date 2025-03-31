import { updateUserId, USER_ID } from "../../const.js";
import Agent from "../../models/Agent.model.js";


export default async function BulkJoinControler(req, res) {
    
    let {agents} = req.body;

      agents = JSON.parse(agents)
    try {
        
    await agents.forEach( (agent) => {
        
        agent.kyc = 0,
        agent.bv = 0,
        agent.rank = 0,
        agent.juniors = [];
        agent.profile_pic_URL = "https://res.cloudinary.com/dxg0zpyu4/image/upload/f_auto,q_auto/xzjbpzsgoddt54v00hxs"

       for(let index = 0; index < agents.length; index++) {
        
                if (agent.userid == agents[index].introducer.id) {
                    console.log(agents[index].introducer.id)
                    agent.juniors = [ ...agent.juniors , {
                       id : agents[index].userid,
                       name: agents[index].name
                    }]
                }
                
        }

        
        
    });
    console.log(agents);

    
    await Agent.insertMany(agents , {
        runValidators: true
    })
    .then((response) => {

        res.status(200).send({
            response
        })
    })
    .catch((error) => {
        console.log(error);
        
        res.status(400).send({
            error
        })
    })
} catch (err) {
    console.log(err);
    res.status(400).send({
        err
    })
}
}
