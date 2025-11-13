import Image from 'next/image';

const FinalCtaSection = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Rewards */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between items-center text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] min-h-[450px] overflow-hidden">
            <div className="relative w-full h-56 flex-shrink-0">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfdecfe71e2e85fb7a29_coin1-22.webp"
                alt="Floating coin"
                width={56}
                height={57}
                className="absolute top-[10%] left-[15%] sm:left-[20%]"
              />
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4cee17493c02f54e056e9_gift_201-18.webp"
                alt="Rewards gift box"
                width={204}
                height={232}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%]"
              />
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfdecfe71e2e85fb7a29_coin1-22.webp"
                alt="Floating coin"
                width={48}
                height={49}
                className="absolute top-[45%] right-[15%] sm:right-[20%]"
              />
            </div>
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-foreground leading-tight max-w-xs mx-auto">
                Achievements for every milestone reached
              </h2>
            </div>
          </div>

          {/* Right Card: Institutions */}
          <div className="bg-[#3A3D45] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-center items-center text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] min-h-[450px] overflow-hidden">
            <div className="relative flex items-center justify-center gap-x-4">
              <div className="relative h-24 w-12 flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/623bd86a794a7f29683aad35_9971FF3A-A37E-44A8-AAD0-8-4.png"
                  alt="Sparkle"
                  width={28}
                  height={28}
                  className="absolute top-0 right-0"
                />
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/623bd86a794a7f29683aad35_9971FF3A-A37E-44A8-AAD0-8-4.png"
                  alt="Sparkle"
                  width={48}
                  height={48}
                  className="absolute top-1/2 -translate-y-1/2 left-0"
                />
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/623bd86a794a7f29683aad35_9971FF3A-A37E-44A8-AAD0-8-4.png"
                  alt="Sparkle"
                  width={24}
                  height={24}
                  className="absolute bottom-0 right-2"
                />
              </div>
              <h2 className="text-left">
                <span className="block text-5xl font-bold leading-none">450+</span>
                <span className="block text-xl font-normal leading-tight">institutions</span>
              </h2>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <a href="#" className="px-5 py-2 border border-white/20 rounded-full text-white/80 text-sm font-light hover:bg-white/10 transition-colors">
                Coding
              </a>
              <a href="#" className="px-5 py-2 border border-white/20 rounded-full text-white/80 text-sm font-light hover:bg-white/10 transition-colors">
                System Design
              </a>
              <a href="#" className="px-5 py-2 border border-white/20 rounded-full text-white/80 text-sm font-light hover:bg-white/10 transition-colors">
                Behavioral
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
