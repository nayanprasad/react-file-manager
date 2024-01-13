import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import ErrorHandler from "../utils/error-handler.js";

export const isAuthenticUser = async (req, res, next) => {

    if(!req.headers.authorization)
        return next(new ErrorHandler("please login to access this resource", 401));

    const token = req.headers.authorization.split(" ")[1]

    if (!token)
        return next(new ErrorHandler("please login to access this resource", 401));

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRETE);
        const user = await User.findById(decodedData.id);
        if(!user)
            return next(new ErrorHandler("user not found with give token", 404));
        req.user = user
    } catch (err) {
        return next(new ErrorHandler("invalid token", 401));
    }

    return next();
}
