import { DisplayArticlesHome } from "@/components/blog/display-articles-home";
import { TwitterCta } from "@/components/common/twiitterCta";
import VideoHome from "@/components/common/video-home";
import { DisplayFixtureHome } from "@/components/fixture/display-fixture-home";
import { DisplayStandingHome } from "@/components/standings/display-standing-home";
import { DisplayTopScorersHome } from "@/components/standings/display-top-scorers-home";
import { DisplayTopTeamsHome } from "@/components/standings/display-top-teams-home";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function HomePage() {
  return (
    <div>
      <div>
        {/* Mobile */}
        <div className="p-3 md:hidden">
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Récent</TabsTrigger>
              <TabsTrigger value="results">Matchs</TabsTrigger>
              <TabsTrigger value="stat">Statistiques</TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              <div className="space-y-4 ">
                <DisplayArticlesHome />
              </div>
            </TabsContent>
            <TabsContent value="results">
              <div className="space-y-4 ">
                <DisplayFixtureHome />
                <DisplayStandingHome />
              </div>
            </TabsContent>
            <TabsContent value="stat">
              <div className="space-y-4 ">
                <DisplayTopScorersHome />
                <DisplayTopTeamsHome />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Desktop Tablet */}
        <div className="flex-col hidden mx-auto md:container md:pb-8 md:p-0 md:flex md:justify-between md:gap-4 md:flex-row md:pt-12">
          <div className="md:w-[30%] space-y-4">
            <DisplayFixtureHome />
            <DisplayStandingHome />
            <TwitterCta />
          </div>
          <div className="md:w-[70%] space-y-4">
            <DisplayArticlesHome />
            <DisplayTopScorersHome />
            <DisplayTopTeamsHome />
            <VideoHome videoIds={["YBEElR1xZD0", "jOQxfBg2mZA"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
