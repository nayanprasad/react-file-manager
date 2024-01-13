import CatchAsyncError from "../middleware/catch-async-error.js";
import ErrorHandler from "../utils/error-handler.js";
import {sendToken} from "../utils/jwt-token.js";
import User from "../models/user-model.js";


export const loginUser = CatchAsyncError(async (req, res, next) => {

    const {email, password} = req.body

    if (!email || !password)
        return next(new ErrorHandler("please enter email & password", 400));

    const user = await User.findOne({email}).select("+password");

    if (!user)
        return next(new ErrorHandler("invalid email or password", 401));

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched)
        return next(new ErrorHandler("invalid email or password", 401));

    sendToken(user, 200, res)
})

export const registerUser = CatchAsyncError(async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
})


export const logoutUser = CatchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "logged out"
    })
})
