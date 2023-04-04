import express from 'express';
import UserController from "./controllers/users/users-controller.js";
import MusicController
    from "./controllers/posts/post-controller.js";
import cors from 'cors'
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://aqua7cs:Rn5j37VMqKfSil2o@webdevprojectsp23.e30xhje.mongodb.net/FinalProject")
const app = express()
app.use(cors())
app.use(express.json());
MusicController(app);
UserController(app);
app.listen(process.env.PORT || 4000);