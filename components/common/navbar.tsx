"use client";

import React, { useState } from "react";
import { CircleArrowOutUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../global/mode-toggle";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from '@/lib/AuthContext';
import LoginModal from '../LoginModal';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleStartProject = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      router.push('/new-project');
    }
  };

  return (
    <header className="w-full border-b">
      <div className="p-4 flex items-center justify-between relative">
        <aside className="group cursor-pointer">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">OSbytes</span>
            <CircleArrowOutUpRight className="group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </aside>
        <nav className={`${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row items-center gap-4">
            <li>
              <Link href="/work" className={active === "/work" ? "text-primary" : ""}>
                Work
              </Link>
            </li>
            <li>
              <Link href="/services" className={active === "/services" ? "text-primary" : ""}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/resources" className={active === "/resources" ? "text-primary" : ""}>
                Resources
              </Link>
            </li>
            <li>
              <Link href="/about" className={active === "/about" ? "text-primary" : ""}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <aside className="flex gap-2 items-center">
          <Button onClick={handleStartProject}>Start A Project</Button>
          <ModeToggle />
          <Button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </aside>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;