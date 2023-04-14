import mongoose from 'mongoose';
const schema = mongoose.Schema({
    userId: String,
    date: String,
    trackId: String,
    likes: Number,
    comments:[{body: String, userId: String}]
}, {collection: 'posts'});
export default schema;