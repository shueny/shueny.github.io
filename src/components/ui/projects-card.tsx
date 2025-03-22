// use card component to show project details
// grid layout: 1 columns for mobile, 2 columns for desktop
// grid-template-columns: 1fr 3fr
// one row is one project
// each project has two cards: one for image and one for details
// the image card should be 1 of block and the details card should be 2 of block
// the image card has a hover effect and fixed height: 400px
// the details card should have the title, description, technologies, and a button to view the project
// the image card should have a hover effect
// the details card should have a transition effect
// the card should have a shadow effect
// the card should be responsive and adaptive to different screen sizes

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Projects, Project } from '@/lib/types/portfolio';
import { Button } from '@/components/ui/button';

export default function ProjectsCard({ data }: { data: Projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.list.map((project, index) => (
        <Dialog key={`${index}-${project.title}`}>
          <DialogTrigger asChild>
            <Card className="relative group col-span-1 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg cursor-pointer">
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="relative w-full h-[200px] object-cover rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-auto h-full rounded-lg"
                  />
                </div>
                <CardTitle className="font-light text-lg pt-2">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {project.technologies.join(', ')}
                </CardDescription>
              </CardContent>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <span className="text-white font-medium text-sm">
                  Read the details
                </span>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>
                {project.description.map((desc, i) => (
                  <div key={i} className="mt-2 flex items-start gap-2">
                    <span>{i + 1}.</span>
                    <span className="font-light">{desc}</span>
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.url && (
              <DialogFooter>
                <Button variant={'ghost'} className="text-gray-500">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 underline"
                  >
                    View Project
                  </a>
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
