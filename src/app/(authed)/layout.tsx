import { ClubsHeader } from "@/components/common/clubs-header";
import { Navbar } from "@/components/common/navbar";
import SelectTeamInit from "@/components/select-team-init";
import { addUser } from "@/lib/prisma/use-cases/user";
export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await addUser();

  if (!user.favoriteTeamId) {
    return (
      <div>
        <SelectTeamInit />
        <ClubsHeader />
        <Navbar user={user} />
        {children}
      </div>
    );
  }

  return (
    <div>
      <ClubsHeader />
      <Navbar user={user} />
      {children}
    </div>
  );
}
