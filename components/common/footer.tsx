import { FOOTER_LINKS, SOCIALS } from "@/constants";
import { CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-accent-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 group cursor-pointer mb-4">
              <span className="text-2xl font-extrabold tracking-wide">OSbytes</span>
              <CircleArrowOutUpRight className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <p className="mb-4">
              Questions? Reach us <br /> Monday – Friday from 9 am to 6 pm
            </p>
            <h3 className="text-lg font-semibold">+1 602 492 1281</h3>
            <Link href="/contact">
              <button className="mt-4 py-2 px-4 bg-primary text-muted rounded-md hover:bg-muted-foreground hover:text-accent-foreground transition duration-300">
                Request for quote
              </button>
            </Link>
          </div>

          {FOOTER_LINKS.map((column) => (
            <ul key={column.title} className="space-y-2">
              <h3 className="text-lg font-bold mb-4">{column.title}</h3>
              {column.links.map((link) => (
                <li key={link}>
                  <Link href="/">{link}</Link>
                </li>
              ))}
            </ul>
          ))}

          <div className="space-y-2">
            <h3 className="text-lg font-bold mb-4">{SOCIALS.title}</h3>
            <div className="flex gap-4">
              {SOCIALS.links.map((social) => (
                <Link href="/" key={social.name}>
                  <social.icon
                    size={25}
                    className="text-white hover:text-muted-foreground transition duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-background pt-4">
          <span>© {currentYear} OSbytes. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>GORKCODER COMPANY</span>
            <span>&nbsp; | &nbsp;</span>
            <span>TERMS & CONDITIONS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
