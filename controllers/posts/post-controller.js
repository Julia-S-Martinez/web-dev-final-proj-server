import posts from "./posts.js";
let postList = posts;

const createPost = (req, res) => {
    const newPost = req.body;
    newPost._id = (new Date()).getTime()+'';
    newPost.comments = {};
    newPost.trackId = "";
    newPost.userId = "";
    postList.push(newPost);
    res.json(newPost);
}

const findPost = (req, res) =>
    res.json(postList);
const updatePost = (req, res) => {
    const postIdToUpdate = req.params.tid;
    const updates = req.body;
    const postIndex = postList.findIndex(
        (t) => t._id === postIdToUpdate)
    postList[postIndex] =
        {...postList[postIndex], ...updates};
    res.sendStatus(200);
}

const deletePost = (req, res) => {
    const postIdToDelete = req.params.tid;
    postList = postList.filter((t) =>
        t._id !== postIdToDelete);
    res.sendStatus(200);
}



export default (app) => {
    app.post('/api/post', createPost);
    app.get('/api/post', findPost);
    app.put('/api/post/:tid', updatePost);
    app.delete('/api/post/:tid', deletePost);
}
