import express from 'express';
import UserController from "./controllers/users/users-controller.js";
import PostController
    from "./controllers/posts/post-controller.js";
import AuthController from "./controllers/users/auth-controller.js";
import cors from 'cors';
import mongoose from "mongoose";

mongoose.connect(process.env.WD_FINAL_DB_STRING);

import session from "express-session";
const app = express();
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        cookie : {
            sameSite: 'none',
            secure: true
        },
    })
);
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.use(express.json());
app.use()
const port = process.env.PORT || 4000;
PostController(app);
UserController(app);
AuthController(app);
app.listen(port);