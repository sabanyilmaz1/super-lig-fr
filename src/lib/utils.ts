import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatHourAndAddOne = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  // Add one hour
  date.setHours(date.getHours());

  // Format to HH:MM
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const days = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

export const formatTimestampToFrenchDate = (
  timestamp: string | number
): string => {
  const timestampInMs =
    typeof timestamp === "string"
      ? parseInt(timestamp) * 1000
      : timestamp * 1000;

  const date = new Date(timestampInMs);
  const dayName = days[date.getDay()];
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${capitalizedDayName} ${day} ${month} ${year}`;
};

export const formatTimestampToTime = (timestamp: string | number): string => {
  const timestampInMs =
    typeof timestamp === "string"
      ? parseInt(timestamp) * 1000
      : timestamp * 1000;
  const date = new Date(timestampInMs);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function formatDateFrShort(dateStr: string) {
  const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const mois = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  const date = new Date(dateStr);
  const jourSemaine = jours[date.getDay()];
  const jourMois = date.getDate();
  const moisNom = mois[date.getMonth()];
  const annee = date.getFullYear();

  return `${jourSemaine} ${jourMois} ${moisNom} ${annee}`;
}
