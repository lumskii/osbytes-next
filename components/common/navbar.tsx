"use client";

import React, { useState } from "react";
import { CircleArrowOutUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../global/mode-toggle";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import LoginModal from "../LoginModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStartingProject, setIsStartingProject] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleStartProject = () => {
    if (!user) {
      setIsStartingProject(true);
      setIsLoginModalOpen(true);
    } else {
      router.push("/new-project");
    }
  };

  const isNewProjectPage = pathname === "/new-project";

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      setIsStartingProject(false);
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    if (isStartingProject) {
      router.push("/new-project");
    }
    setIsStartingProject(false);
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
        <nav className={`${isOpen ? "flex flex-col" : "hidden"} md:flex absolute md:relative top-full left-0 right-0 bg-background md:bg-transparent z-50 md:z-auto`}>
          <ul className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto p-4 md:p-0">
            <li>
              <Link
                href="/services"
                className={active === "/services" ? "text-primary" : ""}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={active === "/about" ? "text-primary" : ""}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className={active === "/resources" ? "text-primary" : ""}
              >
                Resources
              </Link>
            </li>
          </ul>
          <div className="flex flex-col md:hidden gap-2 items-center mt-4 w-full p-4">
            <Button
              onClick={handleStartProject}
              disabled={isNewProjectPage}
              className="w-full"
            >
              Start A Project
            </Button>
            <Button onClick={handleAuthAction} variant="outline" className="w-full">
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </nav>
        <aside className="flex gap-2 items-center">
          <div className="hidden md:flex gap-2 items-center">
            <Button
              onClick={handleStartProject}
              disabled={isNewProjectPage}
            >
              Start A Project
            </Button>
            <Button onClick={handleAuthAction} variant="outline">
              {user ? "Logout" : "Login"}
            </Button>
          </div>
          <ModeToggle />
          <Button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </aside>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default Navbar;
