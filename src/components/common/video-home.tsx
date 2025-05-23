import React from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getVideoHomePreview } from "@/lib/prisma/use-cases/video-home";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const VideoHome: React.FC = async () => {
  const videoHomePreview = await getVideoHomePreview();
  const videoId1 = videoHomePreview?.firstVideoId;
  const videoId2 = videoHomePreview?.secondVideoId;
  return (
    <div className="w-full " role="region" aria-label="Video section">
      <div
        className="rounded-xl"
        style={{
          background: "linear-gradient(135deg, #8B0000 0%, #B22222 100%)",
        }}
      >
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">
            Résumé vidéo
          </h2>
          <ScrollArea>
            <div className="relative rounded-xl pb-4 flex flex-col lg:flex-row gap-12 lg:gap-12">
              <div>
                <YouTubeEmbed
                  videoid={videoId1 ?? ""}
                  params="controls=1&showinfo=1"
                  width={400}
                  height={200}
                  playlabel="Play"
                />
              </div>
              <div>
                <YouTubeEmbed
                  videoid={videoId2 ?? ""}
                  params="controls=1&showinfo=1"
                  width={400}
                  height={200}
                  playlabel="Play"
                />
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default VideoHome;
