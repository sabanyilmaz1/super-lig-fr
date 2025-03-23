"use client";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const navbarItems = [
  {
    id: 1,
    name: "BLOG",
    link: "/blog",
    active: false,
  },
  {
    id: 2,
    name: "CALENDRIER",
    link: "/fixture",
    active: true,
  },
  {
    id: 3,
    name: "CLASSEMENT",
    link: "/standing",
    active: true,
  },
  {
    id: 4,
    name: "RÉSULTATS",
    link: "/results",
    active: true,
  },
  {
    id: 5,
    name: "STATISTIQUES",
    link: "/statistiques",
    active: false,
  },
  {
    id: 6,
    name: "FAIS TON ONZE",
    link: "/fais-ton-onze",
    active: false,
  },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full text-white border-b bg-redsuperlig">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-0">
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Superlig"
            className="w-16 md:w-20 md:h-20"
            width={80}
            height={80}
          />
        </Link>
        <nav className="items-center hidden gap-10 text-sm font-medium md:flex">
          {navbarItems.map((item) => (
            <Link
              className="relative text-xl font-bold group"
              key={item.id}
              href={item.link}
            >
              {item.name}
              <span className="absolute left-0 w-full h-1 transition-transform duration-300 ease-out origin-left scale-x-0 bg-white -bottom-2 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild></DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4"></DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="font-bold text-white md:hidden bg-redsuperlig"
            >
              <div className="grid gap-4 p-4">
                {navbarItems.map((item) => (
                  <Link
                    onClick={() => setOpen(false)}
                    key={item.id}
                    href={item.link}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-lg font-bold">
              {user?.username}
            </p>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "!w-10 !h-10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
