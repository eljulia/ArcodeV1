import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CasesCarousel } from "@/components/home/CasesCarousel";
import { AcademyTeaser } from "@/components/home/AcademyTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getServicios } from "@/lib/queries/servicios";
import { getCasos } from "@/lib/queries/casos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Arcode — IA y Transformación Digital para PYMEs colombianas",
  description:
    "Arcode implementa chatbots de IA, automatizaciones y desarrollo web para restaurantes, spas y profesionales en Colombia. Demo gratuita.",
};

export default async function Home() {
  const [servicios, casos] = await Promise.all([
    getServicios(),
    getCasos(3),
  ]);

  return (
    <>
      <Hero />
      <CredibilityBar />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <ServicesGrid servicios={servicios} />
      <CasesCarousel casos={casos} />
      <AcademyTeaser />
      <FinalCTA />
    </>
  );
}
