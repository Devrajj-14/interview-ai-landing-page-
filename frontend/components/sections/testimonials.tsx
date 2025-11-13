"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const testimonialsData = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137a12b90c7a67c1dfb_dummy_avatar-4.svg",
    text: "Cops Interview completely transformed my interview preparation. The mock interviews with real engineers and instant feedback helped me land my dream job at Google. The platform is intuitive and the mentors are exceptional!",
  },
  {
    name: "Michael Rodriguez",
    role: "Full Stack Developer at Meta",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137097e5a9f4915ffeb_dummy_avatar-1-3.svg",
    text: "The system design courses and practice sessions were game-changers. I went from struggling with design questions to confidently architecting solutions. Got offers from 3 FAANG companies!",
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist at Amazon",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137a12b90c7a67c1dfb_dummy_avatar-4.svg",
    text: "The AI-powered feedback and personalized learning path made all the difference. I practiced over 500 problems and the progress tracking kept me motivated throughout my journey.",
  },
  {
    name: "James Wilson",
    role: "Senior Engineer at Microsoft",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137097e5a9f4915ffeb_dummy_avatar-1-3.svg",
    text: "Best investment in my career! The behavioral interview prep and resume review services helped me present myself confidently. The mentors provided insights I couldn't find anywhere else.",
  },
  {
    name: "Emily Zhang",
    role: "Product Manager at Apple",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/68715137a12b90c7a67c1dfb_dummy_avatar-4.svg",
    text: "Cops Interview's comprehensive approach covering technical and behavioral aspects is unmatched. The live sessions with industry experts gave me the edge I needed. Highly recommend to anyone serious about their career!",
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
            Stories from our candidate community
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
