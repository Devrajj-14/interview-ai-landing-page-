import Image from 'next/image';

const schoolLogos = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67f6139cdb463590ee323e69_school-logo01-29.webp", alt: "Arbor School logo" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/images/67f6139b21fe2ad797027119_school-logo02-30.webp", alt: "Amity School logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139c2c9d69106202476b_school-logo03.webp", alt: "Nord Anglia Education logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139c065f4d1e2a868884_school-logo04.webp", alt: "Repton Dubai logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139d10787d5dd4be5147_school-logo05.webp", alt: "Clarion School logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139c2d1b71b8be881c20_school-logo06.webp", alt: "Swiss International Scientific School logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139b03947470404b9016_school-logo07.webp", alt: "Scholars International Academy logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139c9dae858548a803f7_school-logo08.webp", alt: "Fairgreen International School logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f613a016b8a8b12270830b_school-logo09.webp", alt: "Al Salam Community School logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139c0f99195b458b0f9f_school-logo10.webp", alt: "Dubai National School logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139c7333d45c50c50aa7_school-logo11.webp", alt: "The Indian High School Dubai logo" },
  { src: "https://cdn.prod.website-files.com/622da43f87e21836ee21bed6/67f6139cf01258673a5a1f6a_school-logo12.webp", alt: "ISP logo" },
];

const SchoolsSection = () => {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/svgs/67e397d50fcc10ce71f963a4_IcBaselineLocationOn-2.svg"
              alt="Location icon"
              width={24}
              height={24}
            />
            <span className="tag-text">COMPANIES</span>
          </div>
          <h2 className="text-4xl md:text-[56px] font-bold leading-tight text-foreground mb-4">
            Trusted by 450+ companies
          </h2>
          <p className="text-lg md:text-[22px] text-foreground/80">
            for hiring top talent and conducting interviews
          </p>
        </div>

        <div className="text-center max-w-3xl mx-auto mt-16">
          <h3 className="text-3xl md:text-4xl font-semibold leading-snug text-foreground mb-6">
            Streamlined. Efficient. Effective
          </h3>
          <p className="text-base md:text-lg text-foreground/80">
            As your interview preparation partner, Cops Interview offers comprehensive services that are built for success. Our technology is customized at the very core, to overcome bottlenecks in interview preparation.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-8 justify-center max-w-6xl mx-auto">
            {schoolLogos.map((logo, index) => (
              <div key={index} className="flex justify-center items-center">
                <div className="w-[140px] h-[140px] bg-card rounded-full flex items-center justify-center shadow-[0px_4px_16px_rgba(0,0,0,0.08)]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={90}
                    height={90}
                    className="object-contain max-w-[80%] max-h-[80%]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="relative inline-block overflow-hidden rounded-full bg-primary text-primary-foreground no-underline group text-center"
          >
            <span className="absolute inset-0 bg-primary transition-colors duration-300"></span>
            <span className="absolute inset-0 bg-secondary/80 transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
            <span className="relative block px-12 py-5 btn-text">EXPLORE</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SchoolsSection;
