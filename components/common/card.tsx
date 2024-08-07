import React from "react";
import Link from "next/link";
import { TitleSm } from "./title";
import Image from "next/image";
import { MoveRight } from "lucide-react";

interface CardProps {
  width?: number;
  height?: number;
  className?: string;
  data: {
    id: number;
    title: string;
    cover: string;
    category?: string;
    date?: string;
    desc?: { text: string }[];
  };
  caption?: string;
  show?: boolean;
  path?: string;
}

export const Card: React.FC<CardProps> = ({
  data,
  caption,
  show,
  path,
  width,
  height,
  className,
}) => {
  return (
    <div className={caption ? "grid" : "flex flex-wrap items-start space-x-6"}>
      <div
        className={
          caption
            ? "relative overflow-hidden mb-8 h-[300px]"
            : "relative overflow-hidden mb-8"
        }
        style={{ width:`${width}px`, height: `${height}px`}}
      >
        <Image
          src={data.cover}
          alt={data.title}
          className="w-full h-full object-cover rounded-[50px_0_50px_0]"
          width={width}
          height={height}
        />
      </div>
      <div className={className}>
        <Link
          href={`${path}/${data.id}`}
          className="capitalize"
        >
          <TitleSm
            title={data.title}
          />
        </Link>
        {caption && (
          <Link
            href={`${path}/${data.id}`}
            className="flex items-center text-[color:var(--primary)] uppercase tracking-normal mt-2"
          >
            {caption} <MoveRight className="ml-2" />
          </Link>
        )}
        <div className="flex items-center text-sm text-[--muted-foreground] opacity-50 mt-4">
          <span> {data.category} </span>
          {data.date && <span><span className="ml-1 mr-1">/</span>  {data.date}</span>}
        </div>
        {show && data.desc && (
          <ul className="mt-6 text-sm opacity-50">
            {data.desc.map((item, i) => (
              <li key={i}>- {item.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
