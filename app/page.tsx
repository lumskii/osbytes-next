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
        We build digital solutions that helps businesses grow
        </p>
        <div className="flex justify-center items-center relative md:mt-[-10px]">
          {/* <Image
            src="/assets/preview.png"
            alt="banner image"
            width={1200}
            height={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          /> */}
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>
      <section className="flex justify-center relative flex-col gap-4 md:!mt-[-40] mt-[-10px]">
        <h2 className="text-4xl text-center">Choose what plan fits you best</h2>
        <p className="text-muted-foreground text-center">
          Our straight forward pricing plans are tailored to meet your needs. If
          {" you're"} not <br /> sure, you can always start with our free plan
          and upgrade later.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          
        </div>
      </section>
    </>
  );
}
