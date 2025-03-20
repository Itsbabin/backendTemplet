import OfficeStalf from "../../models/Officestalf.js"

export default async function UpdatePasswordControler(req , res) {
   let {userid} = req.body

   await OfficeStalf.findOne({userid})
   .then((response) =>{
           response.updatePassword()
   })
}
