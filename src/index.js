import app from "./app.js";
import connectToDB from "./DB/connectToDB.js";
import { configDotenv } from "dotenv"

configDotenv()
if (process.env.NODE_ENV == "developent") {
    console.log = function() {};
    console.debug =function() {};
    console.info = function() {};
    console.warn = function() {};
   console.error = function() {};
}

const port = process.env.PORT ;

app.listen(port,() => {
    console.log(`..............................\n app is running on port ${port}\n..............................`);
})

connectToDB();