import { Router } from "express";
import BulkJoinControler from "../controlers/admin/BulkJoin.controler.js";
import creatAdimControler from "../controlers/admin/creatAdim.controler .js";
import loginAdmin from "../controlers/admin/login.controler.js";


let router = Router();

router.route('/singup').post(creatAdimControler);
router.route('/login').post(loginAdmin);
router.route('/bulkJoin').post(BulkJoinControler); 

export default router;