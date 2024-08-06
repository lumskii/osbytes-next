import React from "react";
import { Title } from "./common/title";
import Link from "next/link";
import { testimonial } from "@/public/assets/data/dummydata";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Title className="text-3xl" title="WHAT CLIENTS SAY ABOUT OUR WORK" />
        </div>
        <Carousel
          className="w-full max-w-base mx-auto"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {testimonial.map((user) => (
              <CarouselItem key={user.id} className="basis-1/2">
                <div className="p-5 bg-background rounded-lg shadow-md">
                  <div className="flex items-center mb-10">
                    <div className="w-24 h-24 mr-6">
                      <Image
                        src={user.cover}
                        alt={`${user.name}'s photo`}
                        className="w-full h-full object-cover rounded-full"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl mb-2">{user.name}</h3>
                      <span className="text-gray-500 uppercase text-sm tracking-widest">
                        {user.post}
                      </span>
                    </div>
                  </div>
                  <p className="mb-4 text-xl leading-relaxed">{user.desc}</p>
                  <Link
                    href="/#"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    VIEW CASE <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-xl text-gray-600 hover:text-gray-800">
            <ChevronLeft />
          </CarouselPrevious>
          <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-xl text-gray-600 hover:text-gray-800">
            <ChevronRight />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
