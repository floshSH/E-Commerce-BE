
import users from "../Models/User.schema.js";
import queries from "../Models/Queries.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const name = username;
        const user = await users.findOne({ email: email });
        const uniqUserName = await users.findOne({ name: name });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (uniqUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            name,
            email,
            password: hashPassword
        });

        
        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const userLogin= async(req, res) =>{
    try {
        const {email,password}=req.body;
        const user=await users.findOne({email:email});
        if(!user){
            res.status(400).json({message:"User not found"})
        }
        else{
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(400).json({message:"Invalid credentials"})
           
                 }
            else{
                const token= jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
            res.status(200).json({message:"Login successful", token:token});
            }
          
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
}
}



export const userExists= async(req, res)=>{
    try{
        const {email}=req.params;
       
        const user=await users.findOne({email:email});
        if(user){
            res.status(200).json({message:"Email found"})
        }
        else{
            res.status(400).json({message:"Email not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


export const resetPassword= async(req, res)=>{
    try{
        const {email,password}=req.body;
        const user=await users.findOne({email:email});
        if(!user){
            res.status(400).json({message:"User not found"})
      
            }

            user.password=await bcrypt.hash(password, 10)
            
            await user.findByIdAndUpdate(user.id, user, {new:true});
            res.status(200).json({message:"Password reset successful"})
       
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


export const deleteUser= async(req, res)=>{
    try{
        const {id}=req.body;
        await users.findByIdAndDelete(id);
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const getAllUsers= async(req, res)=>{
    try{
        const allUsers=await users.find();
        res.status(200).json({allUsers})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
} 

export const getCart= async(req, res)=>{
    try{
        
        const id=req.user.id;
        
        const user=await users.findById(id);
        
        res.status(200).json({cart:user.cart})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateCart= async(req, res)=>{
    try{
        const id=req.user.id;
      
       
        const {cart}=req.body;
      
        await users.findByIdAndUpdate(id, {cart:cart}, {new:true});
        res.status(200).json({message:"Cart updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}



export const postQuery= async(req, res)=>{
    try{
        const {category, query}=req.body;
       
        const user=req.user.id;

        const newQuery= new queries({
           
            user,
            category,
            query
        })

        await newQuery.save();
        res.status(200).json({message:"Query posted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


export const updatePersonalInfo= async(req, res)=>{
    try{
        const {name, email, mobile, gender, dob}=req.body.personalInfo;
        
        const id=req.user.id;

        await users.findByIdAndUpdate(id, {name, email, mobile, gender, dob}, {new:true});
        res.status(200).json({message:"Personal info updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const getPersonalInfo= async(req, res)=>{
    try{
        const id=req.user.id;

        const user=await users.findById(id);
            
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

