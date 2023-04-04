import * as usersDao from "./users-dao.js";

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers()
    res.json(users);
}


const createUser = async (req, res) => {
    const newUser = req.body;
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser)
}

const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.uid;
    const updates = req.body;
    const status = await usersDao.updateUser(userIdToUpdate, updates);
    res.json(status)
}

const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.uid;
    const status = await usersDao.deleteUser(userIdToDelete);
    res.json(status)
}

export default (app) => {
    app.post('/api/user', createUser);
    app.get('/api/user', findUsers);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
}