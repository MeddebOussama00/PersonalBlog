const User = require('../models/userModel');
const {notfound,errorhundler} =require('../Middlewares/error')
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
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

var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

const register = async (req, res,next) => {
    try{
        const {username,email,password,confirmPassword} = req.body;
       if(!username || !email || !password || !confirmPassword){
           return next(Error("Please Enter All Fields",422));
       }
       const ne=email.toLowerCase();
       const mailext= await User.findOne({email:ne});
       if(mailext){
           return next(Error("Email Already Exists",422));
       }

         if(password !== confirmPassword){
          return next(Error("Passwords Do Not Match",422));}
        if(password.length < 6){
            return next(Error("Password Must Be At Least 6 Characters",422));
        }
        const hased=bcrypt.hashSync(password,salt);
        const newUser = await User.create({ username,email:ne,password:hased});
        res.status(201).json(newUser);   
    }catch(err){
        next(Error("User Register Failed",422));
    }

};




const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email ) {
      return res.status(400).json({ message: "Please enter email" });
    }
    if(!password){
      return res.status(400).json({ message: "Please enter password" });
    }
    const ne = email.toLowerCase();
    const user = await User.findOne({ email: ne });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const { _id, username } = user;
    const token = jwt.sign({ id: _id, username }, process.env.SECRET_KEY);
    res.status(200).json({ token, user: { _id, username, email: ne } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error occurred" });
  }
};


const getuser = async (req, res,next) => {
    try{
        const {id}=req.params;
        const user = await User.findById(id).select('-password');
    }catch(err){
        next(errorhundler("User Get Failed",422));
    }
}
const edituser = async (req, res,next) => {
  const {id}=req.params;
    try{
        if(req.user.id !== id){
          return next(Error("You Are Not Authorized To Edit This User"));
        }
        const {username,email,password,confirmedpasswored}=req.body;
        const user = await User.findById(id);
        if(!user){
          return next(Error("User Not Found",404));
        }
        if(!username || !email || !password || !confirmedpasswored){
          return next(Error("Please Enter All Fields",422));
        }
        if(password !== confirmedpasswored){
          return next(Error("Passwords Do Not Match",422));
        }
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(password,salt);
        const upd=await User.findByIdAndUpdate(id,{username,email,password:hashed},{new:true});
        return res.status(200).json(user);
      }catch(err){
            next(Error("User Edit Failed",422));
        }
};
const changeAvatar = async (req, res,next) => {
    try{
        if(req.files.avatar === null){
            return next(errorhundler("No File Uploaded",422));
        }
        const file = req.files.avatar;
        const userId = req.user.id; 
        const filename = `avatar-${userId}-${Date.now()}.png`;
        const filepath = path.join(__dirname, '../public/avatars', filename);
        const user = await User.findByIdAndUpdate(
            userId,
            { avatar: `/avatars/${filename}` },
            { new: true }
          );
          if (!user) {
            return next(errorhundler("User not found", 404));
          }
          if (user.avatar && user.avatar !== '/avatars/${filename}') {
            const oldAvatarPath = path.join(__dirname, '../public', user.avatar);
            await fs.unlink(oldAvatarPath).catch(err => console.error("Error deleting old avatar:", err));
          }
      
          res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            data: { avatarUrl: user.avatar }
          });
}catch(err){
    next(errorhundler("User Avatar Change Failed",422));
}
};
module.exports = {register,login,getuser,edituser,changeAvatar};
