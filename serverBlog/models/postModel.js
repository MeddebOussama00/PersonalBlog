const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  photo: {
    type: String,
    required: false
  },
  categories: {
    type: String,
    required: false,
    enum: {
      values: ['All', 'React js', 'Java', 'Php'],
      message: '{VALUE} is not a valid category'
    },
    default: 'All'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  }
}, { 
  timestamps: true 
});



module.exports = model('Post', postSchema);