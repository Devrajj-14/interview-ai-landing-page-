import Image from 'next/image';

const partnersData = [
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/623bd920c58579fdab94492e_D60A09A8-0457-4C5E-9B3A-1-3.png",
    name: "Expert Mentors",
    description: "Network of 200+ industry experts with 15+ years of experience in tech interviews",
    alt: "Expert Mentors icon",
    width: 63,
    height: 63,
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/6824383df2dc817c883d8617_caterers-icon-1.png",
    name: "AI Interview Coach",
    description: "Advanced AI providing real-time feedback and personalized improvement plans",
    alt: "AI Coach icon",
    width: 76,
    height: 63,
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/59dec77e-ef45-46bc-b78e-2b97143c1112-zenda-com/assets/icons/6824383d719879377fe53f39_dresses-icon-2.png",
    name: "Practice Platform",
    description: "Comprehensive library with 5000+ questions and real interview scenarios",
    alt: "Practice Platform icon",
    width: 63,
    height: 63,
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
          {partnersData.map((partner, index) => (
            <div
              key={index}
              className="bg-card rounded-[20px] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-center items-center h-24 mb-6">
                <Image
                  src={partner.icon}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className="h-16 w-auto"
                />
              </div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-3">
                {partner.name}
              </h3>
              <p className="text-base text-card-foreground/70 leading-relaxed">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
