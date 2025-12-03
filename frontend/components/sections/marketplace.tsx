"use client";

import { FileText, Sparkle, Video } from '@phosphor-icons/react';

const partnersData = [
  {
    icon: FileText,
    name: "Upload Resume",
    description: "Upload your resume and get instant AI-powered analysis and personalized recommendations",
    color: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: Sparkle,
    name: "AI Interview Coach",
    description: "Advanced AI providing real-time feedback and personalized improvement plans",
    color: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    icon: Video,
    name: "AI Powered Interview",
    description: "Experience realistic interview simulations powered by advanced AI technology",
    color: "bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500",
  }
];

const Marketplace = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-[56px] font-bold text-foreground leading-tight mb-5">
            Comprehensive Tools, Proven Results
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Our platform features cutting-edge tools and expert guidance. From AI coaching to mentor sessions, each feature aims to enhance your interview success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnersData.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-[20px] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-center items-center h-24 mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${partner.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent size={40} weight="fill" className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-card-foreground mb-3">
                  {partner.name}
                </h3>
                <p className="text-base text-card-foreground/70 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
