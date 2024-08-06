import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleArrowOutUpRight } from "lucide-react";
import { Title } from "@/components/common/title";
import { home } from "@/public/assets/data/dummydata";
import Expertise from "@/components/expertise";
import BlogCard from "@/components/blogCard";
import Banner from "@/components/banner";
import Testimonial from "@/components/testimonial";
import ShowCase from "@/components/showcase";
import Brand from "@/components/brand";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col mb-10">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#9CA3AF_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-10xl font-bold text-center md:text-[150px] ">
            OSbytes
          </h1>
        </div>
        <p className="text-center relative top-3">
          We build digital solutions that help businesses grow
        </p>
        <div className="flex justify-center items-center relative md:mt-[-10px]">
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>

      {/* Hero Secondary Section */}
      <section className="flex justify-center flex-col gap-4 md:!mt-40 mt-10">
        <div className="text-4xl text-center">
          <Title title="The last digital agency you'll ever need" />
        </div>
        <p className="text-muted-foreground text-center">
          Our straight forward pricing plans are tailored to meet your needs. If
          {" you're"} not <br /> sure, you can always start with our free plan
          and upgrade later.
        </p>
        <div className="container grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
          {home.map((item, i) => (
            <div className="p-6 rounded-md text-left" key={i}>
              <span className="green text-green-500 text-4xl">{item.icon}</span>
              <h3 className="text-xl font-bold mt-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Other Sections */}
      <Expertise />
      <Banner />
      <Testimonial />
      <ShowCase />
      <Brand /> 

      <div className="text-center py-16">
        <Title title="Latest news & articles" />
        <BlogCard />
      </div>
    </>
  );
}
