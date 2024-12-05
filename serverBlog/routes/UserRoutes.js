const route=require('express').Router();
const {register,login,getuser,edituser} = require('../controller/UserController');
const auth=require('../Middlewares/AuthController');
route.post('/register',register);
route.post('/login',login);
route.get('/:id',getuser);
route.patch('/:id',auth,edituser);
console.log('UerRoutes loaded successfully');
module.exports = route;