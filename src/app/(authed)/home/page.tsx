import { DisplayArticlesHome } from "@/components/blog/display-articles-home";
import { TwitterCta } from "@/components/common/twiitterCta";
import VideoHome from "@/components/common/video-home";
import { DisplayFixtureHome } from "@/components/fixture/display-fixture-home";
import { DisplayStandingHome } from "@/components/standings/display-standing-home";
import { DisplayTopScorersHome } from "@/components/standings/display-top-scorers-home";
import { DisplayTopTeamsHome } from "@/components/standings/display-top-teams-home";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import {
  BlogHomeSkeleton,
  FixtureHomeSkeleton,
  StandingHomeSkeleton,
  StandingHomeStatsSkeleton,
} from "./_skeleton";

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
                <DisplayArticlesHomeWithSuspense />
                <VideoHome />
              </div>
            </TabsContent>
            <TabsContent value="results">
              <div className="space-y-4 ">
                <DisplayFixtureHomeWithSuspense />
                <DisplayStandingHomeWithSuspense />
              </div>
            </TabsContent>
            <TabsContent value="stat">
              <div className="space-y-4 ">
                <DisplayTopScorersHomeWithSuspense />
                <DisplayTopTeamsHomeWithSuspense />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Desktop Tablet */}
        <div className="flex-col hidden mx-auto md:container md:pb-8 md:p-0 md:flex md:justify-between md:gap-4 md:flex-row md:pt-12">
          <div className="md:w-[30%] space-y-4">
            <DisplayFixtureHomeWithSuspense />
            <DisplayStandingHomeWithSuspense />
            <TwitterCta />
          </div>
          <div className="md:w-[70%] space-y-4">
            <DisplayArticlesHomeWithSuspense />
            <DisplayTopScorersHomeWithSuspense />
            <DisplayTopTeamsHomeWithSuspense />
            <VideoHome />
          </div>
        </div>
      </div>
    </div>
  );
}

const DisplayTopScorersHomeWithSuspense = () => {
  return (
    <Suspense fallback={<StandingHomeStatsSkeleton />}>
      <DisplayTopScorersHome />
    </Suspense>
  );
};

const DisplayFixtureHomeWithSuspense = () => {
  return (
    <Suspense fallback={<FixtureHomeSkeleton />}>
      <DisplayFixtureHome />
    </Suspense>
  );
};

const DisplayStandingHomeWithSuspense = () => {
  return (
    <Suspense fallback={<StandingHomeSkeleton />}>
      <DisplayStandingHome />
    </Suspense>
  );
};

const DisplayTopTeamsHomeWithSuspense = () => {
  return (
    <Suspense fallback={<StandingHomeStatsSkeleton />}>
      <DisplayTopTeamsHome />
    </Suspense>
  );
};

const DisplayArticlesHomeWithSuspense = () => {
  return (
    <Suspense fallback={<BlogHomeSkeleton />}>
      <DisplayArticlesHome />
    </Suspense>
  );
};
