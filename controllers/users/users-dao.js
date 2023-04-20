import usersModel from './users-model.js';
export const findUserByCredentials = (username, password) =>
    usersModel.findOne({ username, password });
export const findUser = (uid) => usersModel.findById(uid);

export const findUsers = () => usersModel.find();
export const findUserFollowing = (uid) => usersModel.findById(uid, 'following');
export const findUserFollowers = (uid) => usersModel.findById(uid, 'followers');
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (pid) => usersModel.deleteOne({_id: pid});
export const updateUser = (pid, user) => usersModel.updateOne({_id: pid}, {$set: user})

