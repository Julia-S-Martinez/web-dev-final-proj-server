import usersModel from './users-model.js';
export const findUserByCredentials = (username, password) =>
    usersModel.findOne({ username, password });
export const findUser = (pid) => usersModel.find({_id: pid});
export const findUserFollowing = (pid) => usersModel.find({_id: pid}, 'following');
export const findUserFollowers = (pid) => usersModel.find({_id: pid}, 'followers');
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (pid) => usersModel.deleteOne({_id: pid});
export const updateUser = (pid, user) => usersModel.updateOne({_id: pid}, {$set: user})