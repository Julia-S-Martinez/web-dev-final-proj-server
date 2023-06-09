import postsModel from './posts-model.js';
export const findPosts = () => postsModel.find();
export const findPost = (pid) => postsModel.findById(pid);

export const findByTrackId = (tid) => postsModel.find({trackId: tid})
export const findFollowingPosts = (uids) => postsModel.find({userId: {$in: uids}});
export const createPost = (post) => postsModel.create(post);
export const deletePost = (pid) => postsModel.deleteOne({_id: pid});
export const updatePost = (pid, post) => postsModel.updateOne({_id: pid}, {$set: post});
