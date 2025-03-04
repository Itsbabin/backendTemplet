import { Router } from "express";
import SingupControler from "../controlers/stalf/singup.controler.js";
import LoginControler from "../controlers/stalf/login.controler.js";


let router = Router();

router.route('/singup').post(SingupControler);
router.route('/login').post(LoginControler);
// router.route('/updatePassword').post(LoginControler);

export default router;