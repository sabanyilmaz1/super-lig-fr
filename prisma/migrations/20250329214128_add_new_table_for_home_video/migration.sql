-- CreateTable
CREATE TABLE "VideoHomePreview" (
    "id" SERIAL NOT NULL,
    "firstVideoId" TEXT NOT NULL,
    "secondVideoId" TEXT NOT NULL,

    CONSTRAINT "VideoHomePreview_pkey" PRIMARY KEY ("id")
);
