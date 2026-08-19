import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/hero";
import { DesignCarousel } from "@/components/landing/carousel";
import {
  Catalog,
  FaqSection,
  Features,
  FinalCta,
  HowItWorks,
  InvitationTypes,
  LiveInvitation,
  Pricing,
  Showcase,
  Testimonials,
  VideoDemo,
  Why,
} from "@/components/landing/sections";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "VisolPremium — Premium taklifnomalar va tabriknomalar" }],
  }),
});

function Home() {
  return (
    <div className="bg-ivory">
      <Navbar variant="overlay" />
      <Hero />
      <DesignCarousel />
      <InvitationTypes />
      <HowItWorks />
      <Showcase />
      <Features />
      <VideoDemo />
      <LiveInvitation />
      <Catalog />
      <Why />
      <Pricing />
      <Testimonials />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}
