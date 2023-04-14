import * as usersDao from './users-dao'

const UserController = (app) => {
    app.get('/api/users/followers/:uid', findFollowers)
    app.get('/api/users/following/:uid', findFollowing)
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users/:username/:password/:role', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}
const updateUser = async (req, res) => {
    const userId = req.params['uid'];
    const updatedUser = req.body;
    const status = await usersDao
        .updateUser(userId, updatedUser);
    res.json(status);
}

const createUser = async (req, res) => {
    const newUser = req.body;
    newUser.username = req.params.username;
    newUser.password = req.params.password;
    newUser.role = req.params.role;
    const status = await usersDao
        .createUser(newUser);
    res.json(status);
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
    const userId = req.query.uid
    const followingList = await usersDao
        .findUserFollowing(userId);
    res.json(followingList);
}

const findFollowers = async (req, res) => {
    const userId = req.query.uid
    const followerList = await usersDao
        .findUserFollowers(userId);
    res.json(followerList);
}

export default (app) => {
    app.post('/api/user', createUser);
    app.get('/api/user', findUsers);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
}