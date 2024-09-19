import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin : "*",
    optionsSuccessStatus: 200,
    credentials : true
}))




export default app ;