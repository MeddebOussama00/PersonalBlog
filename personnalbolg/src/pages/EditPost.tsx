import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const post = {
      title: 'Example Post',
      content: 'This is an example post',
      category: 'tech',
      description: 'This is a description of the post',
      image: 'https://example.com/image.jpg',
      postId: '12345'
    };

    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setDescription(post.description);
    setImage(post.image);
    setPostId(post.postId);
  }, []);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, content, category, description, image, postId);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</Label>
          <Select className="block w-full p-2 border border-gray-300 rounded-md">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech" onClick={() => setCategory('tech')}>Tech</SelectItem>
              <SelectItem value="lifestyle" onClick={() => setCategory('lifestyle')}>Lifestyle</SelectItem>
              <SelectItem value="travel" onClick={() => setCategory('travel')}>Travel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</Label>
          <ReactQuill theme="snow" value={content} onChange={setContent} className="block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</Label>
          <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Post</Button>
      </form>
    </div>
  );
};

export default EditPost;