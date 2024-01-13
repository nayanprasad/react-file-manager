import express from "express";
const Router = express.Router();
import { loginUser } from "../controllers/user-controller.js"

Router.route("/auth").get((req, res) => res.send("auth"));
Router.route("/login").get(loginUser);


export default Router;
