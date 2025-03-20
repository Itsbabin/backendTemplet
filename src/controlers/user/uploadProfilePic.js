import uploadMeadia from "../../cloudinary/uploadPhoto.js"
import Agent from "../../models/Agent.model.js"

export default async function UploadProfilePic(req , res) {
    await uploadMeadia(`uploads/${req.file.filename}`,req.user?.userid)
    .then( async ( result) => {
        
    await Agent.findOneAndUpdate({userid : req.user?.userid} ,
        { $set: { profile_pic_URL : result.secure_url } }, 
        { new: true })
        .then((response) => {
            res.status(200).send( {
                 response
            })
        })
        .catch((error) => {
            res.status(400).send({
                error
            })
        })
        
    })
}
