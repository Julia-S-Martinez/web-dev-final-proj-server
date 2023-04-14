import * as followsDao from "./follows-dao.js";

function FollowsController(app) {
    const createFollow = async (req, res) => {
        const follow = req.body;
        const newFollow = await followsDao.createFollow(follow);
        res.json(newFollow);
    };
    const findFollowersByFollowed = async (req, res) => {
        const userId = req.params.userId;
        const followers = await followsDao.findFollowersByFollowed(userId);
        res.json(followers);
    };
    const findFollowedByFollowing = async (req, res) => {
        const userId = req.params.userId;
        const followed = await followsDao.findFollowedByFollowing(userId);
        res.json(followed);
    };
    const unfollow = async (req, res) => {
        const follow = req.body;
        const status = await followsDao.unfollow(follow);
        res.json(status);
    };

    app.post("/api/follows", createFollow);
    app.get("/api/follows/followers/:userId", findFollowersByFollowed);
    app.get("/api/follows/followed/:userId", findFollowedByFollowing);
    app.delete("/api/follows", unfollow);
}

export default FollowsController;