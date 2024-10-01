import express from "express";
import { getCart, getPersonalInfo, postQuery, resetPassword, updateCart, updatePersonalInfo, userExists, userLogin, userRegister } from "../Controllers/Users.controller.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

const router=express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/checkUser/:email", userExists);
router.put("/resetPassword", resetPassword);
router.delete("/deleteUser");
router.get("/getcart",AuthMiddleware, getCart);
router.put("/updateCart", AuthMiddleware, updateCart);
router.post("/query", AuthMiddleware, postQuery);
router.put("/updatePersonalInfo", AuthMiddleware, updatePersonalInfo);
router.get("/getPersonalInfo", AuthMiddleware, getPersonalInfo)
export default router;