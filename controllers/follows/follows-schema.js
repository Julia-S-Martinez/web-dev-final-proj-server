import mongoose from "mongoose";
const followsSchema = new mongoose.Schema(
    {
        follwer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { collection: "follows" }
);

export default followsSchema;