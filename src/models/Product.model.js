import mongoose from "mongoose";   
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const ProductSchema = new mongoose.Schema({
    userid : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
},{
    timestamps : true
});



const Product = mongoose.model('Product',ProductSchema);

export default Product ; 