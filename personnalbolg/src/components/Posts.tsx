import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { getPostsByCategory } from '../PostSlice';
import Post from './Post';
import { Blog } from '../interfaces/Blog';

import Spinner from '../../public/Spinner.gif'

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  
  useEffect(() => {
    dispatch(getPostsByCategory());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <img src="/Spinner.gif" alt="loading" width={50} height={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts && posts.map((blog: Blog) => (
          <Post key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

