"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const testimonialsData = [
  {
    name: "Sarah Chen",
    role: "Head of Talent at TechCorp",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137a12b90c7a67c1dfb_dummy_avatar-4.svg",
    text: "This platform completely transformed our hiring process. We reduced time-to-hire by 60% and the quality of candidates has significantly improved. The AI screening saves our team countless hours every week!",
  },
  {
    name: "Michael Rodriguez",
    role: "VP of Engineering at StartupX",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137097e5a9f4915ffeb_dummy_avatar-1-3.svg",
    text: "The technical assessment tools are game-changers. We can now evaluate candidates' real coding skills before interviews. Hired 15 engineers in 3 months with a 95% retention rate!",
  },
  {
    name: "Priya Sharma",
    role: "Talent Acquisition Lead at DataCo",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137a12b90c7a67c1dfb_dummy_avatar-4.svg",
    text: "The analytics and insights are invaluable. We can track every candidate's journey and make data-driven hiring decisions. Our hiring team collaboration has never been smoother.",
  },
  {
    name: "James Wilson",
    role: "HR Director at Enterprise Inc",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137097e5a9f4915ffeb_dummy_avatar-1-3.svg",
    text: "Best investment in our recruitment stack! The automated scheduling and video interview features saved us hundreds of hours. The compliance tools ensure we maintain fair hiring practices.",
  },
  {
    name: "Emily Zhang",
    role: "Chief People Officer at GrowthCo",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137a12b90c7a67c1dfb_dummy_avatar-4.svg",
    text: "The comprehensive platform covering screening, interviews, and analytics is unmatched. Integration with our ATS was seamless. Highly recommend to any company serious about scaling their hiring!",
  },
];

type Testimonial = typeof testimonialsData[0];

const TestimonialCard = ({ name, role, avatar, text }: Testimonial) => (
  <div className="bg-card text-card-foreground rounded-3xl h-full p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-left flex flex-col">
    <div className="flex items-center gap-4 mb-6">
      <Image
        src={avatar}
        alt={`${name}'s avatar`}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h3 className="font-semibold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-foreground/70">{role}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-4">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} className="w-5 h-5 text-primary fill-primary" />
      ))}
    </div>
    <p className="text-base text-foreground leading-relaxed">{text}</p>
  </div>
);

interface DotButtonProps {
  selected: boolean;
  onClick: () => void;
}

const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    className={cn(
      "w-2.5 h-2.5 rounded-full transition-colors",
      selected ? "bg-primary" : "bg-secondary"
    )}
    type="button"
    onClick={onClick}
    aria-label="Carousel navigation dot"
  />
);

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    loop: true,
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <p className="tag-text mb-2">SUCCESS STORIES</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Trusted by leading HR teams
          </h2>
        </div>

        <div ref={emblaRef}>
          <div className="flex -ml-8">
            {testimonialsData.map((testimonial, index) => (
              <div 
                className="pl-8 flex-[0_0_100%] sm:flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_40%]" 
                key={index}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-8 md:hidden">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
