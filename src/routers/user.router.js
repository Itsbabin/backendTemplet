import { Router } from "express";
import SingupControler from "../controlers/user/singup.controler.js";


let router = Router();

router.route('/singup').post(SingupControler);

export default router;