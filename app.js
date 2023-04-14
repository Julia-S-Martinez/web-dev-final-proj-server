import express from 'express';
import UserController from "./controllers/users/users-controller.js";
import MusicController
    from "./controllers/posts/post-controller.js";
import cors from 'cors'
import mongoose from "mongoose";

mongoose.connect(process.env.WD_FINAL_DB_STRING);
const app = express()
app.use(cors())
app.use(express.json());
MusicController(app);
UserController(app);
app.listen(process.env.PORT || 4000);