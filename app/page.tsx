"use client";

import Image from "next/image";
import { SubTitle, Title } from "@/components/common/title";
import { home, steps } from "@/public/assets/data/dummydata";
import Expertise from "@/components/expertise";
import BlogCard from "@/components/blogCard";
import Banner from "@/components/banner";
import Testimonial from "@/components/testimonial";
import ShowCase from "@/components/showcase";
import Brand from "@/components/brand";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import schedule from "@/public/images/schedule2.png";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleStartProject = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      router.push("/new-project");
    }
  };

  const handleLearnMore = () => {
    router.push("/about");
  };

  const login = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      router.push("/new-project");
    }
  };

  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col mb-10">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#9CA3AF_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-[15vw] font-bold text-center leading-tight">
            OSbytes
          </h1>
        </div>
        <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-4xl font-bold text-center mt-4">
          Elevate Your Online Presence with Expert Solutions
        </h2>
        <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
          At our agency, we specialize in transforming your web vision into
          reality. From design to development, we ensure your website stands out
          and performs at its best.
        </p>
        <div className="flex gap-4 mt-5 z-50">
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleStartProject}
          >
            Get Started
          </Button>
          <Button variant="outline" onClick={handleLearnMore}>
            Learn More
          </Button>
        </div>
        {/* Add video promo here later... */}
        <div className="flex justify-center items-center relative md:mt-[-10px]">
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>

      {/* Hero Secondary Section */}
      <section className="flex flex-col md:flex-row justify-between items-center md:!mt-40 mt-10 mx-10 gap-10 min-h-[600px]">
        <div className="text-left max-w-xl flex-1">
          <p className="text-muted-foreground mb-5">Schedule</p>
          <div className="max-w-[350px]">
            <Title title="Effortless Meeting Scheduling for Your Convenience" />
          </div>
          <p className="text-muted-foreground mt-4">
            Our intuitive scheduling system makes booking a meeting with our web
            development team a breeze. Enjoy seamless coordination without
            worrying about time zone differences.
          </p>
          <div className="mt-6 flex gap-6 md:flex-row flex-col max-w-lg">
            <SubTitle
              title="Easy Booking"
              caption="Choose your preferred date and time effortlessly."
            />
            <SubTitle
              title="Tailored Services"
              caption="Select from a variety of web development services to meet your needs."
            />
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={handleLearnMore}>
              Learn More
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={login}>
              Sign Up
            </Button>
          </div>
        </div>
        <div className="w-full h-full flex-1 relative aspect-square max-w-[500px] group">
          <div className="absolute inset-0 bg-gray-500 opacity-50 transition-opacity duration-300 group-hover:opacity-0 z-10 rounded-lg"></div>
          <Image
            src={schedule}
            alt="schedule a meeting"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="mx-10 md:!mt-40 mt-10">
        <div className="text-left">
          <p className="text-muted-foreground mb-5">Simple</p>
          <div className="max-w-[550px]">
            <Title title="Easily Schedule Your Development Meeting Today" />
          </div>
          <p className="text-muted-foreground mt-4 max-w-3xl">
            Scheduling a meeting with our web development team is
            straightforward and convenient. Follow our simple steps to connect
            with us at your preferred time.
          </p>
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((item, i) => (
                <div
                  className="p-6 rounded-md text-left bg-secondary/10"
                  key={i}
                >
                  <span className="green text-green-500 text-4xl">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-bold mt-4 capitalize max-w-[250px]">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Button className="bg-primary hover:bg-primary/90" onClick={login}>Schedule</Button>
            <Button variant="outline" onClick={handleLearnMore}>Learn More</Button>
          </div>
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

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => router.push("/new-project")}
      />
    </>
  );
}
