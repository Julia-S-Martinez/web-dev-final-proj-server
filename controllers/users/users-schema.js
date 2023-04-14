import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    profilePicture: String,
    username: String,
    password: String,
    following : [String],
    followers : [String],
    role : {type: "String", enum: ['LISTENER', 'ARTIST']},
    likedOrPostedSongs : [String],
}, {collection: 'Users'});
export default usersSchema;