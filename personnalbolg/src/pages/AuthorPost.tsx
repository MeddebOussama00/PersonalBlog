import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Post {
  id: number;
  title: string;
  date: string;
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
  socialLinks: SocialLink[];
  recentPosts: Post[];
}

const author: Author = {
  name: "Jane Doe",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Jane is a passionate writer and software developer with over 10 years of experience. She loves to share her knowledge through her blog posts and speaking engagements.",
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com/janedoe", icon: <FaTwitter /> },
    { name: "GitHub", url: "https://github.com/janedoe", icon: <FaGithub /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/janedoe", icon: <FaLinkedin /> },
  ],
  recentPosts: [
    { id: 1, title: "10 Tips for Better React Code", date: "2023-05-15" },
    { id: 2, title: "Understanding Async/Await in JavaScript", date: "2023-05-01" },
    { id: 3, title: "Getting Started with Next.js", date: "2023-04-20" },
  ]
};

const AuthorPost = () => {
  return (
    <div className="container mx-auto p-4 pt-8">
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="flex flex-row items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex justify-center items-center">
            <img src={author.avatar} alt={author.name} className="h-20 w-20 rounded-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{author.name}</h2>
            <p className="text-gray-600">Author Profile</p>
          </div>
        </div>
        <p className="text-gray-600 mt-4">{author.bio}</p>
        <div className="flex justify-start gap-2 mt-4">
          {author.socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </button>
            </a>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {author.recentPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-600">{post.date}</p>
            <a href={`/posts/${post.id}`} className="text-gray-600 hover:text-gray-900">
              <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">Read more</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorPost;