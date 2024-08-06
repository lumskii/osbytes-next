import React from "react";
import { Title } from "./common/title";
import { brand } from "@/public/assets/data/dummydata";
import Image from "next/image";

const Brand: React.FC = () => {
  return (
    <section className="flex justify-center flex-col gap-4 md:!mt-40 mt-10">
      <div className="container">
        <div className="text-4xl text-center">
          <Title
            className="uppercase"
            title="We are proud to have worked with"
          />
        </div>
        <div className="container flex justify-center gap-12 py-12">
          {brand.map((item) => (
            <div className="w-full h-full opacity-50 transition duration-500 ease-in-out hover:opacity-100" key={item.id}>
              <Image
                src={item.cover}
                alt={item.title}
                width={150}
                height={125}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brand;
