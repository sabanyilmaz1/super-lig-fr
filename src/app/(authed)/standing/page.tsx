import { PageHeader } from "@/components/common/header-page";
import { DisplayFullStanding } from "@/components/standings/display-full-standing";

export default function StandingPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Classement"
        subtitle="Suivez le classement de la Süper Lig"
      />
      <div className="container p-4 mx-auto ">
        <DisplayFullStanding />
      </div>
    </div>
  );
}
