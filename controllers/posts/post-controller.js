// import posts from "./posts.js";
import * as postsDao from "./posts-dao.js";
// let postList = posts;

const findPosts = async (req, res) => {
    const posts = await postsDao.findPosts()
    res.json(posts);
}


const createPost = async (req, res) => {
    const newPost = req.body;
    const insertedPost = await postsDao.createPost(newPost);
    res.json(insertedPost)
}

const updatePost = async (req, res) => {
    const postIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await postsDao.updatePost(postIdToUpdate, updates);
    res.json(status)
}

const deletePost = async (req, res) => {
    const postIdToDelete = req.params.pid;
    const status = await postsDao.deletePost(postIdToDelete);
    res.json(status)
}



export default (app) => {
    app.post('/api/post', createPost);
    app.get('/api/post', findPosts);
    app.put('/api/post/:pid', updatePost);
    app.delete('/api/post/:pid', deletePost);
}
