import * as postsDao from './posts-dao.js'
import {findUserFollowing} from "../users/users-dao.js";

const createPost = async (req, res) => {
    const newPost = req.body;
    newPost.dateCreated = (new Date()).getTime()+'';
    newPost.comments = [];
    newPost.trackId = newPost.trackId;
    newPost.userId = newPost.userId;
    const insertedPost = await postsDao
        .createPost(newPost);
    res.json(insertedPost);
}

const findPosts = async (req, res) => {
    const posts = await postsDao.findPosts()
    res.json(posts);
}
const addComment = async (req, res) => {
    const postIdToUpdate = req.params.pid;
    const comment = req.params.body;
    const commentUser = req.params.userId;
    const updatedPost = req.body;
    updatedPost.comments.push({body: comment, userId: commentUser});
    const status = await postsDao
        .updatePost(postIdToUpdate, updatedPost);
    res.json(status);
}

const deletePost = async (req, res) => {
    const postIdToDelete = req.params.pid;
    const status = await postsDao
        .deletePost(postIdToDelete);
    res.json(status);
}

const findPostById = async (req, res) => {
    const postIdToFind = req.params.pid;
    const post = await postsDao.findPost(postIdToFind);
    res.json(post);
}

const findNewPosts = async (req, res) => {
    const posts = await postsDao.findPosts().sort({date: "desc"}).limit(10);
    res.json(posts);
}

const findNewFollowingPosts = async (req, res) => {
    const userId = req.params.userId;
    const following = await findUserFollowing(userId);
    const posts = await postsDao.findFollowingPosts(following).sort({date: "desc"}).limit(10);
    res.json(posts);
}

export default (app) => {
    app.post('/api/post/:trackId/:userId', createPost);
    app.get('/api/post', findPosts);
    app.get('/api/post/:pid', findPostById);
    app.put('/api/post/:pid/:userId/:body', addComment);
    app.delete('/api/post/:pid', deletePost);
    app.get('/api/posts/home', findNewPosts);
    app.get('/api/posts/home/:userId', findNewFollowingPosts);
}
