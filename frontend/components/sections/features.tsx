"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FileText, MessageSquare, BookOpen, Calendar, Users, Award, Briefcase, TrendingUp } from "lucide-react";

interface FeaturePillProps {
  iconSrc: string;
  title?: string;
  alt: string;
  className?: string;
  iconClassName?: string;
  imgWidth?: number;
  imgHeight?: number;
  transparent?: boolean;
}

interface AppIcon {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const FeaturePill = ({
  iconSrc,
  title,
  alt,
  className = "",
  iconClassName = "",
  imgWidth,
  imgHeight,
  transparent = false,
}: FeaturePillProps) => {
  const baseClasses =
    "flex items-center justify-center rounded-[90px] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]";
  const background = transparent ? "bg-transparent shadow-none" : "bg-card";

  return (
    <div className={`${baseClasses} ${background} ${className}`}>
      {iconSrc && (
        <div className={`flex-shrink-0 ${iconClassName}`}>
          <Image
            src={iconSrc}
            alt={alt}
            width={imgWidth || 80}
            height={imgHeight || 80}
            className="w-auto h-auto"
          />
        </div>
      )}
      {title && (
        <div className="text-foreground font-medium text-[22px] leading-tight ml-3">
          {title}
        </div>
      )}
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [internalScroll, setInternalScroll] = useState(0);
  const maxInternalScroll = 300; // Number of scroll "ticks" needed to complete animation

  const apps: AppIcon[] = [
    { icon: <FileText size={20} />, label: "Resume", color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { icon: <MessageSquare size={20} />, label: "Interview", color: "bg-gradient-to-br from-purple-500 to-purple-600" },
    { icon: <BookOpen size={20} />, label: "Guide", color: "bg-gradient-to-br from-green-500 to-green-600" },
    { icon: <Calendar size={20} />, label: "Schedule", color: "bg-gradient-to-br from-orange-500 to-orange-600" },
    { icon: <Users size={20} />, label: "Network", color: "bg-gradient-to-br from-pink-500 to-pink-600" },
    { icon: <Award size={20} />, label: "Awards", color: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
    { icon: <Briefcase size={20} />, label: "Jobs", color: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    { icon: <TrendingUp size={20} />, label: "Analytics", color: "bg-gradient-to-br from-teal-500 to-teal-600" },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate if phone is centered in viewport
      const phoneContainer = sectionRef.current.querySelector('.lg\\:block.mt-16');
      if (!phoneContainer) return;
      
      const phoneRect = phoneContainer.getBoundingClientRect();
      const phoneCenter = phoneRect.top + phoneRect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(phoneCenter - viewportCenter);
      
      // Activate stuck scroll when phone is centered (within 150px tolerance)
      const isPhoneCentered = distanceFromCenter < 150 && phoneRect.top < viewportCenter && phoneRect.bottom > viewportCenter;

      if (isPhoneCentered) {
        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;

        // Scrolling down: capture scroll if animation not complete
        if (scrollingDown && internalScroll < maxInternalScroll) {
          e.preventDefault();
          setInternalScroll((prev) => Math.min(prev + Math.abs(e.deltaY) / 3, maxInternalScroll));
        }
        // Scrolling up: capture scroll if animation has progress
        else if (scrollingUp && internalScroll > 0) {
          e.preventDefault();
          setInternalScroll((prev) => Math.max(prev - Math.abs(e.deltaY) / 3, 0));
        }
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      
      // Reset if scrolled completely away from section
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) {
        setInternalScroll(0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [internalScroll, maxInternalScroll]);

  useEffect(() => {
    const progress = Math.min(internalScroll / maxInternalScroll, 1);
    setScrollProgress(progress);
  }, [internalScroll, maxInternalScroll]);

  // Phase 1: Pills move INTO the phone and disappear (0 - 0.6)
  const getTransform = (distance: number) => {
    const phase1End = 0.6;
    const phase1Progress = Math.min(scrollProgress / phase1End, 1);
    const scale = Math.max(0.2, 1 - phase1Progress * 0.85);
    const translateAmount = distance * (1 - phase1Progress * 2.8);
    const opacity = phase1Progress > 0.8 ? 1 - (phase1Progress - 0.8) / 0.2 : 1;
    
    return {
      transform: `translate(${translateAmount}px, 0px) scale(${scale})`,
      opacity: opacity,
      transition: "all 0.3s ease-out",
    };
  };

  // Phase 2: App icons appear inside phone (0.6 - 1.0)
  const getAppStyle = (index: number) => {
    const phase2Start = 0.6;
    const phase2Progress = Math.max(0, (scrollProgress - phase2Start) / (1 - phase2Start));
    const appDelay = index * 0.08;
    const appProgress = Math.max(0, Math.min(1, (phase2Progress - appDelay) / 0.12));
    
    return {
      opacity: appProgress,
      transform: `scale(${0.5 + appProgress * 0.5}) translateY(${20 - appProgress * 20}px)`,
      transition: "all 0.3s ease-out",
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-background pt-[120px] pb-[100px] md:pt-[128px] md:pb-[128px] min-h-screen"
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-20">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              You focus on skills—we handle prep
            </h2>
            <div className="max-w-xl mx-auto mt-4">
              <p className="text-lg md:text-xl text-foreground/90">
                Practice, learn, track progress and master interviews in
                one place
              </p>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block mt-16">
            <div className="relative h-[900px]">
              <div className="absolute inset-0">
                {/* Row 1 */}
                <div className="flex justify-between items-start mb-6 mx-[-80px]">
                  <div style={getTransform(-280)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4005658da1580c0a05cb6_basketball-icon-3.webp"
                      title="Coding"
                      alt="Coding icon"
                      className="py-5 px-10"
                      iconClassName="w-[80px]"
                      imgWidth={152}
                    />
                  </div>
                  <div style={getTransform(280)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256caf012087afc36967c5_transport-icon-4.webp"
                      title="Behavioral"
                      alt="Behavioral icon"
                      className="py-6 px-10"
                      iconClassName="w-[90px]"
                      imgWidth={125}
                      imgHeight={84}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex justify-center items-center gap-x-6 mb-6">
                  <div style={getTransform(-350)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ab4ec6ab1da31980e0ef_Group_201244838975-5.webp"
                      title="System Design"
                      alt="System Design icon"
                      className="py-5 px-9"
                      iconClassName="w-[70px]"
                      imgWidth={88}
                      imgHeight={88}
                    />
                  </div>
                  <div style={getTransform(-200)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ad4ac1b2d9424f84643e_cloth-icon-6.webp"
                      alt="Mock Interviews icon"
                      title="Mock Interviews"
                      className="py-5 px-7"
                      iconClassName="w-[120px]"
                      imgWidth={222}
                      imgHeight={100}
                    />
                  </div>
                  <div className="w-[380px] flex-shrink-0" />
                  <div style={getTransform(200)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3a999c1b2d9424f817b51_bread-icon-7.webp"
                      alt="Resume Review icon"
                      title="Resume Review"
                      className="py-5 px-7"
                      iconClassName="w-[110px]"
                      imgWidth={126}
                      imgHeight={95}
                    />
                  </div>
                  <div style={getTransform(350)}>
                    <FeaturePill
                      title="AI Feedback"
                      alt="AI Feedback"
                      transparent
                      className="py-6 px-12"
                      iconSrc=""
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-center gap-x-5 mb-6">
                  <div style={getTransform(-400)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256ee0ce17a63e6c85098e_juice-package-icon-8.webp"
                      alt="DSA Practice icon"
                      title="DSA Practice"
                      className="py-4 px-7"
                      iconClassName="w-[100px]"
                      imgWidth={118}
                      imgHeight={94}
                    />
                  </div>
                  <div style={getTransform(-250)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df22f1d9b02f705f8f7_textbooks-icon-9.webp"
                      title="Resources"
                      alt="Resources icon"
                      transparent
                      className="py-5 px-8"
                      iconClassName="w-[70px] mr-2"
                      imgWidth={81}
                      imgHeight={74}
                    />
                  </div>
                  <div className="w-[380px] flex-shrink-0" />
                  <div style={getTransform(250)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/685536efb5f2bb7969e910b0_fee-1.svg"
                      title="Mentorship"
                      alt="Mentorship icon"
                      className="py-6 px-10"
                      iconClassName="w-[60px]"
                      imgWidth={66}
                      imgHeight={56}
                    />
                  </div>
                  <div style={getTransform(400)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df282ac8a8bb802d887_clock-icon-10.webp"
                      alt="Scheduling icon"
                      title="Scheduling"
                      className="py-5 px-6"
                      iconClassName="w-[90px]"
                      imgWidth={164}
                      imgHeight={100}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex justify-center items-center gap-x-6 mb-6">
                  <div style={getTransform(-320)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df2f5d14c323e8d488e_supplies-icon-12.webp"
                      title="Career Guidance"
                      alt="Career Guidance icon"
                      className="py-5 px-7"
                      iconClassName="w-[90px]"
                      imgWidth={104}
                      imgHeight={88}
                    />
                  </div>
                  <div style={getTransform(-150)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ab4ec6ab1da31980e0ef_Group_201244838975-5.webp"
                      title="Assessments"
                      alt="Assessments icon"
                      className="py-5 px-9"
                      iconClassName="w-[70px]"
                      imgWidth={88}
                      imgHeight={88}
                    />
                  </div>
                  <div className="w-[380px] flex-shrink-0" />
                  <div style={getTransform(150)}>
                    <FeaturePill
                      title="Video Tutorials"
                      alt="Video Tutorials"
                      transparent
                      iconSrc=""
                      className="py-6 px-10"
                    />
                  </div>
                  <div style={getTransform(320)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/680892bc1cb4c601a004d9d4_activities-11.png"
                      alt="Practice icon"
                      title="Live Sessions"
                      className="py-5 px-7"
                      iconClassName="w-[100px]"
                      imgWidth={163}
                      imgHeight={112}
                    />
                  </div>
                </div>
              </div>

              {/* Phone with App Icons Inside */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  {/* Phone Frame */}
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4084339958da4f71877b4_mobile-mockup-13.webp"
                    width={384}
                    height={780}
                    alt="Mobile mockup showing Zenda app interface"
                    className="max-w-[384px] h-auto"
                  />
                  
                  {/* App Icons Grid Inside Phone Screen */}
                  <div className="absolute top-[80px] left-[32px] right-[32px] bottom-[80px]">
                    <div className="grid grid-cols-3 gap-6 gap-y-8 p-6">
                      {apps.map((app, index) => (
                        <div
                          key={index}
                          style={getAppStyle(index)}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center shadow-lg`}>
                            <div className="text-white">{app.icon}</div>
                          </div>
                          <span className="text-[9px] text-gray-700 font-medium text-center leading-tight">
                            {app.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden mt-16">
            <div className="max-w-[384px] mx-auto">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4084339958da4f71877b4_mobile-mockup-13.webp"
                width={384}
                height={780}
                alt="Mobile mockup showing Zenda app interface"
                className="w-full h-auto"
              />
            </div>

            <div className="relative mt-[-220px] pt-[220px] space-y-4">
              <div className="absolute inset-0 overflow-hidden rounded-[40px]">
                <div className="absolute w-[150px] h-[150px] bg-secondary rounded-3xl top-[10%] left-[-20px] rotate-[-15deg]"></div>
                <div className="absolute w-[180px] h-[180px] bg-muted rounded-3xl top-[25%] right-[-40px] rotate-[20deg]"></div>
                <div className="absolute w-[120px] h-[120px] bg-secondary rounded-3xl top-[50%] left-[-30px] rotate-[10deg]"></div>
                <div className="absolute w-[100px] h-[100px] bg-muted rounded-3xl top-[70%] right-[20px] rotate-[-5deg]"></div>
                <div className="absolute w-[80px] h-[80px] bg-accent/20 rounded-full bottom-[5%] left-[15%]"></div>
              </div>

              <div className="relative px-4">
                <div className="bg-card shadow-lg rounded-3xl p-6 text-center text-xl font-medium text-foreground">
                  Mock Interviews
                </div>
              </div>

              <div className="relative px-4">
                <div className="bg-card shadow-lg rounded-3xl p-6 flex items-center justify-between">
                  <span className="text-xl font-medium text-foreground">
                    Practice Tests
                  </span>
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/685d45179dbf65da8996ec74_bag-14.webp"
                    alt="Practice icon"
                    width={60}
                    height={60}
                  />
                </div>
              </div>

              <div className="relative px-4">
                <div className="bg-card shadow-lg rounded-3xl p-6 flex items-center justify-between">
                  <span className="text-xl font-medium text-foreground">
                    Achievements
                  </span>
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e431889b4aa073c0a33447_cup-icon-15.webp"
                    alt="Achievement icon"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
