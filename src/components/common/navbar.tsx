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
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProfileButton } from "./profile-button";
import { User } from "../../../prisma/generated/client";

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
    active: false,
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
    active: false,
  },
  {
    id: 5,
    name: "STATISTIQUES",
    link: "/statistiques",
    active: false,
  },
  {
    id: 6,
    name: "TON 11",
    link: "/fais-ton-onze",
    active: false,
  },
];

export const Navbar = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full text-white border-b bg-redsuperlig">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-0">
        <Link href="/home" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Superlig" width={80} height={80} />
        </Link>
        <nav className="items-center hidden gap-10 text-sm font-medium md:flex">
          {navbarItems.map((item) => {
            if (!item.active) {
              return (
                <button
                  className={cn(
                    "relative text-xl font-bold group cursor-not-allowed",
                    !item.active && "text-gray-100 opacity-50"
                  )}
                  key={item.id}
                  disabled
                >
                  {item.name}
                  <span className="absolute left-0 w-full h-1 transition-transform duration-300 ease-out origin-left scale-x-0 bg-white -bottom-2 group-hover:scale-x-100"></span>
                </button>
              );
            }

            return (
              <Link
                className={cn(
                  "relative text-xl font-bold group",
                  item.active && "text-white"
                )}
                key={item.id}
                href={item.link}
              >
                {item.name}
                <span className="absolute left-0 w-full h-1 transition-transform duration-300 ease-out origin-left scale-x-0 bg-white -bottom-2 group-hover:scale-x-100"></span>
              </Link>
            );
          })}
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
          <ProfileButton user={user} />
        </div>
      </div>
    </header>
  );
};
