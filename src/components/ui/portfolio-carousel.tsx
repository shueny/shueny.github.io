import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { Projects, SpecialExperiences } from '@/lib/types/portfolio';

export default function PortfolioCarousel({
  data,
}: {
  data: Projects | SpecialExperiences | undefined;
}) {
  if (!data?.list?.length) return null;

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {data.list.map((project: any, index: number) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardHeader className="p-4 pt-6">
                  <CardTitle className="text-md md:text-xl font-normal text-center">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {project.technologies && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-500 font-light">
                        {project.technologies.join(', ')}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
