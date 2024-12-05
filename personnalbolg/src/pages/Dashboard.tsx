'use client'

import { useState } from 'react'

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Eye, Pencil, Trash2, Plus, Search, FileText } from 'lucide-react'
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { ScrollArea } from "../components/ui/scroll-area"

const initialPosts = [
  { id: 1, title: "Getting Started with React", date: "2023-05-15", category: "React" },
  { id: 2, title: "Advanced TypeScript Techniques", date: "2023-06-01", category: "TypeScript" },
  { id: 3, title: "The Future of Web Development", date: "2023-06-10", category: "Web" },
  { id: 4, title: "Mastering CSS Grid", date: "2023-06-20", category: "CSS" },
  { id: 5, title: "Introduction to Next.js", date: "2023-07-01", category: "Next.js" },
]

export default function Dashboard() {
  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState('')
  /*const router = useRouter()

  const handleView = (id: number) => {
    router.push(`/posts/${id}`)
  }

  const handleEdit = (id: number) => {
    router.push(`/posts/${id}/edit`)
  }

  const handleDelete = (id: number) => {
    router.push(`/posts/${id}/delete`)
  }

  const handleCreateNew = () => {
    router.push('/posts/new')
  }*/

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='container'>
        <div className="container mx-auto py-10">
        <Card className="w-full">
            <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                <CardTitle className="text-3xl font-bold">My Blog Posts</CardTitle>
                <CardDescription className="mt-2">Manage and monitor your blog content</CardDescription>
                </div>
                <Button  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" /> Create New Post
                </Button>
            </div>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-[300px]"
                />
                </div>
                <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Total Posts: {posts.length}</span>
                </div>
            </div>
            <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[400px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                        <Badge variant="secondary" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                            {post.category}
                        </Badge>
                        </TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:text-blue-500">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon"  className="hover:text-green-500">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon"  className="hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </ScrollArea>
            </CardContent>
        </Card>
        </div>
    </div>
  )
}