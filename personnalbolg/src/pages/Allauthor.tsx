import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const authors = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://github.com/nutlope.png',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
  },
  {
    id: 2,
    name: 'Jane Doe',
    image: 'https://github.com/nutlope.png',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
  },
  {
    id: 3,
    name: 'Bob Smith',
    image: 'https://github.com/nutlope.png',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
  },
];

export default function AllAuthors() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Our Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <Card key={author.id} className="bg-white rounded-lg shadow-md">
            <CardHeader className="flex items-center justify-center">
              <Avatar>
                <AvatarImage src={author.image} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold mb-2">{author.name}</CardTitle>
              <CardDescription className="text-gray-600">
                {showMore ? author.bio : author.bio.substring(0, 100) + '...'}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-center p-4">
              <Button variant="link" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}