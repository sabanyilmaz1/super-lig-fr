export const formatPlayerName = (
  displayName: string | undefined | null
): string => {
  if (!displayName) return "";

  const nameParts = displayName.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0];
  }

  return nameParts[0][0].toUpperCase() + ". " + nameParts.slice(1).join(" ");
};
