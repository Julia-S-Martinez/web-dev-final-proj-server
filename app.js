import express from 'express';
import UserController from "./controllers/users/users-controller.js";
import PostController
    from "./controllers/posts/post-controller.js";
import AuthController from "./controllers/users/auth-controller.js";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect(process.env.WD_FINAL_DB_STRING);

import session from "express-session";
const app = express();

const sess = {
    secret: "any string",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false},
};
if (process.env.ENV === 'PROD') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.sameSite = 'none';
}
app.use(
    session(sess)
);

app.use(
    cors({
        credentials: true,
        origin: process.env.WD_CORS_ORIGIN
    })
);
app.use(bodyParser.json());

app.use(express.json());
const port = process.env.PORT || 4000;
PostController(app);
UserController(app);
AuthController(app);
app.listen(port);