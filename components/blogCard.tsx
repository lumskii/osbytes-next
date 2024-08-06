import React from "react";
import { Card } from "./common/card";
import { blogdata } from "@/public/assets/data/dummydata";

const BlogCard: React.FC = () => {
  return (
    <div className="container m-auto grid md:grid-cols-2 gap-6 py-20">
      {blogdata.map((item) => (
        <Card data={item} key={item.id} path="blogs" width={200} height={250} />
      ))}
    </div>
  );
};

export default BlogCard;
