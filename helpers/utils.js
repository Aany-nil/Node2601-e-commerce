const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const cloudinary = require("../configs/cloudinaryConfig");


function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
}

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "1hr" }

  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "15d" }

  );
}; 

const uploadToCloudinary = async ({mimetype, imgBuffer})=> {

const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;

   const res = await cloudinary.uploader.upload(dataUrl);
   return res.secure_url;
};

const destroyFromCloudinary = (url) => {
 const publicId =  url.split("/").pop().split(".").shift();     
cloudinary.uploader.destroy(publicId, (error, result) => {
       if(error) {
          console.log("destroy from cloudinary:", error)    
       }
   });
}



module.exports = { 
  isValidEmail, 
  generateOTP, 
  generateAccessToken, 
  generateRefreshToken, 
  uploadToCloudinary,
  destroyFromCloudinary, 
}