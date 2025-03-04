import OfficeStalf from "../../models/Officestalf.js"


export default async function LoginControler(req, res) {
    let { userid, password } = req.body
   
    if (userid && password) {
             await OfficeStalf.findOne({ userid })
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
                res.status(400).send({
                    messeg : "something went wrong" 
                }) 
            })
           
    }
}
