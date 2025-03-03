import app from "./app.js";
import connectToDB from "./DB/connectToDB.js";

const port = process.env.PORT ;

app.listen(port,() => {
    console.log(`.............................. \n app is running on port ${port}\n..............................`);
})

connectToDB();