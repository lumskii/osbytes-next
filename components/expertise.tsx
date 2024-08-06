import React from "react";
import { Title } from "./common/title";
import { expertise } from "@/public/assets/data/dummydata";
import { Card } from "./common/card";

const Expertise: React.FC = () => {
  return (
    <section className="flex justify-center flex-col gap-4 md:!mt-40 mt-10">
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
    </section>
  );
};

export default Expertise;
