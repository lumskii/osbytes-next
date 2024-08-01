"use client"

import React, { useState } from "react";
import { CircleArrowOutUpRight, GalleryHorizontalEnd, Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./global/mode-toggle";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2 group cursor-pointer">
        <span className="text-xl font-bold">OSbytes</span>
        <CircleArrowOutUpRight className="group-hover:rotate-45 transition-transform duration-300" />
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[15%] transform translate-x-[-50%] -translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href="#">Build</Link>
          <Link href="#">Support</Link>
          <Link href="#">Grow</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href="/"
          className="bg-primary text-black p-2 px-4 rounded-md hover:bg-foreground/50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Book A Consultation
        </Link>
        <ModeToggle />
        <Button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </aside>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center md:block">
          <ul className="flex flex-col items-center gap-8 text-2xl">
            <li>
              <Link href="#" onClick={toggleMenu}>
                Build
              </Link>
            </li>
            <li>
              <Link href="#" onClick={toggleMenu}>
                Support
              </Link>
            </li>
            <li>
              <Link href="#" onClick={toggleMenu}>
                Grow
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
