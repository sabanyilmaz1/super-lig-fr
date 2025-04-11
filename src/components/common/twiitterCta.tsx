"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TwitterLogo } from "../icon/twitter";

export const TwitterCta = () => {
  return (
    <Card className="bg-[#0000]/5 border-[#000]/20">
      <CardContent className="pt-2">
        <div className="flex flex-col items-center space-y-2 text-center">
          <TwitterLogo width={40} height={40} />
          <div className="">
            <h3 className="text-sm font-bold">Restez connecté !</h3>
            <p className="text-xs text-muted-foreground">
              Suivez-nous sur X pour les dernières actualités et mises à jour en
              temps réel
            </p>
          </div>
          <Button
            className="bg-white border-2 border-[#000]/20 hover:bg-transparent text-black"
            onClick={() =>
              window.open("https://twitter.com/superligfrance0", "_blank")
            }
          >
            <TwitterLogo />
            Suivre @superligfrance0
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
