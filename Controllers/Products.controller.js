import products from "../Models/Products.schema.js"
import users from "../Models/User.schema.js";

export const addproduct= async(req, res)=>{
    try{
        const product= new products(req.body);
        await product.save();
        res.status(200).json({message:"Product added successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}

export const removeProduct= async(req, res)=>{
    try{
        const {id}=req.body;
        await products.findByIdAndDelete(id);
        res.status(200).json({message:"Product removed successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}

export const updateProduct= async(req, res)=>{
    try{
        const {id}=req.body;
        await products.findByIdAndUpdate(id, req.body);
        res.status(200).json({message:"Product updated successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}

export const getProducts= async(req, res)=>{
    try{
       
        const product= await products.find();
        res.status(200).json({data:product})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}

export const getProductByID= async(req, res)=>{
    try{
        const {id}=req.params;
        
        const product= await products.findById(id);
        
        res.status(200).json({data:product})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}



export const addReview= async(req, res)=>{
    try{
        const {id}=req.params;
        const userId= req.user.id;
       
        const userDetail= await users.findById(userId);
      
        const {rating, comments}=req.body;
        const product= await products.findById(id);
        
        product.customer_review.push({user:userDetail.name, rating, comments});
       
        await products.findByIdAndUpdate(id,{customer_review: product.customer_review}, {new:true});
        res.status(200).json({message:"Review added successfully"})
    }
    catch(err){
        res.status(500).json({message:"Request failed"})
    }
}

