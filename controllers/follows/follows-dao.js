import followsModel from "./follows-model.js";

export const createFollow = async (follow) => {
    const newFollow = await followsModel.create(follow);
    return newFollow;
};

export const findFollowersByFollowed = async (userId) => {
    const followers = await followsModel.find({ followed: userId });
    return followers;
};

export const findFollowedByFollowing = async (userId) => {
    const followed = await followsModel.find({ following: userId });
    return followed;
};

export const unfollow = async (follow) => {
    const deletedFollow = await followsModel.deleteOne(follow);
    return deletedFollow;
};