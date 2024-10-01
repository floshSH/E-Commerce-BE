import { format } from 'date-fns';
import mongoose from 'mongoose';


const reviewSchema=mongoose.Schema({
    user:{
        type:String,
        ref:'users',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comments:{
        type:String,
        required:true
    },
    reviewed_date:{
        type:String,
        default:format(new Date(), 'yyyy-MM-dd')
    
    }
},{versionKey:false})

const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        
            type:Number,
            required:true
        },
    count:{
            type:Number,
            required:true
        },
    customer_review:{
        type:[reviewSchema],
        default:[]
    }
    
},{versionKey:false})

const products=mongoose.model('products',productSchema);
export default products;