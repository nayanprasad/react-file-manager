import express from "express"
import {configDotenv} from "dotenv";
import error from "./middleware/error.js";
import requestLogger from "node-requset-logger";
import bodyParser from "body-parser";
import cors from "cors";

configDotenv({ path: 'config/config.env' })
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestLogger());

import userRoutes from "./routes/user-routes.js";
import fileRoutes from "./routes/file-routes.js";

app.get("/", (req, res) => res.send("react file manager api"));
app.use("/api/v1", userRoutes);
app.use("/api/v1", fileRoutes);


app.use(error);

export default app;
