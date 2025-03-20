import mongoose from "mongoose";   
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const AdminSchema = new mongoose.Schema({
    userid : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        trim : true,
    }
},{
    timestamps : true
});


AdminSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
})

AdminSchema.methods.genarateToken = function () {
    const token = jwt.sign({userid : this.userid} , process.env.SECRET ) 
    return token ;
}

AdminSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password , this.password);
}


const Admin = mongoose.model('Admin',AdminSchema);

export default Admin ; 