import mongoose from 'mongoose';
const postsSchema = mongoose.Schema({
    trackId: {type: String, required : true},
    userId: {type: String, required: true},
    likedUsers : {type: [String], required : true, default : []},
    claimed : {type: Boolean, required : true, default : false},
    comments: {type: [{userId: String, body: String}], required : true, default : []},
}, {collection: 'Posts'});
export default postsSchema;

