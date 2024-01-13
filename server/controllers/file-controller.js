import CatchAsyncError from "../middleware/catch-async-error.js";
import ErrorHandler from "../utils/error-handler.js";
import Folder from "../models/folder-model.js";
import File from "../models/file-model.js";


export const uploadFile = CatchAsyncError(async (req, res, next) => {
    const {name, size, type, url, folder} = req.body;

    const file = await File.create({
        name,
        size,
        type,
        url,
        folder: folder,
        owner: req.user._id
    });

    res.status(201).json({
        success: true,
        file
    })

})

export const createFolder = CatchAsyncError(async (req, res, next) => {

    const {name, parent} = req.body;

    if(!name)
        return next(new ErrorHandler("please enter folder name", 400));

    const folder = await Folder.create({
        name,
        parent,
        owner: req.user._id
    });

    res.status(201).json({
        success: true,
        folder
    })
})
