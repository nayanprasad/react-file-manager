import express from "express";
const Router = express.Router();
import {loginUser, logoutUser, registerUser} from "../controllers/user-controller.js"

Router.route("/auth").get((req, res) => res.send("auth"));
Router.route("/login").post(loginUser);
Router.route("/register").post(registerUser);
Router.route("/logout").post(logoutUser);



export default Router;
