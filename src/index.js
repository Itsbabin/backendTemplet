import app from "./app.js";

const port = process.env.PORT ;

app.listen(port,() => {
    console.log(`.............................. \n app is running on port ${port}\n..............................`);
})