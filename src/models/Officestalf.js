import mongoose from "mongoose";   
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const OfficeStalfSchema = new mongoose.Schema({
    userid : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    name : {
        type : String,
        require : true,
        trim : true,
    },
    password : {
        type : String,
        require : true,
        trim : true,
    },
    phone_number : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    email : {
        type : String,
        require : true,
        trim : true,
    },
    profile_pic_URL : {
        type : String,
        trim : true,
    }
},{
    timestamps : true
});


OfficeStalfSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
})

OfficeStalfSchema.methods.genarateToken = function () {
    const token = jwt.sign({userid : this.userid} , process.env.SECRET ) ;
    return token ;
}
OfficeStalfSchema.methods.updatePassword = async function () {
    this.password = await bcrypt.hash(this.password,10) 
}

OfficeStalfSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password , this.password);
}


const OfficeStalf = mongoose.model('OfficeStalf',OfficeStalfSchema);

export default OfficeStalf ; 