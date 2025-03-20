import mongoose from "mongoose";

let connectToDB = async()=> {
    await mongoose.connect(`${process.env.DB_URI}`)
    .then((response) => {
        console.log("connect with DB successfully \n..............................");
    })
    .catch((err) => {
        console.log(err);
        
    })
}

export default connectToDB ;