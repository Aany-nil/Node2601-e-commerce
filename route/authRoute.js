const express = require("express");
const multer = require("multer");
const upload = multer();
const { 
    signUp, 
    verifyOtp, 
    resendOtp, 
    signIn, 
    getProfile, 
    updateProfile } = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/signup", signUp);
route.post("/verify-email", verifyOtp);
route.post("/resend-otp", resendOtp);
route.post("/signin", signIn);
route.get("/getprofile", authMiddleware, getProfile);
route.put(
    "/updateprofile", 
    authMiddleware, 
    upload.single("avatar"), 
     updateProfile,
    );


module.exports = route;