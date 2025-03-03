import OfficeStalf from "../../models/Officestalf.js";
import mongoose from "mongoose";

async function  SingupControler(req,res) {
    let {userid , name ,password, phone_number , email , adhaar , pan , pin , address , profile_pic_URL , signature_pic_URL} = req.body
    await OfficeStalf.create({
        userid , name ,password, phone_number , email , adhaar , pan , pin , address , profile_pic_URL , signature_pic_URL
    })
    .then((response)=>{
        res.status(200).send({
             response
        })
    })
    .catch((err)=>{
        res.status(300).send({
            messeg : "err"
        })
        console.log(err);
    })
     
}

export default SingupControler;