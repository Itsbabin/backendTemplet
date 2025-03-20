import { Router } from "express";
import SingupControler from "../controlers/stalf/singup.controler.js";
import LoginControler from "../controlers/stalf/login.controler.js";
import SearchStalfControler from "../controlers/stalf/searchStalf.js";
import multer from "multer";


let router = Router();
const upload = multer({dest : 'uploads/'})

router.route('/singup').post(upload.single('profilePic'),SingupControler);
router.route('/login').post(LoginControler);
router.route('/search').post(SearchStalfControler);
// router.route('/updatePassword').post(LoginControler);

export default router;