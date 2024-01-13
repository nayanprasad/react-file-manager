import express from "express";
import {isAuthenticUser} from "../middleware/auth.js";
import {createFolder, uploadFile} from "../controllers/file-controller.js";
const Router = express.Router();

Router.route("/file").get((req, res) => res.send("file"));
Router.route("/folder/new").post(isAuthenticUser, createFolder);
Router.route("/file/upload").post(isAuthenticUser, uploadFile);




export default Router;
