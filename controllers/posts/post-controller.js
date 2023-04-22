import * as postsDao from './posts-dao.js'
import {findUser, updateUser} from '../users/users-dao.js'
import {findUserFollowing} from "../users/users-dao.js";

const createPost = async (req, res) => {
    {/*
        {
            fields of post as defined in posts schema
        }
    */}
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
    {/*
        {
            "body" : body of comment
            "userId" : _id field of commenter user
        }
    */}

    const postIdToUpdate = req.params.pid;
    const comment = req.body;
    const postToUpdate = await postsDao.findPost(postIdToUpdate);
    postToUpdate.comments.push({body: comment.body, userId: comment.userId});
    const status = await postsDao
        .updatePost(postIdToUpdate, postToUpdate);
    res.json(status);
}

const deleteComment = async(req, res) => {
    const postIdToUpdate = req.params.pid;
    const post = await postsDao.findPost((postIdToUpdate));
    let postComments = post["comments"];
    const index = postComments.indexOf(req.params.cid);
    postComments.splice(index, 1);
    const postUpdates = {"comments" : postComments};

    const status = await postsDao.updatePost(postIdToUpdate, postUpdates)
    res.json(status);
}

const toggleClaim = async (req, res) => {
    {/*
        {
            "claimed" : true or false, depending on whether or not
                request is attempting to claim
            "userId" : _id field of claimer user, should be an ARTIST
        }
    */}


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


const toggleLike = async (req, res) => {
    {/*
        {
            "userId" : string of user trying to toggle Like status
                for the post
        }
    */}
    const postId = req.params.pid;
    const post = await postsDao.findPost(postId);

    const userId = req.body.userId;
    const user = await findUser(userId);

    const userInPostLikes = post.likedUsers.includes(userId);
    const postInUserLikes = user.liked_songs.includes(postId);
    // If state isn't reflected in both members, do nothing.
    if (userInPostLikes === postInUserLikes) {
        let postUpdates = {};
        let userUpdates = {};

        if (userInPostLikes) {
            // unlike
            let likedUserList = post.likedUsers;
            const index = likedUserList.indexOf(userId);
            likedUserList.splice(index, 1);
            postUpdates["likedUsers"] = likedUserList;

            let likedSongsList = user.liked_songs;
            const index_2 = likedSongsList.indexOf(postId);
            likedSongsList.splice(index_2, 1);
            userUpdates["liked_songs"] = likedSongsList;
        } else {
            // like
            postUpdates["likedUsers"] = [...post.likedUsers, userId];
            userUpdates["liked_songs"] = [...user.liked_songs, postId];
        }
        await updateUser(userId, userUpdates);
        const status = await postsDao.updatePost(postId, postUpdates);
        res.json(status);
    }
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
    const posts = await postsDao.findFollowingPosts(following.following).sort({date: "desc"}).limit(10);
    res.json(posts);
}

export default (app) => {
    app.post('/api/post/:trackId/:userId', createPost);
    app.get('/api/post', findPosts);
    app.get('/api/post/:pid', findPostById);
    app.put('/api/post/:pid/:userId', toggleClaim);
    app.put('/api/post/:pid', addComment);
    app.put('/api/like/post/:pid', toggleLike);
    app.delete('/api/post/:pid', deletePost);
    app.delete('/api/post/:pid/:cid', deleteComment);
    app.get('/api/posts/home', findNewPosts);
    app.get('/api/posts/home/:userId', findNewFollowingPosts);
}
