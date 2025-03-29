"use server";
import prisma from "@/lib/prisma/prisma";

export const getVideoHomePreview = async () => {
  const videoHomePreview = await prisma.videoHomePreview.findFirst();
  return videoHomePreview;
};
