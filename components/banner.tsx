import React from "react";
import { Title, TitleLogo } from "./common/title";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <section className="mt-9 container">
      <div className="container flex justify-between items-center bg-custom-gradient py-20 px-10 rounded-[50px_0_50px_0]">
        <div>
          <Title
            className="text-4xl font-normal"
            title="We are looking forward to start your new project"
          />{" "}
          <br />
          <TitleLogo
          className="text-transparent bg-custom-text-gradient bg-clip-text"
            title="Lets take your business to the next level!"
            caption=""
          />
        </div>
        <div>
          <Link
            href="/"
            className="bg-primary text-black p-2 px-4 rounded-md hover:bg-foreground/50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Start your project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
