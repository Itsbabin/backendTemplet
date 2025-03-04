import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const AgentSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    bv: {
        type: Number,
        trim: true,
    },
    rank : {
        type: Number,
        trim: true,
    },
    date_of_birth : {
        type : Date
    },
    introducer: {
        id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        require : true,
        trim : true,},
        name : {
            type : String,
            trim : true,
        }
    },
    juniors: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent",
            trim : true,
        },
        name: {
            type: String,
            trim: true
        }
    }],
    kyc : {
        type : Number,
    },
    phone_number: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    adhaar: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    pan: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    pin: {
        require: true,
        type: Number,
        trim: true,
    },
    address: {
        require: true,
        type: String,
        trim: true,
    },
    adhaar_pic_URL: {
        type: String,
        trim: true,
    },
    profile_pic_URL: {
        type: String,
        trim: true,
    },
    kyc_profile_pic_URL: {
        type: String,
        trim: true,
    },
    pan_pic_URL: {
        type: String,
        trim: true,
    },
    signature_pic_URL: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});


AgentSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

AgentSchema.methods.genarateToken = function () {
    const token = jwt.sign({ userid: this.userid }, process.env.SECRET);
    return token;
}

AgentSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password);
}


const Agent = mongoose.model('Agent', AgentSchema);

export default Agent; 