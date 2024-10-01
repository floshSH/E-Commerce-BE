import { format } from 'date-fns';
import mongoose from 'mongoose';

const usersOrdersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    order: [{
        productId:{type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    totalQuantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: String,
        default: format(new Date(), 'yyyy-MM-dd')
    },
    
    deliveryAddress:{
        name:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:Number,required:true},
        mobile:{type:String,required:true}
    }
    ,
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled', 'delivered'],
        default: 'pending'
    }
},{versionKey:false});

const orders = mongoose.model('orders', usersOrdersSchema);
export default orders;