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

    await Folder.updateOne({_id: parent}, {$push: {folders: folder._id}})
    res.status(201).json({
        success: true,
        folder
    })
})

export const getFolderDatas = CatchAsyncError(async (req, res, next) => {

    const {id} = req.params;

    const folder = await Folder.findById(id);

    if(!folder)
        return next(new ErrorHandler("folder not found", 404));

    const owner = folder.owner.toString()

    if(owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this folder", 403));

    const files = await File.find({folder: id});
    const folders = await Folder.find({parent: id});

    res.status(200).json({
        success: true,
        files,
        folders
    })
})

export const getRootFolderDatas = CatchAsyncError(async (req, res, next) => {

    const folder = await Folder.findOne({parent: null, name: "root", owner: req.user._id});

        if(!folder)
            return next(new ErrorHandler("folder not found", 404));


        const files = await File.find({folder: folder._id});

        const folders = await Folder.find({parent: folder._id});

        res.status(200).json({
            success: true,
            folders
        })
    })
