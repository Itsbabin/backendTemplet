import OfficeStalf from "../../models/Officestalf.js"

export default async function SearchStalfControler(req,res) {
      let {phone_number} = req.body
        await OfficeStalf.find({$or: [{ "phone_number" : { "$regex": phone_number || "" , "$options": "i" } } , { "userid" : { "$regex": phone_number || "" , "$options": "i" } },{ "name" : { "$regex": phone_number || "" , "$options": "i" } }]}).limit(6)
        .then((response) => {
            let ans = response.map((e) => {
                let {password ,__v,_id , ...newObj } = e._doc
                return newObj
            })
            res.status(200).send({message : ans })
        })
        .catch((err) => {
            console.log(err);
            res.status(300).send({message : err})
        })
}
