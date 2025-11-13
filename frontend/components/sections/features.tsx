"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress: Smooth and continuous throughout scroll
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5))
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate transform based on scroll progress - SMOOTH AND CONTINUOUS
  const getTransform = (distance: number) => {
    const scale = 1 - scrollProgress * 0.6; // Pills get much smaller
    const translateAmount = distance * (1 - scrollProgress * 2.5); // Move MUCH closer to center
    return {
      transform: `translate(${translateAmount}px, 0px) scale(${scale})`,
      transition: "transform 0.3s ease-out", // Slower, smoother transition
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-background pt-[120px] pb-[100px] md:pt-[128px] md:pb-[128px]"
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
          <div className="hidden lg:block mt-8">
            <div className="relative h-[850px]">
              <div className="absolute inset-0">
                {/* Row 1 */}
                <div className="flex justify-between items-start mb-2 mx-[-50px]">
                  <div style={getTransform(-200)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4005658da1580c0a05cb6_basketball-icon-3.webp"
                      title="Coding"
                      alt="Coding icon"
                      className="py-4 px-8"
                      iconClassName="w-[80px]"
                      imgWidth={152}
                    />
                  </div>
                  <div style={getTransform(200)}>
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
                <div className="flex justify-center items-center gap-x-4 mb-2 ml-[-200px]">
                  <div style={getTransform(-250)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ab4ec6ab1da31980e0ef_Group_201244838975-5.webp"
                      title="System Design"
                      alt="System Design icon"
                      className="py-5 px-8"
                      iconClassName="w-[70px]"
                      imgWidth={88}
                      imgHeight={88}
                    />
                  </div>
                  <div style={getTransform(-150)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ad4ac1b2d9424f84643e_cloth-icon-6.webp"
                      alt="Mock Interviews icon"
                      title="Mock Interviews"
                      className="p-5"
                      iconClassName="w-[120px]"
                      imgWidth={222}
                      imgHeight={100}
                    />
                  </div>
                  <div className="w-[380px] flex-shrink-0" />
                  <div style={getTransform(150)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3a999c1b2d9424f817b51_bread-icon-7.webp"
                      alt="Resume Review icon"
                      title="Resume Review"
                      className="p-5"
                      iconClassName="w-[110px]"
                      imgWidth={126}
                      imgHeight={95}
                    />
                  </div>
                  <div style={getTransform(250)}>
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
                <div className="flex items-center gap-x-4 mb-2 ml-[-120px]">
                  <div style={getTransform(-280)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256ee0ce17a63e6c85098e_juice-package-icon-8.webp"
                      alt="DSA Practice icon"
                      title="DSA Practice"
                      className="p-3"
                      iconClassName="w-[100px]"
                      imgWidth={118}
                      imgHeight={94}
                    />
                  </div>
                  <div style={getTransform(-180)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df22f1d9b02f705f8f7_textbooks-icon-9.webp"
                      title="Resources"
                      alt="Resources icon"
                      transparent
                      className="py-4 px-6"
                      iconClassName="w-[70px] mr-2"
                      imgWidth={81}
                      imgHeight={74}
                    />
                  </div>
                  <div className="w-[320px] flex-shrink-0" />
                  <div style={getTransform(120)}>
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
                  <div style={getTransform(200)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df282ac8a8bb802d887_clock-icon-10.webp"
                      alt="Scheduling icon"
                      title="Scheduling"
                      className="p-4"
                      iconClassName="w-[90px]"
                      imgWidth={164}
                      imgHeight={100}
                    />
                  </div>
                  <div style={getTransform(280)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68256df2f5d14c323e8d488e_supplies-icon-12.webp"
                      title="Career Guidance"
                      alt="Career Guidance icon"
                      className="py-5 px-6"
                      iconClassName="w-[90px]"
                      imgWidth={104}
                      imgHeight={88}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex justify-start items-center gap-x-4 ml-[-250px] mt-6">
                  <div style={getTransform(-300)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e3ab4ec6ab1da31980e0ef_Group_201244838975-5.webp"
                      title="Assessments"
                      alt="Assessments icon"
                      className="py-5 px-8"
                      iconClassName="w-[70px]"
                      imgWidth={88}
                      imgHeight={88}
                    />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="flex justify-end items-center gap-x-4 mr-[-280px] mt-4">
                  <div style={getTransform(220)}>
                    <FeaturePill
                      title="Video Tutorials"
                      alt="Video Tutorials"
                      transparent
                      iconSrc=""
                      className="py-5 px-8"
                    />
                  </div>
                  <div style={getTransform(320)}>
                    <FeaturePill
                      iconSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/680892bc1cb4c601a004d9d4_activities-11.png"
                      alt="Practice icon"
                      title="Live Sessions"
                      className="p-5"
                      iconClassName="w-[100px]"
                      imgWidth={163}
                      imgHeight={112}
                    />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4084339958da4f71877b4_mobile-mockup-13.webp"
                  width={384}
                  height={780}
                  alt="Mobile mockup showing Zenda app interface"
                  className="max-w-[384px] h-auto"
                />
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
