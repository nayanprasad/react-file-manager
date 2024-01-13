import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
        minLength: [4, 'Your name cannot be less than 4 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password must be longer than 8 characters'],
        select: false, // This will not show the password in the response when we get the user by find methods
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJWTToken = function () {
    console.log(process.env.JWT_SECRETE)
    console.log(process.env.JWT_EXPIRE)
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}


const User = mongoose.model("User", userSchema);

export default User;
