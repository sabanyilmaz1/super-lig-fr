import { HomeCardHeader } from "@/components/common/home-card-header";
import { Card, CardContent } from "@/components/ui/card";
import { Standing, TypeDeveloperName } from "@/lib/football-api/types/standing";
import { getStanding } from "@/lib/football-api/use-cases/standing";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const DisplayTopTeamsHome = async () => {
  const standing = await getStanding();
  const standingSortedByGoalsScored = [...standing];
  const standingSortedByGoalsConceded = [...standing];

  standingSortedByGoalsScored.sort((a, b) => {
    const aGoals =
      a.details.find(
        (detail) =>
          detail.type.developer_name === TypeDeveloperName.OVERALL_SCORED
      )?.value || 0;
    const bGoals =
      b.details.find(
        (detail) =>
          detail.type.developer_name === TypeDeveloperName.OVERALL_SCORED
      )?.value || 0;
    return bGoals - aGoals;
  });

  standingSortedByGoalsConceded.sort((a, b) => {
    const aGoals =
      a.details.find(
        (detail) =>
          detail.type.developer_name === TypeDeveloperName.OVERALL_CONCEDED
      )?.value || 0;
    const bGoals =
      b.details.find(
        (detail) =>
          detail.type.developer_name === TypeDeveloperName.OVERALL_CONCEDED
      )?.value || 0;
    return aGoals - bGoals;
  });

  return (
    <Card className="border-2 shadow-lg border-redsuperlig rounded-xl">
      <HomeCardHeader title="Statistiques Équipe" />
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          <TopTeamHome
            data={standingSortedByGoalsScored}
            title="Meilleure attaque"
            backgroundColor="from-red-500 to-red-700"
            textColor="text-redsuperlig"
            type={TypeDeveloperName.OVERALL_SCORED}
          />
          <TopTeamHome
            data={standingSortedByGoalsConceded}
            title="Meilleure défense"
            backgroundColor="from-gray-700 to-black"
            textColor="text-black"
            type={TypeDeveloperName.OVERALL_CONCEDED}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface TopTeamHomeProps {
  data: Standing[] | undefined;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  type: TypeDeveloperName;
}

export const TopTeamHome = ({
  data,
  title,
  backgroundColor,
  textColor,
  type,
}: TopTeamHomeProps) => {
  return (
    <div>
      <h2 className={cn("text-2xl font-bold", textColor)}>{title}</h2>
      {/* TOP PLAYER */}
      {data?.slice(0, 1).map((item) => (
        <Card
          key={item.participant.id}
          className={cn(
            " overflow-hidden mt-4 bg-gradient-to-r ",
            backgroundColor
          )}
        >
          <CardContent className="p-1">
            <div className="flex items-end justify-between p-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">1</div>
                <div className="text-xl font-bold text-white">
                  {item.participant.name}
                </div>
                {item.participant.placeholder && (
                  <div className="text-3xl font-bold text-white">
                    {item.participant.placeholder}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-white">
                    {item.participant.short_code}
                  </span>
                </div>
              </div>
              <div className="text-3xl md:text-6xl font-bold text-white">
                {
                  item.details.find(
                    (detail) => detail.type.developer_name === type
                  )?.value
                }
              </div>
              <div className="relative flex items-center justify-center w-20 h-24">
                <Image
                  src={item.participant.image_path}
                  alt={item.participant.name}
                  fill
                  sizes="(max-width: 80px) 100vw, 80px"
                  className="object-contain rounded-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {/* OTHER PLAYERS */}
      <div className="pt-2 space-y-2">
        {data?.slice(1, 5).map((item, index) => (
          <Card
            key={item.id}
            className="transition-colors shadow-lg hover:bg-muted/50"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <span className="w-6 text-xl font-bold">{index + 2}</span>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src={item.participant.image_path}
                      alt={item.participant.name}
                      fill
                      sizes="(max-width: 48px) 100vw, 48px"
                      className="object-contain rounded-full"
                    />
                  </div>

                  <div>
                    <div className="font-semibold">{item.participant.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.participant.short_code}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-2xl font-bold">
                {
                  item.details.find(
                    (detail) => detail.type.developer_name === type
                  )?.value
                }
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
