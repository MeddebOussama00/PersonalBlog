import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '../components/ui/card'
import {Button} from '../components/ui/button'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Error 404</CardTitle>
          <CardDescription>Page not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-600">
            Sorry, the page you are looking for does not exist. You can try searching for it or go back to the homepage.
          </p>
        </CardContent>
        <div className="p-4">
            <Link to="/home">
          <Button variant="secondary" className="w-full">
            Go back to homepage
          </Button></Link>
        </div>
      </Card>
    </div>
  )
}

export default Error
