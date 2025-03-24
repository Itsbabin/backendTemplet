import express from 'express'
import cors from 'cors'

import StalfRouter from "./routers/stalf.router.js";
import UserRouter from "./routers/user.router.js";
import AdimRouter from "./routers/admin.router.js";
import generateEmail from './utils/generateEmail.js';
import ConfirmEmail from './utils/ConfirmEmail.js';
const app = express();

app.use(cors({
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "*",
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


app.get('/',(req,res) =>{
        res.status(200).send({messeg : "hello"})
})

app.use('/stalf',StalfRouter)
app.use('/user',UserRouter)
app.use('/admin',AdimRouter)
app.post('/otp',async (req, res) =>{
    let {otp,email} = req.body
 try {
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
} catch (error) {
    res.status(200).send({
        status : false,
        messeg : "not send"
       })
}
})
app.post('/confirm',async (req, res) =>{
    try {
    let {User,Password,email} = req.body
   let isSend =  await ConfirmEmail(User,Password,email)
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
} catch (error) {
    res.status(200).send({
        status : false,
        messeg : "not send"
       })
}
})




export default app ;