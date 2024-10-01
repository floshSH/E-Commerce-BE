import orders from '../Models/Orders.schema.js'


export const newOrder= async(req, res)=>{
    try{
        let {order,totalQuantity, totalAmount, deliveryAddress}=req.body;
        const id=req.user.id;
        
       totalAmount=(totalAmount).toFixed(2);
        const newOrder= new orders({user:id, order,totalQuantity, totalAmount, deliveryAddress});
        
        await newOrder.save();
        res.status(200).json({message:"Order placed successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }

}


export const updateOrder= async(req,res)=>{
    try{
        const {orderId,status}=req.body;


        await orders.findByIdAndUpdate({_id:orderId}, {status});
        res.status(200).json({message:"Order status updated successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}

export const getOrders= async(req, res)=>{
    try{
        const id=req.user.id;
        
        const allOrders= await orders.find({user:id}).sort({createdAt:1});
        res.status(200).json({data:allOrders})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}


export const updateDeliveryAddress= async(req, res)=>{
    try{
        const {orderId, deliveryAddress}=req.body;
        
        await orders.findByIdAndUpdate({_id:orderId}, {deliveryAddress});
        res.status(200).json({message:"Delivery address updated successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}