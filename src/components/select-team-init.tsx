"use client";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { teams } from "@/lib/football-api/teams";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import { updateUserFavoriteTeamAction } from "@/action";
import { usePathname } from "next/navigation";

export default function SelectTeamInit() {
  const [open, setOpen] = useState(true);
  const [selectedClub, setSelectedClub] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const initialState: { message: string | null; pathname: string } = {
    message: null,
    pathname: pathname,
  };

  const [state, formAction, pending] = useActionState(
    updateUserFavoriteTeamAction,
    initialState
  );

  const ClubGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-2 mt-4 px-4">
      <legend className="sr-only">Sélectionnez votre club favori</legend>
      {teams.map((team) => (
        <div key={team.id} className="relative">
          <input
            required
            type="radio"
            id={`team-${team.id}`}
            name="teamId"
            value={team.id}
            checked={selectedClub === team.id}
            onChange={() => {
              setSelectedClub(team.id);
              const submitButton = document.getElementById("submit-button");
              if (submitButton) {
                submitButton.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="sr-only peer"
            aria-label={`Sélectionner ${team.name}`}
          />
          <label
            htmlFor={`team-${team.id}`}
            className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all w-full
              peer-checked:bg-primary/10 peer-checked:border-2 peer-checked:border-primary
              bg-card hover:bg-accent
              peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2`}
          >
            <div className="relative md:w-10 md:h-10 w-8 h-8 mb-2">
              <Image
                src={team.image_path}
                alt={team.name}
                className="object-contain"
                fill
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-center">
              {team.name}
            </span>
          </label>
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen} dismissible={false}>
        <DrawerContent className=" flex flex-col">
          <ScrollArea className="h-[900px] min-h-[200px] flex flex-col">
            <form action={formAction}>
              <DrawerHeader className="text-center">
                <DrawerTitle className="text-xl font-bold">
                  Choisissez votre club favori pour continuer
                </DrawerTitle>
              </DrawerHeader>
              <ClubGrid />
              {state.message && (
                <p className="text-center text-sm text-red-500">
                  {state.message}
                </p>
              )}
              <DrawerFooter>
                <Button
                  id="submit-button"
                  type="submit"
                  className="w-full"
                  disabled={!selectedClub || pending}
                  size="lg"
                >
                  {pending ? "Confirmer..." : "Confirmer"}
                </Button>
              </DrawerFooter>
            </form>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="sm:max-w-[640px] max-h-[85vh] [&>button]:hidden"
      >
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Choisissez votre club favori pour continuer
            </DialogTitle>
          </DialogHeader>

          <ClubGrid />

          <div className="flex justify-end items-center gap-2 mt-4">
            {state.message && (
              <p className="text-center text-sm text-red-500">
                {state.message}
              </p>
            )}
            <Button type="submit" disabled={pending}>
              {pending ? "Confirmer..." : "Confirmer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
