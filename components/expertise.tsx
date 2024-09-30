import React from "react";
import { Title, TitleSm } from "./common/title";
import { expertise, newExpertise } from "@/public/assets/data/dummydata";
import { Card } from "./common/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Expertise: React.FC = () => {
  return (
    <>
      {/* <section className="flex justify-center flex-col gap-4 md:!mt-40 mt-10">
      <div className="text-4xl text-center">
        <Title title="Our expertise" />
      </div>
      <p className="text-muted-foreground text-center">
        Our straight forward pricing plans are tailored to meet your needs. If
        {" you're"} not <br /> sure, you can always start with our free plan and
        upgrade later.
      </p>
      <div className="container grid grid-cols-2 gap-12 mt-6 md:grid-cols-4">
        {expertise.map((item) => (
          <Card data={item} key={item.id} caption="learn more" width={250} height={300} />
        ))}
      </div>
    </section> */}

      <section className="mx-10 md:!mt-40 mt-10">
        <div className="text-center max-w-[700px] mx-auto">
          <Title title="Explore Our Comprehensive Web Development Services Tailored for Your Needs" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-12">
          {newExpertise.map((item) => (
            <div key={item.id} className="container">
              <div className="relative aspect-w-16 aspect-h-9 group">
                <div className="absolute inset-0 bg-gray-500 opacity-50 transition-opacity duration-300 group-hover:opacity-0 z-10 rounded-lg"></div>
                <Image
                  src={item.cover}
                  width={500}
                  height={300}
                  alt={item.title}
                  priority
                  className="rounded-lg"
                />
              </div>
              <TitleSm title={item.title} />
              <p className="text-muted-foreground mt-4 text-sm text-center">
                {item.desc}
              </p>
              <Link
                href={`/expertise/${item.id}`}
                className="flex items-center justify-center text-[color:var(--primary)] capitalize tracking-normal mt-6"
              >
                Learn More <ChevronRight className="ml-2 animate-pulse" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Expertise;
