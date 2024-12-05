

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { User, Mail, Hash, FileText, Lock } from 'lucide-react'
import { useToast } from "../hooks/use-toast"

import { RootState } from '../Store'
import { useDispatch, useSelector } from "react-redux"
import { editProfile} from '../UserSlice'
import { AppDispatch } from '../Store'

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.user)

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    password: '',
    confirmedPassword: ''
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editedUser.password !== editedUser.confirmedPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }
    try {
      await dispatch(editProfile({ ...editedUser, id: user.id })).unwrap()
      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
          <CardDescription>View and edit your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={editedUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmedPassword">Confirm New Password</Label>
                <Input
                  id="confirmedPassword"
                  name="confirmedPassword"
                  type="password"
                  value={editedUser.confirmedPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-muted-foreground" />
                <span>Username: {user.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-muted-foreground" />
                <span>Email: {user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Hash className="text-muted-foreground" />
                <span>User ID: {user.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="text-muted-foreground" />
                <span>Posts Created: {user.postsCount}</span>
              </div>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

