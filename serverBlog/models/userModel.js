const {Schema,model} = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
       
    },
    posts: {
        type: Number,
        default:0
    }
}, {timestamps: true});
module.exports = model('user', userSchema);