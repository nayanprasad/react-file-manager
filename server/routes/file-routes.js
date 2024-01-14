import express from "express";
import {isAuthenticUser} from "../middleware/auth.js";
import {createFolder, getFolderDatas, getRootFolderDatas, uploadFile} from "../controllers/file-controller.js";
const Router = express.Router();

Router.route("/file").get((req, res) => res.send("file"));
Router.route("/folder").get(isAuthenticUser, getRootFolderDatas);
Router.route("/folder/:id").get(isAuthenticUser, getFolderDatas);
Router.route("/folder/new").post(isAuthenticUser, createFolder);
Router.route("/file/upload").post(isAuthenticUser, uploadFile);




export default Router;
