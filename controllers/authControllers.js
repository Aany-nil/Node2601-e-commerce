const { otpTemplate } = require("../helpers/emailTemplates");
const { mailsender } = require("../helpers/mailService");
const { isValidEmail, generateOTP, generateAccessToken, generateRefreshToken } = require("../helpers/Utils");
const userSchema = require("../models/userSchema");

const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if(!fullName) 
            return res.status(400).send({ message: "fullName is required" });
        if(!email) 
            return res.status(400).send({ message: "email is required" });
        if(!isValidEmail(email)) 
            return res.status(400).send({ message: "email is not valid" });
        if(!password) 
            return res.status(400).send({ message: "password is required" });

        const existEmail = await userSchema.findOne({ email });
        if(existEmail)
            return res.status(400).send({ message: "This email is already exist" });

         const otp = generateOTP();
        const user = userSchema.create({
            fullName,
            email,
            password,
            otp,
            otpExpiry: Date.now() + 5 * 60 * 1000,
        });
        mailsender({
            email, 
            subject: "verify your email", 
            template: otpTemplate(otp),
        });

        res.status(200).send({ message: "Registration successfully , please verify your email" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server Error" });
    }
}

const verifyOtp = async (req, res) => {
    const {email, otp} = req.body;
    try {
        if(!otp) return res.status(400).send({ message: "OTP code is required" });
      const userData = await userSchema.findOneAndUpdate({email, otp, otpExpiry: { $gt: Date.now() }, isVerified: false },
       {
         $set: {
          isVerified: true,
          otp: null,
          otpExpiry: null,
         },
       },
       {
        returnDocument: "after",
       }
    ); 
      if(!userData) {
        return res.status(400).send({ message: "Invalid request" }); 
    } 
    //  res.redirect("client url");
      res.status(200).send({message: "Email verify sucessfully" });

    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server Error" });  
    }
};

const resendOtp = async (req, res) => {
    const {email} =  req.body;
    try {
     const userData = await userSchema.findOne({ email, isVerified: false });
     if(!userData) return res.status(400).send({ message: "Invalid request" });

     const otp = generateOTP();
     userData.otp = otp;
     userData.otpExpiry = Date.now() + 5 * 60 * 1000;
     await userData.save();
     mailsender({
            email, 
            subject: "verify your email", 
            template: otpTemplate(otp),
        });
       res.status(200).send({ message: "New otp send to your email" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server Error" }); 
    }
};

const cookie_config = {
      httpOnly: false, // Not accessible by client-side JS
      secure: false, // Only sent over HTTPS
      // sameSite: 'Strict' // Only send for same-site requests

}

const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userData = await userSchema.findOne({ email }).select("+password");
        if(!userData) 
          return res.status(400).send({ message: "Invalid credential" });
        if(userData.isVerified === false) 
        return res.status(400).send({ message: "Email is not verified" });
        
       const matchPassword = await userData.comparePassword(password);
       if(!matchPassword) 
        return res.status(400).send({ message: "Password false" });
       const accessToken = generateAccessToken(userData);
       const refreshToken = generateRefreshToken(userData);

       res.status(200)
       .cookie("acc_tkn", accessToken, cookie_config)
       .cookie("ref_tkn", refreshToken, cookie_config)
       .send({ message: "Login successfully" });
    } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server Error" });   
    }
}


module.exports = { signUp, verifyOtp, resendOtp, signIn };