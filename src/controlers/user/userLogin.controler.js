import Agent from "../../models/Agent.model.js"



export default async function UserLoginControler(req, res) {
    let { phone_number, password } = req.body
    try {
        
    if ( phone_number && password) {
             await Agent.findOne({$or: [ {phone_number} ,{ userid : phone_number}]})
            .then(async (response) => {
                if (!response) {
                    res.status(404).send({
                        message: "user dose not exist"
                    })
                }
                else {
                    if ( await response.isPasswordCorrect(password)) {
                       
                        
                           let token = response.genarateToken()
                        res.status(200).send({
                            ...response._doc,
                            token
                        })
                    }
                    else{
                        res.status(400).send({
                              message: "incorrect password"
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    
                    messeg : "something went wrong" 
                }) 
            })
           
    }
    else{
        res.status(400).send({
                    
            messeg : "invalid credential" 
        }) 
    }
    
} catch (error) {
    res.status(400).send({
                    
        messeg : "some error occured" 
    })
}
}
