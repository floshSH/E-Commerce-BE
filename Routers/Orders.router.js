import express from 'express';
import { getOrders, newOrder, updateDeliveryAddress, updateOrder } from '../Controllers/Orders.controller.js';
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

const router=express.Router();

router.post('/newOrder',AuthMiddleware, newOrder);
router.put("/updateOrder", AuthMiddleware , updateOrder);
router.get("/getOrders",AuthMiddleware, getOrders);
router.put("/updateDeliveryAddress",AuthMiddleware, updateDeliveryAddress );

export default router;