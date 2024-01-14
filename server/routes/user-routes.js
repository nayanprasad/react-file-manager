import express from "express";
import {getProfile, loginUser, logoutUser, registerUser} from "../controllers/user-controller.js"
import {isAuthenticUser} from "../middleware/auth.js";

const Router = express.Router();

Router.route("/auth").get((req, res) => res.send("auth"));
Router.route("/login").post(loginUser);
Router.route("/register").post(registerUser);
Router.route("/logout").get(logoutUser);
Router.route("/profile/me").get(isAuthenticUser, getProfile);


export default Router;
