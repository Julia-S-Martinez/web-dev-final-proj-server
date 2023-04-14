import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        role: {
            type: String,
            default: "listener",
            enum: ["artist", "listener"],
        },
    },
    { collection: "users" }
);

export default usersSchema;