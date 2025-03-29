"use server";
import prisma from "@/lib/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const addUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const userExists = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!userExists) {
    // create user
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name: user?.username,
      },
    });
    return {
      user: newUser,
    };
  }
  return {
    user: userExists,
  };
};

export const getUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userExists = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!userExists) {
    return null;
  }
  return userExists;
};

export const updateUserFavoriteTeam = async (
  userId: number,
  teamId: number
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { favoriteTeamId: teamId },
  });
  return user;
};
