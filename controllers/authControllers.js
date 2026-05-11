const { otpTemplate } = require("../helpers/emailTemplates");
const { mailsender } = require("../helpers/mailService");
const { isValidEmail, generateOTP } = require("../helpers/Utils");
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


module.exports = { signUp };