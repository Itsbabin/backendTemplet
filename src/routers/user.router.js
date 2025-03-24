import { Router } from "express";
import UserSingupControler from "../controlers/user/userSignup.controler.js";
import UserLoginControler from "../controlers/user/userLogin.controler.js";
import verifyJwtUser from "../mmiddleware/verifyJWT.user.js";
import UploadProfilePic from "../controlers/user/uploadProfilePic.js";
import { UploadAdhaar, UploadKycPic, UploadPan, UploadSignaturePic } from "../controlers/user/uploadKycDocuments.user.js";
import multer from "multer";
import SearchUserControler from "../controlers/user/searchUser.js";
import UpdatePasswordControler from "../controlers/user/updatePassword.js";
import UpdateAddressControler from "../controlers/user/UpdateAddressControler.js";

const upload = multer({dest : 'uploads/'})

let router = Router();

router.route('/singup').post(upload.single('profilePic'),UserSingupControler);
router.route('/login').post(UserLoginControler);
router.route('/search').post(SearchUserControler);
router.route('/update/password').post(verifyJwtUser,UpdatePasswordControler);
router.route('/update/address').post(verifyJwtUser,UpdateAddressControler);
router.route('/upload/ProfilePic').post(verifyJwtUser,upload.single('profilePic'),UploadProfilePic);
router.route('/upload/adhaar').post(verifyJwtUser,upload.single('profilePic'),UploadAdhaar);
router.route('/upload/pan').post(verifyJwtUser,upload.single('profilePic'),UploadPan);
router.route('/upload/kyc_profile_pic_URL').post(verifyJwtUser,upload.single('profilePic'),UploadKycPic);
router.route('/upload/signature_pic_URL').post(verifyJwtUser,upload.single('profilePic'),UploadSignaturePic);

export default router;