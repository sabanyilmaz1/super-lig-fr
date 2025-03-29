"use server";

import "server-only";
import { getUser, updateUserFavoriteTeam } from "./use-cases/user";
import { redirect } from "next/navigation";

export const updateUserFavoriteTeamAction = async (
  prevState: { message: string | null; pathname: string },
  formData: FormData
) => {
  const teamId = formData.get("teamId");
  const { user } = await getUser();
  console.log(user, teamId);
  if (!user || !teamId || isNaN(Number(teamId))) {
    return {
      pathname: prevState.pathname,
      message: "Error lors de la mise à jour du favori",
    };
  }
  await updateUserFavoriteTeam(Number(user.id), Number(teamId));
  redirect(prevState.pathname);
};
