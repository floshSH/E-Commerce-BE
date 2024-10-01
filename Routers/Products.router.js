import express from 'express';
import { addproduct, addReview, getProductByID, getProducts, removeProduct } from '../Controllers/Products.controller.js';
import AuthMiddleware from "../Middleware/AuthMiddleware.js";


const router=express.Router();

router.post("/addproduct", addproduct);
router.delete("/deleteProduct", removeProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:id", getProductByID);
router.put("/addReview/:id",AuthMiddleware , addReview )

export default router;
