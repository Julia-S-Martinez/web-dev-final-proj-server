import mongoose from 'mongoose';
const postsSchema = mongoose.Schema({
    trackId: String,
    userId: String,
    likedUsers : [String],
    comments: [{userId: String, body: String}],
}, {collection: 'Posts'});
export default postsSchema;

