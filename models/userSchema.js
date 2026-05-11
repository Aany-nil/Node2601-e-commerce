const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: false,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    address: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }, 
    otp: {
        type: String,
        default: null,
    },
    otpExpiry: {
       type: Date,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "moderator"],
    },     
},
{ timestamp: true },
);

userSchema.pre("save", async function () {
    // Only hash if password is modified or new
    if(!this.isModified("password")) return;
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
     res.status(500).send({ message: "server error" });   
    } 
});

userSchema.methods.comparePassword = async function (plainPass) {
    return await bcrypt.compare(plainPass, this.password);
}

module.exports = mongoose.model("user", userSchema);