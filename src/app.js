import express from 'express'
import cors from 'cors'

import UserRouter from "./routers/user.router.js";

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


app.use('/user',UserRouter)


export default app ;