import express from 'express'
import cors from 'cors'

import StalfRouter from "./routers/stalf.router.js";
import UserRouter from "./routers/user.router.js";
import AdimRouter from "./routers/admin.router.js";
import generateEmail from './utils/generateEmail.js';
import ConfirmEmail from './utils/ConfirmEmail.js';
import sendOTP from './utils/SmsOTP/SMSOTP.js';
import SMSConfirm from './utils/SmsOTP/SMSConfirm.js';
const app = express();

app.use(cors({
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "*",
      origin : process.env.CORS_ORIGIN,
      optionsSuccessStatus: 200,
      credentials : true
}))


app.use(express.json({
    limit: "10mb",
}))
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}))


app.get('/',(req,res) =>{
        res.status(200).send({messeg : "hello"})
})

app.use('/stalf',StalfRouter)
app.use('/user',UserRouter)
app.use('/admin',AdimRouter)


app.post('/otp',sendOTP)
app.post('/confirm',SMSConfirm)




export default app ;