import uploadMeadia from "../../cloudinary/uploadPhoto.js"
import Agent from "../../models/Agent.model.js"

async function UploadAdhaar(req , res) {
    await uploadMeadia(`uploads/${req.file.filename}`,`${req.user?.userid}_adhaar`)
    .then( async ( result) => {

    await Agent.findOneAndUpdate({userid : req.user?.userid} ,
        { $set: { adhaar_pic_URL : result.secure_url } }, 
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
async function UploadPan(req , res) {
    await uploadMeadia(`uploads/${req.file.filename}`,`${req.user?.userid}_pan`)
    .then( async ( result) => {

    await Agent.findOneAndUpdate({userid : req.user?.userid} ,
        { $set: { pan_pic_URL : result.secure_url } }, 
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
async function UploadKycPic(req , res) {
    await uploadMeadia(`uploads/${req.file.filename}`,`${req.user?.userid}_kycPic`)
    .then( async ( result) => {

    await Agent.findOneAndUpdate({userid : req.user?.userid} ,
        { $set: { kyc_profile_pic_URL : result.secure_url } }, 
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
async function UploadSignaturePic(req , res) {
    await uploadMeadia(`uploads/${req.file.filename}`,`${req.user?.userid}_signaturePic`)
    .then( async ( result) => {

    await Agent.findOneAndUpdate({userid : req.user?.userid} ,
        { $set: { signature_pic_URL : result.secure_url } }, 
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

export {UploadAdhaar , UploadKycPic , UploadPan , UploadSignaturePic}
