import express from "express";
const Router = express.Router();
import {getProfile, loginUser, logoutUser, registerUser} from "../controllers/user-controller.js"
import {isAuthenticUser} from "../middleware/auth.js";

Router.route("/auth").get((req, res) => res.send("auth"));
Router.route("/login").post(loginUser);
Router.route("/register").post(registerUser);
Router.route("/logout").post(logoutUser);
Router.route("/profile/me").get(isAuthenticUser, getProfile);



export default Router;
