import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    ProductId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    quantity: {
        type: Number,
        default: 1
    }
});
const userSchema= mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    mobile:{type:String,default:""},
    gender:{type:String,default:""},
    dob:{type:String,default:""},
    
    cart: {
        type: [cartSchema],
        default: []
    }
},{versionKey: false})

const users=mongoose.model("users",userSchema)
export default users;