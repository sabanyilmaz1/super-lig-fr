import { ClubsHeader } from "@/components/common/clubs-header";
import { Navbar } from "@/components/common/navbar";
import SelectTeamInit from "@/components/select-team-init";
import { getUser } from "@/use-cases/user";
export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();

  if (!user.favoriteTeamId) {
    return (
      <div>
        <SelectTeamInit />
        <ClubsHeader />
        <Navbar />
        {children}
      </div>
    );
  }

  return (
    <div>
      <ClubsHeader />
      <Navbar />
      {children}
    </div>
  );
}
