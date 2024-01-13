import express from "express"
import {configDotenv} from "dotenv";


configDotenv({ path: 'config/config.env' })
const app = express();


app.get("/", (req, res) => res.send("Hello World"));

export default app;
