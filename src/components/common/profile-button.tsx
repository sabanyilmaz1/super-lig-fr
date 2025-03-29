"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "../../../prisma/generated/client";
import { teams } from "@/lib/football-api/teams";

export const ProfileButton = ({ user }: { user: User }) => {
  const { user: userClerk } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();
  if (!userClerk?.id) return null;

  return (
    <div className="flex items-center md:ml-12">
      <p className="hidden md:block text-lg font-bold">{userClerk?.username}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="!p-0 !px-0" variant="transparent">
            {user ? (
              <Image
                alt="User avatar"
                src={
                  teams.find((t) => t.id === user.favoriteTeamId)?.image_path ??
                  "/logo.png"
                }
                width={50}
                height={50}
                className="rounded-full ml-4 w-7 h-7 md:w-14 md:h-14"
              />
            ) : (
              <Image
                alt="User avatar"
                src="/logo.png"
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 mt-4 border-redsuperlig bg-red-200">
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openUserProfile()}>
            Profil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut(() => router.push("/"))}>
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
