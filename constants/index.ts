import { Facebook, Instagram, Icon, Linkedin } from "lucide-react";

export type SocialLink = {
  name: string;
  icon: typeof Icon;
};

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      "About Agency",
      "Our Team",
      "Showcase",
      "Blog",
      "Demo Design System",
      "Contact Us",
    ],
  },
  {
    title: "Services",
    links: [
      "Web Design & Development",
      "Digital Marketing",
      "E-Commerce",
      "Native App Development",
    ],
  },
];

export const SOCIALS = {
  title: "Connect",
  links: [
    { name: "facebook", icon: Facebook },
    { name: "instagram", icon: Instagram },
    { name: "linkedIn", icon: Linkedin },
  ],
};
