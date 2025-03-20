import Agent from "../../models/Agent.model.js";

export default async function SearchUserControler(req, res) {
    let { phone_number } = req.body
    try {
        
   
    await Agent.find({ $or: [{ "phone_number": { "$regex": phone_number || "", "$options": "i" } }, { "name": { "$regex": phone_number || "", "$options": "i" } },{ "userid" : { "$regex": phone_number || "" , "$options": "i" } }] }).limit(10)
        .then((response) => {
            let ans = response.map((e) => {
                let {password ,__v,_id , ...newObj } = e._doc
                return newObj
            })
            res.status(200).send({ message: ans })
        })
        .catch((err) => {
            console.log(err);
            res.status(300).send({ message: err })
        })
    } catch (error) {
        res.status(300).send({ error })
    }
}
