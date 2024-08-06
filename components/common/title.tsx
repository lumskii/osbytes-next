import React from "react";

type TitleLogoProps = {
  title: string;
  caption: string;
  className?: string;
};

type TitleSmProps = {
  title: string;
  className?: string;
};

type TitleProps = {
  title: string;
  className?: string;
};

export const TitleLogo: React.FC<TitleLogoProps> = ({
  title,
  caption,
  className,
}) => {
  return (
    <h2 className={`${className} text-5xl font-bold leading-tight`}>
      <span>{caption}</span>
      {title}
    </h2>
  );
};

export const TitleSm: React.FC<TitleSmProps> = ({ title }) => {
  return <h3 className="text-2xl font-medium tracking-wide transition duration-500 hover:text-green-500">{title}</h3>;
};

export const Title: React.FC<TitleProps> = ({ title, className }) => {
  return <h2 className={`${className} text-4xl font-semilight`}>{title}</h2>;
};
