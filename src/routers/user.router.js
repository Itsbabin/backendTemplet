import { Router } from "express";
import UserSingupControler from "../controlers/user/userSignup.controler.js";
import UserLoginControler from "../controlers/user/userLogin.controler.js";
import verifyJwtUser from "../mmiddleware/verifyJWT.user.js";
import UploadProfilePic from "../controlers/user/uploadProfilePic.js";
import { UploadAdhaar, UploadKycPic, UploadPan, UploadSignaturePic } from "../controlers/user/uploadKycDocuments.user.js";
import multer from "multer";


const upload = multer({dest : 'uploads/'})

let router = Router();

router.route('/singup').post(UserSingupControler);
router.route('/login').post(UserLoginControler);
router.route('/upload/ProfilePic').post(verifyJwtUser,upload.single('profilePic'),UploadProfilePic);
router.route('/upload/adhaar').post(verifyJwtUser,upload.single('profilePic'),UploadAdhaar);
router.route('/upload/pan').post(verifyJwtUser,upload.single('profilePic'),UploadPan);
router.route('/upload/kyc_profile_pic_URL').post(verifyJwtUser,upload.single('profilePic'),UploadKycPic);
router.route('/upload/signature_pic_URL').post(verifyJwtUser,upload.single('profilePic'),UploadSignaturePic);

export default router;