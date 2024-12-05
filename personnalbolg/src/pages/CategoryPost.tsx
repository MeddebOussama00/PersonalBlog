import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store';
import { getPosts } from '../PostSlice';
import { useLocation } from 'react-router-dom';
import { Blog } from '../interfaces/Blog';

const CategoryPost: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (category) {
      dispatch(getPosts({ category }));
    }
  }, [dispatch, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Posts in {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: Blog) => (
          <div key={post.id} className="bg-white rounded shadow-md p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <p className="text-gray-600">Category: {post.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPost

