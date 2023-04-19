import * as postsDao from './posts-dao.js'
import {findUser, updateUser} from '../users/users-dao.js'
import {findUserFollowing} from "../users/users-dao.js";

const createPost = async (req, res) => {
    const newPost = req.body;
    newPost.dateCreated = (new Date()).getTime()+'';
    newPost.comments = [];
    newPost.trackId = req.params.trackId;
    newPost.userId = req.params.userId;
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

const toggleClaim = async (req, res) => {
    const postIdToUpdate = req.params.pid;
    const userId = req.params.userId;
    const user = await findUser(userId).lean();
    let updates = req.body;
    const originalPost = await postsDao.findPost(postIdToUpdate);


    if (user["role"] === "ARTIST" && updates.claimed !== originalPost["claimed"]) {
        if (updates.claimed === true) {
            // then we can let the post be claimed, insert artist in the userId
            updates["userId"] = userId;
            let new_songs = {"created_songs" : [...user["created_songs"], postIdToUpdate]}
            await updateUser(userId, new_songs);
        } else {
            //TODO: retrieve original artist ID from spotify api
            //pass
            updates["userId"] = "";
            // updates["claimed"] is already false
            let song_list = user["created_songs"];
            const index = song_list.indexOf(postIdToUpdate);
            song_list.splice(index, 1);
            let userUpdates = {"created_songs" : song_list}
            await updateUser(userId, userUpdates);
        }
    } else {
        updates = {};
    }
    const status = await postsDao.updatePost(postIdToUpdate, updates);
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
    app.put('/api/post/:pid/:userId', toggleClaim);
    app.put('/api/post/:pid/:userId/:body', addComment);
    app.delete('/api/post/:pid', deletePost);
    app.get('/api/posts/home', findNewPosts);
    app.get('/api/posts/home/:userId', findNewFollowingPosts);
}
