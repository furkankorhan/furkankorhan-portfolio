import type { Metadata } from "next";
import { WeatherDashboardDemo } from "@/components/WeatherDashboardDemo";

export const metadata: Metadata = {
  title: "Weather Dashboard | Furkan Korhan",
  description:
    "Ein kleines API-Dashboard von Furkan Korhan mit Ortssuche, Fetch-Logik, Fehlerzustand und Open-Meteo Wetterdaten.",
  alternates: {
    canonical: "/weather-dashboard",
  },
  openGraph: {
    title: "Weather Dashboard | Furkan Korhan",
    description:
      "Ein kleines API-Dashboard mit Ortssuche, Fetch-Logik, Fehlerzustand und Open-Meteo Wetterdaten.",
    url: "https://furkankorhan.com/weather-dashboard",
  },
};

export default function WeatherDashboardPage() {
  return <WeatherDashboardDemo />;
}
