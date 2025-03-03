import mongoose from "mongoose";
import { DB_URL } from "../const.js";

let connectToDB = async()=> {
    await mongoose.connect(`${DB_URL}`)
    .then((response) => {
        console.log("connect with DB successfully \n..............................");
    })
    .catch((err) => {
        console.log(err);
        
    })
}

export default connectToDB ;