"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  MicrophoneStage,
  MagnifyingGlass,
  ShieldCheck,
  Webcam,
  Robot,
  ChartLineUp,
  Users,
  ClipboardText,
  Handshake,
  UsersFour,
  VideoCamera,
} from "@phosphor-icons/react";

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
  const maxInternalScroll = 300;

  const apps: AppIcon[] = [
    { icon: <Brain size={28} weight="fill" />, label: "AI Brain", color: "bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500" },
    { icon: <MicrophoneStage size={28} weight="fill" />, label: "Voice Analysis", color: "bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500" },
    { icon: <MagnifyingGlass size={28} weight="fill" />, label: "Resume Scan", color: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500" },
    { icon: <Webcam size={28} weight="fill" />, label: "Video Interview", color: "bg-gradient-to-br from-indigo-500 via-blue-500 to-slate-500" },
    { icon: <ShieldCheck size={28} weight="fill" />, label: "Secure", color: "bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500" },
    { icon: <Robot size={28} weight="fill" />, label: "AI Coach", color: "bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500" },
    { icon: <ChartLineUp size={28} weight="fill" />, label: "Analytics", color: "bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500" },
    { icon: <UsersFour size={28} weight="fill" />, label: "Team Collab", color: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500" },
    { icon: <ClipboardText size={28} weight="fill" />, label: "Templates", color: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500" },
    { icon: <Handshake size={28} weight="fill" />, label: "Integration", color: "bg-gradient-to-br from-lime-500 via-green-500 to-emerald-500" },
    { icon: <VideoCamera size={28} weight="fill" />, label: "Proctoring", color: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500" },
    { icon: <Users size={28} weight="fill" />, label: "Candidates", color: "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500" },
  ];

  useEffect(() => {
    let animationFrameId: number | null = null;
    let pendingScroll = 0;
    let isLocked = false;
    let lastWheelTime = 0;
    let wheelEventCount = 0;
    let lastDirection = 0;
    let directionChanges = 0;

    const updateScroll = () => {
      if (Math.abs(pendingScroll) > 0.1) {
        setInternalScroll((prev) => {
          const newScroll = prev + pendingScroll;
          const clampedScroll = Math.max(0, Math.min(newScroll, maxInternalScroll));
          return clampedScroll;
        });
        pendingScroll = 0;
      }
      animationFrameId = null;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const now = performance.now();
      const timeSinceLastWheel = now - lastWheelTime;
      lastWheelTime = now;

      const currentDirection = Math.sign(e.deltaY);
      if (currentDirection !== lastDirection && lastDirection !== 0) {
        directionChanges++;
      }
      lastDirection = currentDirection;

      if (timeSinceLastWheel < 50) {
        wheelEventCount++;
      } else {
        wheelEventCount = 0;
        directionChanges = 0;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      
      let activationZone = 200;
      if (wheelEventCount > 5 || directionChanges > 2) {
        activationZone = 350;
      } else if (wheelEventCount > 3) {
        activationZone = 280;
      }
      
      const isPhoneCentered = distanceFromCenter < activationZone && 
                              rect.top < viewportCenter && 
                              rect.bottom > viewportCenter;

      const scrollingDown = e.deltaY > 0;
      const canScrollDown = internalScroll < maxInternalScroll - 0.5;
      const canScrollUp = internalScroll > 0.5;

      const shouldCapture = isPhoneCentered && 
                           ((scrollingDown && canScrollDown) || (!scrollingDown && canScrollUp));

      if (shouldCapture) {
        e.preventDefault();
        e.stopPropagation();
        isLocked = true;
        
        let sensitivity = 3.5;
        if (directionChanges > 2) {
          sensitivity = 2.0;
        } else if (wheelEventCount > 5) {
          sensitivity = 2.2;
        } else if (wheelEventCount > 3) {
          sensitivity = 2.8;
        }
        
        pendingScroll += e.deltaY / sensitivity;

        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(updateScroll);
      } else {
        if (isLocked) {
          if ((scrollingDown && internalScroll >= maxInternalScroll - 0.5) ||
              (!scrollingDown && internalScroll <= 0.5)) {
            isLocked = false;
          }
        }
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      
      if (rect.bottom < -300) {
        setInternalScroll(0);
        pendingScroll = 0;
        isLocked = false;
        wheelEventCount = 0;
        directionChanges = 0;
        lastDirection = 0;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [internalScroll, maxInternalScroll]);

  useEffect(() => {
    const progress = Math.min(internalScroll / maxInternalScroll, 1);
    setScrollProgress(progress);
  }, [internalScroll, maxInternalScroll]);

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
      className="bg-background pt-[120px] pb-[100px] md:pt-[128px] md:pb-[128px] min-h-screen overflow-hidden w-full"
    >
      <div className="max-w-[1440px] mx-auto px-10 md:px-20 overflow-hidden">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              You focus on hiring—we handle the rest
            </h2>
            <div className="max-w-xl mx-auto mt-4">
              <p className="text-lg md:text-xl text-foreground/90">
                Streamline your recruitment process with AI-powered tools
                in one platform
              </p>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block mt-16 overflow-hidden">
            <div className="relative h-[900px] max-w-full">
              <div className="absolute inset-0 overflow-hidden">
                {/* Row 1 */}
                <div className="flex justify-between items-start mb-6 mx-[-40px]">
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
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4084339958da4f71877b4_mobile-mockup-13.webp"
                    width={384}
                    height={780}
                    alt="Mobile mockup showing Zenda app interface"
                    className="max-w-[384px] h-auto"
                  />
                  
                  <div className="absolute top-[60px] left-[28px] right-[28px] bottom-[60px]">
                    <div className="grid grid-cols-3 gap-4 gap-y-6 p-4">
                      {apps.map((app, index) => (
                        <div
                          key={index}
                          style={getAppStyle(index)}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center shadow-lg`}>
                            <div className="text-white">{app.icon}</div>
                          </div>
                          <span className="text-[8px] text-gray-700 font-medium text-center leading-tight max-w-[70px]">
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
