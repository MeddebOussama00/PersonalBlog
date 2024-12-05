const route=require('express').Router();
const {getAllPosts,getSinglePost,getPostBycat,createPost,updatePost,deletePosts}=require('../controller/PostController');
const auth = require('../Middlewares/AuthController');

route.get('/',  getAllPosts);
route.get('/:id', getSinglePost);
route.post('/create',auth, createPost);
route.patch('/update/:id',auth, updatePost);
route.get('/category/:id',auth, getPostBycat);
route.delete('/:id',auth, deletePosts);
console.log('PostRoutes loaded successfully');

module.exports = route;