import express from 'express'
import cors from 'cors'

import StalfRouter from "./routers/stalf.router.js";
import UserRouter from "./routers/user.router.js";
import AdimRouter from "./routers/admin.router.js";
import generateEmail from './utils/generateEmail.js';

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials : true
}))

app.use(express.json({
    limit: "20kb",
}))
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}))




app.use('/stalf',StalfRouter)
app.use('/user',UserRouter)
app.use('/admin',AdimRouter)
app.post('/otp',async (req, res) =>{
    let {otp,email} = req.body
   let isSend =  await generateEmail(otp,email)
   if (isSend.status === "success") {
       res.status(200).send({
        status : true,
        messeg : "messeg sent"
       })
   }
   else {
    res.status(200).send({
        status : false,
        messeg : "not send"
       })
   }
})


export default app ;