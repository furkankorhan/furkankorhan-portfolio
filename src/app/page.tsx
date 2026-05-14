import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Kurzprofil } from "@/components/Kurzprofil";
import { Fokus } from "@/components/Fokus";
import { Projects } from "@/components/Projects";
import { WarumInformatik } from "@/components/WarumInformatik";
import { Contact, Footer } from "@/components/Contact";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";

export default function Home() {
  return (
    <main className="flex flex-col w-full" style={{ background: "var(--bg-deep)" }}>
      <ScrollRevealInit />
      <ScrollyCanvas />
      <Kurzprofil />
      <Fokus />
      <Projects />
      <WarumInformatik />
      <Contact />
      <Footer />
    </main>
  );
}
