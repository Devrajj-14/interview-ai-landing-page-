import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import Features from "@/components/sections/features";
import RewardsSection from "@/components/sections/rewards";
import SchoolsSection from "@/components/sections/schools";
import Marketplace from "@/components/sections/marketplace";
import HowItWorks from "@/components/sections/how-it-works";
import Statistics from "@/components/sections/statistics";
import Testimonials from "@/components/sections/testimonials";
import FinalCtaSection from "@/components/sections/final-cta";
import DownloadCta from "@/components/sections/download-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <Features />
        <RewardsSection />
        <SchoolsSection />
        <Marketplace />
        <HowItWorks />
        <Statistics />
        <Testimonials />
        <FinalCtaSection />
        <DownloadCta />
      </main>
      <Footer />
    </div>
  );
}
