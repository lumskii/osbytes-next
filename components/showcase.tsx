import React from "react";
import { Title } from "./common/title";
import { showcase } from "@/public/assets/data/dummydata";
import { Card } from "./common/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ShowCase: React.FC = () => {
  return (
    <section className="h-full">
      <div className="max-w-[90%] m-auto">
        <div className="text-center max-w-[65%] m-auto py-6">
          <Title title="Selected cases" />
        </div>
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((item) => (
            <Card data={item} key={item.id} width={350} height={400} className="w-full" />
          ))}
        </div>
        <div className="flex justify-end w-full mt-4 text-lg uppercase tracking-wider text-[--text-gradient-start]">
          <Link href="/" className="inline-flex items-center">
            View all cases <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
