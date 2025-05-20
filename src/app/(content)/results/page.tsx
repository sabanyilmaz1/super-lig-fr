import { PageHeader } from "@/components/common/header-page";
import { DisplayFullResult } from "@/components/fixture/display-full-result";
import { getLastResults } from "@/lib/football-api/use-cases/result";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Super Lig France - Résultats",
  description: "Retrouvez les résultats de la Süper Lig",
};

export default function ResultsPage() {
  const resultsPromise = getLastResults();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Résultats"
        subtitle="Retrouvez les résultats de la Süper Lig"
      />
      <div className="container p-4 mx-auto ">
        <DisplayFullResult promiseResults={resultsPromise} />
      </div>
    </div>
  );
}
