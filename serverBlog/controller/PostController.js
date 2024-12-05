
const {notfound,errorhundler} =require('../Middlewares/error');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const multer = require('multer');
const path = require('path');
const fs=require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } 
});

const createPost = async (req, res, next) => {
  upload.single('image')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return next(new Error('File upload error: ' + err.message));
    } else if (err) {
      return next(new Error('Unknown error during file upload: ' + err.message));
    }
    try {
      const { title, description, categories } = req.body;

      if (!title || !description) {
        return next(new Error('Title and Description are required'));
      }

      if (!req.file) {
        return next(new Error('Image is required'));
      }

      if (categories && !['All', 'React js', 'Java', 'Php'].includes(categories)) {
        return next(new Error('Invalid category provided'));
      }

      if (!req.user || !req.user.id) {
        return next(new Error('User not authenticated'));
      }

      const fileName = req.file.filename;

      const newPost = new Post({
        title,
        description,
        photo: '/uploads/' + fileName,
        categories: categories || 'All',
        creator: req.user.id, 
      });

      await newPost.save();
      const user = await User.findById(req.user.id);
      if (user) {
        user.posts += 1;
        await user.save();
      }

      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        data: newPost,
      });
    } catch (err) {
      return next(new Error('Error in creating post: ' + err.message));
    }
  });
};



const updatePost = async (req, res, next) => {
  const id = req.params.id;
  console.log("Received req.body:", req.body);
  if (!id) {
    return next(new Error('ID not found', 404));
  }

  try {
    const { title, description, categories } = req.body;
    
    if (!title ) {

      return next(new Error('Fill  title all the fields id'+id, 422));
    }
    console.log("Received req.body:", req.body);
    return res.status(200).json({ title, description, categories });
    if (categories && !['All', 'React js', 'Java', 'Php'].includes(categories)) {
      return next(new Error('Invalid category provided'));
    }

    if (!req.file) {
      await Post.findByIdAndUpdate(id, { title, description, categories }, { new: true }); // new:true returns the updated data
    } else {
      const fileName = req.file.filename;
      const post = await Post.findById(id);

      // Remove the old photo
      if (post && post.photo) {
        fs.unlinkSync(path.join(__dirname, '..', post.photo));
      }

      // Handle file upload
      upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return next(new Error('File upload error: ' + err.message));
        } else if (err) {
          return next(new Error('Unknown error during file upload: ' + err.message));
        }

        await Post.findByIdAndUpdate(id, { title, description, categories, photo: '/uploads/' + fileName }, { new: true });
      });
    }

    // Fetch and return the updated post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not Found' });
    }

    post.title = title;
    post.description = description;
    post.categories = categories;
    await post.save();

    return res.status(200).json(post);
  } catch (err) {
    return next(new Error(err.message));
  }
};



const deletePosts = async (req, res, next) => {
  const id = req.params.id;
  try {
        if (!id) {
          const err = new Error('ID not found');
          err.status = 404;
          return next(err);
        }

       const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ message: 'Post not Found' });
        }
        const image = post.photo;
        if (image) {
          const filePath = path.resolve(__dirname, 'uploads', image); 

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }else{
            console.error("Error deleting file:", unlinkErr.message);
          }

        }
          const user = await User.findById(post.creator);
          if (user) {
            user.posts -= 1;  
            await user.save();
          }
          await post.remove();
          return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error("Error in deletePost:", err.message);
    return next(err);
  }
};



const getAllPosts = async (req, res) => {
  try{
      const post = await Post.find().sort({updatedAt: -1});
      const posts=[];
      for (let i = 0; i < post.length; i++) {
        const user = await User.findById(post[i].creator);
        if (user) {
          res.push({post, avatar: user.avatar });
        }else{
          posts.push({post});
        }
      }
      return res.status(200).json(posts);
  }catch(err){
      return next(new Error(err));
  }
};
 getPostbyAuthor = async (req, res) => {
  const author = req.params.id;
  try{
      const posts = await Post.find({author: author}).sort({updatedAt: -1});
      if(!posts){
          return res.status(404).json({message: 'Post not Found'});
      }
      const user=await User.findById(req.user.id);
      return res.status(200).json({posts, avatar: user.avatar });
  }catch(err){
      return next(new Error(err));
  }
};
const getPostBycat= async (req, res) => { 
  const cat = req.params.id;
  try{
      const post = await Post.find({categories: cat}).sort({updatedAt: -1});
      if(!post){
          return res.status(404).json({message: 'Post not Found'});
      }
      const posts=[];
      for (let i = 0; i < post.length; i++) {
        const user = await User.findById(post[i].creator);
        if (user) {
          posts.push({post, avatar: user.avatar });
        }else{
          posts.push({post});
        }
      }
      return res.status(200).json(posts);
      
  }catch(err){
      return next(new Error(err));
  }
};

const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try{
      const post = await Post.findById(id);
      if(!post){
          return res.status(404).json({message: 'Post not Found'});
      }
      return res.status(200).json(post);
    }catch(err){
      return next(new Error (err))};    
};
module.exports = {getAllPosts,getSinglePost,getPostBycat,createPost,updatePost,deletePosts};