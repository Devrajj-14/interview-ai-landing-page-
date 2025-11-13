"use client";
import Image from 'next/image';
import Link from 'next/link';

const RewardsSection = () => {
  const animations = `
@keyframes spin3d {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}

.animate-spin-slow {
  animation: spin3d 12s linear infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.animate-bob {
  animation: bob 5s ease-in-out infinite;
}

.animate-bob-slow {
  animation: bob 7s ease-in-out infinite;
}
`;

  return (
    <>
      <style>{animations}</style>
      <section className="bg-background relative overflow-hidden">
        <div className="py-24 sm:py-32 lg:py-40">
          <div className="container mx-auto max-w-[1440px] px-10 lg:px-20">
            <div className="relative z-20 flex flex-col items-center text-center">
              <div className="tag-text text-primary font-medium tracking-[0.1em] uppercase text-sm">
                ACHIEVEMENTS
              </div>
              <h2 className="mt-4 text-4xl md:text-[56px] font-bold text-foreground leading-[1.1] md:leading-[1.2] tracking-[-0.02em] max-w-3xl">
                Unlock new opportunities as you master interviews
              </h2>
              <div className="mt-6 max-w-[33rem]">
                <p className="text-base md:text-lg">
                  Make every practice session count — earn badges, certificates and exclusive perks as you progress.
                </p>
              </div>
              <div className="mt-10 md:mt-16">
                <Link
                  href="#"
                  className="inline-block rounded-full bg-primary py-4 px-10 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-105"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 mx-auto max-w-[1440px] select-none">
          <div className="relative h-full w-full">
            {/* Background Blocks */}
            <div className="absolute top-[28%] left-[8%] h-20 w-36 rounded-2xl bg-muted/60" />
            <div className="absolute top-[10%] left-[30%] h-14 w-40 rounded-2xl bg-muted/60" />
            <div className="absolute top-[55%] left-[45%] h-12 w-12 rounded-full bg-muted/60" />
            <div className="absolute top-[12%] right-[10%] h-32 w-52 rounded-2xl bg-muted/60" />
            <div className="absolute top-[50%] right-[5%] h-24 w-24 rounded-2xl bg-muted/60" />
            <div className="absolute bottom-[2%] right-[25%] h-16 w-32 rounded-2xl bg-muted/60" />
            <div className="absolute bottom-[10%] left-[5%] h-20 w-20 rounded-full bg-muted/60" />

            {/* BG Images */}
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfe65cc20aed35145d06_image_202829-19.webp"
              alt="Ulta Beauty"
              width={106}
              height={123}
              className="absolute left-[3%] top-[20%] w-20 animate-bob-slow"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfe6187e70a30462641b_image_202824-20.webp"
              alt="Ribbon decor"
              width={129}
              height={141}
              className="absolute right-[28%] top-[10%] w-24 animate-bob"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfe69d21a1fd3580a854_image_202825-21.webp"
              alt="Givingli"
              width={183}
              height={103}
              className="absolute right-[5%] top-[30%] w-28 animate-bob-slow"
            />

            {/* Coupons */}
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/6867e4c506712128ad9cb811_amazon-24.webp"
              alt="Amazon reward"
              width={166}
              height={166}
              className="absolute left-[12%] top-[36%] w-32 animate-bob"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/6867e4c58317e590e1b61347_talabat-26.webp"
              alt="Talabat reward"
              width={166}
              height={166}
              className="absolute bottom-[2%] left-[20%] w-32 animate-bob-slow"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/6867e4c6af4405a766bcdbd4_noon-28.webp"
              alt="Noon reward"
              width={204}
              height={116}
              className="absolute bottom-0 right-[4%] w-40 animate-bob"
            />

            {/* Coins */}
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfdecfe71e2e85fb7a29_coin1-22.webp"
              alt="Gold coin"
              width={80}
              height={80}
              className="absolute right-[19%] top-[45%] w-16 animate-spin-slow"
              style={{ animationDuration: '10s' }}
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4dfdecfe71e2e85fb7a29_coin1-22.webp"
              alt="Gold coin"
              width={80}
              height={80}
              className="absolute left-[33%] top-[60%] w-12 animate-spin-slow"
            />

            {/* Main Surface & Path */}
            <div className="absolute -bottom-64 left-1/2 w-full max-w-[1024px] -translate-x-1/2">
              <div className="absolute inset-0 z-20">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 1024 700"
                  preserveAspectRatio="xMidYMid meet"
                  className="overflow-visible"
                >
                  <path
                    d="M 200 480 C 350 200, 700 200, 750 420"
                    stroke="#9747FF"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="480" r="10" fill="#9747FF" />
                </svg>
              </div>

              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4cce8bab0dccbae7f3fc8_rewards-surface-17.webp"
                alt="Rewards surface"
                width={1024}
                height={454}
                className="relative z-10 object-contain"
              />

              <div className="absolute bottom-[285px] left-1/2 z-30 -translate-x-1/2 text-center md:bottom-[290px]">
                <div className="relative">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/68677bf9dc4b788c9ef0fb91_leafs-16.webp"
                    alt="Decorative leaves"
                    width={221}
                    height={79}
                    className="w-full"
                  />
                  <span className="absolute inset-0 top-1 text-3xl font-bold text-foreground">
                    Achievements
                  </span>
                </div>
              </div>

              <div className="absolute bottom-[300px] left-1/2 z-30 w-40 -translate-x-[20%] animate-bob md:bottom-[330px]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67e4cee17493c02f54e056e9_gift_201-18.webp"
                  alt="Gift box"
                  width={204}
                  height={232}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RewardsSection;
