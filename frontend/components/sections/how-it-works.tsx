import Image from "next/image";
import { Backpack, UtensilsCrossed, Tablet, MousePointer2 } from "lucide-react";
import type { LucideProps } from 'lucide-react';
import React from 'react';

interface PaymentCategory {
  title: string;
  description: string;
  icon: string | React.ComponentType<LucideProps>;
  type: 'image' | 'lucide';
  width?: number;
  height?: number;
  alt: string;
}

const paymentCategories: PaymentCategory[] = [
  {
    title: "Coding Challenges",
    description: "Master algorithms and data structures with guided practice.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ad4ac1b2d9424f84643e_cloth-icon-6.webp",
    type: 'image',
    width: 140,
    height: 63,
    alt: "Coding icon"
  },
  {
    title: "Mock Interviews",
    description: "Practice with real interviewers and get instant feedback.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/680892bc1cb4c601a004d9d4_activities-11.png",
    type: 'image',
    width: 163,
    height: 112,
    alt: "Mock interview icon"
  },
  {
    title: "System Design",
    description: "Learn to architect scalable systems like a senior engineer.",
    icon: Backpack,
    type: 'lucide',
    alt: "System design icon"
  },
  {
    title: "Behavioral Prep",
    description: "Master STAR method and ace behavioral questions.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256caf012087afc36967c5_transport-icon-4.webp",
    type: 'image',
    width: 150,
    height: 91,
    alt: "Behavioral icon"
  },
  {
    title: "Resume Review",
    description: "Get expert feedback to make your resume stand out.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/685536efb5f2bb7969e910b0_fee-1.svg",
    type: 'image',
    width: 150,
    height: 100,
    alt: "Resume icon"
  },
  {
    title: "Live Sessions",
    description: "Join interactive workshops with industry experts.",
    icon: UtensilsCrossed,
    type: 'lucide',
    alt: "Live session icon"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df282ac8a8bb802d887_clock-icon-10.webp",
    type: 'image',
    width: 130,
    height: 79,
    alt: "Progress icon"
  },
  {
    title: "Study Resources",
    description: "Access curated guides, videos, and cheat sheets.",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df2f5d14c323e8d488e_supplies-icon-12.webp",
    type: 'image',
    width: 150,
    height: 110,
    alt: "Resources icon"
  },
  {
    title: "Practice Tests",
    description: "Take timed assessments to simulate real interviews.",
    icon: Tablet,
    type: 'lucide',
    alt: "Practice test icon"
  },
  {
    title: "Career Coaching",
    description: "Get personalized guidance for your career path.",
    icon: MousePointer2,
    type: 'lucide',
    alt: "Career coaching icon"
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <p className="tag-text mb-4">HOW IT WORKS</p>
          <h2 className="max-w-4xl mx-auto">Transform the way you prepare for interviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paymentCategories.map((category, index) => {
            const IconComponent = category.type === 'lucide' ? category.icon as React.ComponentType<LucideProps> : null;

            return (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 flex flex-col text-left shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              >
                <div className="h-36 flex items-center justify-center mb-6">
                  {category.type === 'image' && typeof category.icon === 'string' ? (
                    <Image
                      src={category.icon}
                      alt={category.alt}
                      width={category.width || 150}
                      height={category.height || 100}
                      className="object-contain max-h-full"
                    />
                  ) : IconComponent ? (
                    <IconComponent size={80} strokeWidth={1.5} className="text-primary" />
                  ) : null}
                </div>
                <h4 className="mb-2">{category.title}</h4>
                <p className="text-foreground/80 leading-[1.6]">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
