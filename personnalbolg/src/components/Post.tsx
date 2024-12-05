import React from 'react';
import { Blog } from '../interfaces/Blog';
import { Link } from 'react-router-dom';
interface PostProps {
  blog: Blog;
}

const Post = ({ blog }: PostProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
    >

      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">{blog.category}</span>
       
      </div>
      <Link to={`/post/${blog.id}`}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Read More
        </button>
      </Link>
    </div>
  );
};

export default Post;