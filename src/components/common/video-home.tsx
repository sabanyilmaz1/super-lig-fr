import React from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

interface VideoHomeProps {
  videoIds: string[];
  title?: string;
  description?: string;
}

const VideoHome: React.FC<VideoHomeProps> = ({
  videoIds: [videoId1, videoId2],
}) => {
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
          <div className="relative rounded-xl pb-4 flex flex-col md:flex-row gap-4">
            <div>
              <YouTubeEmbed
                videoid={videoId1}
                params="controls=1&showinfo=1"
                width={400}
                height={200}
                playlabel="Play"
              />
            </div>
            <div>
              <YouTubeEmbed
                videoid={videoId2}
                params="controls=1&showinfo=1"
                width={400}
                height={200}
                playlabel="Play"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHome;
