import type { Metadata } from "next";
import { ApplicationTrackerDemo } from "@/components/ApplicationTrackerDemo";

export const metadata: Metadata = {
  title: "Application Tracker | Furkan Korhan",
  description:
    "Ein kleines Browser-Tool von Furkan Korhan, um Bewerbungen, Status, Links und nächste Schritte sichtbar zu halten.",
  alternates: {
    canonical: "/application-tracker",
  },
  openGraph: {
    title: "Application Tracker | Furkan Korhan",
    description:
      "Ein kleines Browser-Tool, um Bewerbungen, Status, Links und nächste Schritte sichtbar zu halten.",
    url: "https://furkankorhan.com/application-tracker",
  },
};

export default function ApplicationTrackerPage() {
  return <ApplicationTrackerDemo />;
}
