import { ClubsHeader } from "@/components/common/clubs-header";
import { Navbar } from "@/components/common/navbar";

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ClubsHeader />
      <Navbar />
      {children}
    </div>
  );
}
