import mongoose from 'mongoose';
import postsSchema from "./posts-schema.js";
const postsModel = mongoose.model('PostsModel', postsSchema);
export default postsModel;