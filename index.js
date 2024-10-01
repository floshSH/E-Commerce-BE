import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './Database/dbConfig.js';
import userRoutes from './Routers/Users.router.js';
import productRoutes from './Routers/Products.router.js';
import orderRoutes from './Routers/Orders.router.js';
dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to E-Commerce API");
})
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/order", orderRoutes)
connectDB();

app.listen(process.env.port, ()=>
console.log(`Server is running on port ${process.env.port}`)
)