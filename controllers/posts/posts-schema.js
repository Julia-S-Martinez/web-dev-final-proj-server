import mongoose from "mongoose";

// TODO: decide later to swap types fo mongoose.Types.ObjectId or if
// we can convert to generic String for simplicity
const postsSchema = mongoose.Schema({
    trackId: String,
    userId: String,
    likedUsers : [String],
    comments: [{userId: String, body: String}],
}, {collection: 'Posts'});
export default postsSchema;