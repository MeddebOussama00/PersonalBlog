import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, content, category, description, image);
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category"  />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech" onClick={() => setCategory('tech')}>Tech</SelectItem>
              <SelectItem value="lifestyle" onClick={() => setCategory('lifestyle')}>Lifestyle</SelectItem>
              <SelectItem value="travel" onClick={() => setCategory('travel')}>Travel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" value={image}  accept='jpg'  onChange={(e) => setImage(e.target.value)}  />
        </div>
        <div className="mb-4">
          <Label htmlFor="content">Content</Label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;