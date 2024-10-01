import { format } from 'date-fns';
import mongoose from 'mongoose';


const queriesSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    category:{
        type:String,
        required:true

    },
    query:{
        type:String,
        required:true
    },
    date:{
        type: String,
        default: format(new Date(), 'yyyy-MM-dd')
    },
    response:{
        type:String,
        default:""
    }
},{versionKey:false})

const queries= mongoose.model('queries',queriesSchema);

export default queries;