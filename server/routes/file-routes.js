import express from "express";
import {isAuthenticUser} from "../middleware/auth.js";
import {
    createFolder,
    deleteFile, deleteFolder,
    getFolderDatas,
    getRootFolderDatas,
    uploadFile
} from "../controllers/file-controller.js";
const Router = express.Router();

Router.route("/file").get((req, res) => res.send("file"));
Router.route("/file/upload").post(isAuthenticUser, uploadFile);
Router.route("/file/:id").delete(isAuthenticUser, deleteFile);
Router.route("/folder").get(isAuthenticUser, getRootFolderDatas);
Router.route("/folder/new").post(isAuthenticUser, createFolder);
Router.route("/folder/:id").get(isAuthenticUser, getFolderDatas);
Router.route("/folder/:id").delete(isAuthenticUser, deleteFolder);




export default Router;
