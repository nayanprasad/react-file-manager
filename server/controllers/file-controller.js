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

    if (!name)
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

    if (!folder)
        return next(new ErrorHandler("folder not found", 404));

    const owner = folder.owner.toString()

    if (owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this folder", 403));

    const files = await File.find({folder: id});
    const folders = await Folder.find({parent: id});

    let ancestors = [];
    ancestors.push({
        _id: folder._id,
        name: folder.name,
        parent: folder.parent
    });
    let parent = folder.parent;
    while (parent) {
        const folder = await Folder.findById(parent).select("_id name parent");
        ancestors.push(folder);
        parent = folder.parent;
    }

    ancestors.reverse();

    res.status(200).json({
        success: true,
        files,
        folders,
        ancestors
    })
})

export const getRootFolderDatas = CatchAsyncError(async (req, res, next) => {

    const folder = await Folder.findOne({parent: null, name: "root", owner: req.user._id});

    if (!folder)
        return next(new ErrorHandler("folder not found", 404));

    const files = await File.find({folder: folder._id});

    res.status(200).json({
        success: true,
        files,
        folder
    })
})


export const deleteFile = CatchAsyncError(async (req, res, next) => {
    const {id} = req.params;

    const file = await File.findById(id);

    if (!file)
        return next(new ErrorHandler("file not found", 404));

    const owner = file.owner.toString()

    if (owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this file", 403));

    await File.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "file deleted"
    })
})


export const deleteFolder = CatchAsyncError(async (req, res, next) => {
    const {id} = req.params;

    const folder = await Folder.findById(id);

    if (!folder)
        return next(new ErrorHandler("folder not found", 404));

    if (folder.name === "root")
        return next(new ErrorHandler("you can't delete root folder", 403));

    const owner = folder.owner.toString()

    if (owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this folder", 403));

    const parent = folder.parent;

    if (parent)
        await Folder.updateOne({_id: parent}, {$pull: {folders: id}})  // remove folder from parent


    await Folder.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "folder deleted"
    })
})


export const renameFile = CatchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;

    const file = await File.findById(id);

    if (!file)
        return next(new ErrorHandler("file not found", 404));

    const owner = file.owner.toString()

    if (owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this file", 403));

    const d = await File.findByIdAndUpdate(id, {name});
    console.log(d)

    res.status(200).json({
        success: true,
        message: "file renamed"
    })
})


export const renameFolder = CatchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;

    const folder = await Folder.findById(id);

    if (!folder)
        return next(new ErrorHandler("folder not found", 404));

    if (folder.name === "root")
        return next(new ErrorHandler("you can't rename root folder", 403));

    const owner = folder.owner.toString()

    if (owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this folder", 403));


    await Folder.findByIdAndUpdate(id, {name});

    res.status(200).json({
        success: true,
        message: "folder renamed"
    })
});


export const getAllFolders = CatchAsyncError(async (req, res, next) => {

    const folders = await Folder.find({owner: req.user._id});
    folders.sort((a, b) => {
        return a.createdAt - b.createdAt
    })

    res.status(200).json({
        success: true,
        folders
    })
});

export const moveFile = CatchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    const {folder} = req.body;

    console.log(folder)

    const file = await File.findById(id);

    if (!file)
        return next(new ErrorHandler("file not found", 404));

    const owner = file.owner.toString()

    if (owner !== req.user._id.toString())
        return next(new ErrorHandler("you are not allowed to access this file", 403));

    const folderObj = await Folder.findById(folder);

    if (!folderObj)
        return next(new ErrorHandler("folder not found", 404));

    const updatedFile = await File.findByIdAndUpdate(id, {folder});

    res.status(200).json({
        success: true,
        message: "file moved",
        updatedFile
    })
});


const buildFolderHierarchy = async (parent, userId) => {

    const folders = await Folder.find({parent, owner: userId}).select("_id name parent");

    const folderStructure = [];

    for (let folder of folders) {
        const children = await buildFolderHierarchy(folder._id, userId);
        folderStructure.push({
            _id: folder._id,
            name: folder.name,
            parent: folder.parent,
            children
        })
    }

    return folderStructure;
}

export const getFolderHierarchy = CatchAsyncError(async (req, res, next) => {

    const userId = req.user._id;
    const folderStructure = await buildFolderHierarchy(null, userId);
    res.json(folderStructure);
})
