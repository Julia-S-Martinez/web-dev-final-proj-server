import * as usersDao from './users-dao.js'
import {findUser} from "./users-dao.js";

const UserController = (app) => {
    app.get('/api/users/followers/:uid', findFollowers)
    app.get('/api/users/following/:uid', findFollowing)
    app.get('/api/users/:uid', findUserById);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}
const updateUser = async (req, res) => {
    {/*
        {
            any user field and value to change
        }
    */}

    const userId = req.params['uid'];
    const updatedUser = req.body;
    const status = await usersDao
        .updateUser(userId, updatedUser);
    res.json(status);
}

const createUser = async (req, res) => {
    {/*
        {
            all user fields defined in user schema
        }
    */}
    const newUser = req.body;
    const status = await usersDao
        .createUser(newUser);
    res.json(status);
}

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers()
    res.json(users);
}

const deleteUser = async (req, res) => {
    const userIdToDelete = req.params['uid'];
    const status = await usersDao
        .deleteUser(userIdToDelete);
    res.json(status);
}

const findUserById = async (req, res) => {
    const userId = req.params.uid;
    const status = await usersDao
        .findUser(userId);
    res.json(status);
}

const findFollowing = async (req, res) => {
    const userId = req.params.uid
    const followingList = await usersDao
        .findUserFollowing(userId);
    res.json(followingList['following']);
}

const findFollowers = async (req, res) => {
    const userId = req.params.uid
    const followerList = await usersDao
        .findUserFollowers(userId);
    res.json(followerList['followers']);
}

const followUser = async (req, res) => {
    {/*
        {
            "follower" : <uid of follower>
        }
    */}

    const uidFollower = req.body['follower'];
    const uidToFollow = req.params.uid;

    const follower = await findUser(uidFollower);
    follower.following.push(uidToFollow);
    await usersDao.updateUser(uidFollower, follower);

    const following = await findUser(uidToFollow);
    following.followers.push(uidFollower);
    const status = await usersDao.updateUser(uidToFollow, following);
    res.json(status);
}

const unfollowUser = async (req, res) => {
    {/*
        {
            "follower" : <uid of follower>
        }
    */}

    const uidFollower = req.body['follower'];
    const uidToUnfollow = req.params.uid;

    const follower = await findUser(uidFollower);
    let followingList = follower.following;
    const index1 = followingList.indexOf(uidToUnfollow);
    followingList.splice(index1, 1);
    await usersDao.updateUser(uidFollower, follower);

    const unfollowing = await findUser(uidToUnfollow);
    let followerList = unfollowing.followers;
    const index2 = followerList.indexOf(uidFollower);
    followerList.splice(index2, 1);
    const status = await usersDao.updateUser(uidToUnfollow, unfollowing);
    res.json(status);
}

export default (app) => {
    app.post('/api/user', createUser);
    app.get('/api/user', findUsers);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/followers/:uid', findFollowers);
    app.get('/api/user/following/:uid', findFollowing);
    app.put('/api/user/:uid', updateUser);
    app.put('/api/user/follow/:uid', followUser)
    app.put('/api/user/unfollow/:uid', unfollowUser)
    app.delete('/api/user/:uid', deleteUser);
}