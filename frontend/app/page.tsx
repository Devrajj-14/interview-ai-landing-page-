import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import Features from "@/components/sections/features";
import RewardsSection from "@/components/sections/rewards";
import Marketplace from "@/components/sections/marketplace";
import HowItWorks from "@/components/sections/how-it-works";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <Features />
        <RewardsSection />
        <Marketplace />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
