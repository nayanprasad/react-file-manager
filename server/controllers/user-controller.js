import CatchAsyncError from "../middleware/catch-async-error.js";
import ErrorHandler from "../utils/error-handler.js";
export const loginUser = CatchAsyncError(async (req, res, next) => {

    return next(new ErrorHandler("invalid email or password", 401));

    res.status(200).json({
        success: true,
        message: "login user"
    })
})
