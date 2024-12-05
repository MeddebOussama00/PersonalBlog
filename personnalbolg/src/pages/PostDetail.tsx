'use client'

import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface Blog {
  id: number
  image: string
  title: string
  description: string
  category: string
  author: string
  authorImage: string
}

export default function PostDetail() {
  const [blog, setBlog] = useState<Blog>({
    id: 1,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    description: 'As we step into 2024, the landscape of web development continues to evolve at a rapid pace. From cutting-edge technologies to innovative design paradigms, developers are constantly adapting to meet the demands of an increasingly digital world. In this blog post transforming the way we build and interact with websites and web applications.',
    category: 'Web Development',
    author: 'Jane Smith',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  })



  return (
    <div className="container mx-auto p-4 pt-6 mt-10 max-w-4xl">
      <Card className="overflow-hidden mb-8">
        <div className="relative h-[400px]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground">
              {blog.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <div className="flex items-center space-x-4">
              <Avatar className="border-2 border-white">
                <AvatarImage src={blog.authorImage} alt={blog.author} />
                <AvatarFallback>{blog.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        <p className="text-gray-700 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
          {blog.description}
        </p>

        <Card className="bg-primary/5">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">About the Author</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={blog.authorImage} alt={blog.author} />
                <AvatarFallback>{blog.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-lg text-primary">{blog.author}</p>
                <p className="text-gray-600">Jane is a seasoned web developer with over a decade of experience in creating innovative digital solutions. She's passionate about staying on top of the latest trends and sharing her knowledge with the community.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Profile</Button>
          </CardFooter>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="outline" className="flex items-center space-x-2">
            <FaChevronLeft className="h-4 w-4" />
            <span>Previous Post</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <span>Next Post</span>
            <FaChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}